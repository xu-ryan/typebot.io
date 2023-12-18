import { generateOpenApiDocument } from 'trpc-openapi'
import { writeFileSync } from 'fs'
import { appRouter } from '@/helpers/server/appRouter'

const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Chat API',
  version: '3.0.0',
  baseUrl: 'https://bot.facto.com.cn/api',
  docsUrl: 'https://docs.facto.com.cn/api',
})

writeFileSync(
  './openapi/chat/_spec_.json',
  JSON.stringify(openApiDocument, null, 2)
)
