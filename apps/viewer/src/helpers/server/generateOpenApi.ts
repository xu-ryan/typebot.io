import { generateOpenApiDocument } from '@lilyrose2798/trpc-openapi'
import { writeFileSync } from 'fs'
import { appRouter } from './appRouter'

const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Chat API',
  version: '3.0.0',
  baseUrl: 'https://bot.facto.com.cn/api',
  docsUrl: 'https://docs.facto.com.cn/api-reference',
})

writeFileSync('./openapi/viewer.json', JSON.stringify(openApiDocument, null, 2))
