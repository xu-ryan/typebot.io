import { isNotEmpty } from '@typebot.io/lib/utils'
import { ContinueChatResponse } from '@typebot.io/schemas'
import { OpenAIBlock } from '@typebot.io/schemas/features/blocks/integrations/openai'
import { HTTPError } from 'got'
import { ClientOptions, OpenAI } from 'openai'

type Props = Pick<
  OpenAI.Chat.ChatCompletionCreateParams,
  'messages' | 'model'
> & {
  apiKey: string
  temperature: number | undefined
  currentLogs?: ContinueChatResponse['logs']
  isRetrying?: boolean
} & Pick<NonNullable<OpenAIBlock['options']>, 'apiVersion' | 'baseUrl'>

export const executeChatCompletionOpenAIRequest = async ({
  apiKey,
  model,
  messages,
  temperature,
  baseUrl,
  apiVersion,
  isRetrying,
  currentLogs = [],
}: Props): Promise<{
  chatCompletion?: OpenAI.Chat.Completions.ChatCompletion
  logs?: ContinueChatResponse['logs']
}> => {
  const logs: ContinueChatResponse['logs'] = currentLogs
  if (messages.length === 0) return { logs }
  try {
    const config = {
      apiKey,
      baseURL: baseUrl,
      defaultHeaders: {
        'api-key': apiKey,
      },
      defaultQuery: isNotEmpty(apiVersion)
        ? {
            'api-version': apiVersion,
          }
        : undefined,
    } satisfies ClientOptions

    const openai = new OpenAI(config)

    const chatCompletion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
    })

    return { chatCompletion, logs }
  } catch (error) {
    if (error instanceof HTTPError) {
      if (
        (error.response.statusCode === 503 ||
          error.response.statusCode === 500 ||
          error.response.statusCode === 403) &&
        !isRetrying
      ) {
        console.log('OpenAI API error - 503, retrying in 3 seconds')
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return executeChatCompletionOpenAIRequest({
          apiKey,
          model,
          messages,
          temperature,
          currentLogs: logs,
          baseUrl,
          apiVersion,
          isRetrying: true,
        })
      }
      if (error.response.statusCode === 400) {
        const log = {
          status: 'info',
          description:
            'Max tokens limit reached, automatically trimming first message.',
        }
        logs.push(log)

        return executeChatCompletionOpenAIRequest({
          apiKey,
          model,
          messages: messages.slice(1),
          temperature,
          currentLogs: logs,
          baseUrl,
          apiVersion,
        })
      }
      logs.push({
        status: 'error',
        description: `OpenAI API error - ${error.response.statusCode}`,
        details: error.response.body,
      })
      return { logs }
    }
    logs.push({
      status: 'error',
      description: `Internal error`,
      details: error,
    })
    return { logs }
  }
}
