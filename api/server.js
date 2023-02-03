import Fastify from 'fastify'
import { generate_text } from './ai/index.js'
import { send_msg_to_whatsapp } from './msg/index.js'
import dotenv from 'dotenv'
dotenv.config()

const fastify = Fastify({
  logger: true
})

fastify.addContentTypeParser('*; charset=utf-8', function (request, payload, done) {
  var data = ''
  payload.on('data', chunk => { data += chunk })
  payload.on('end', () => {
    done(null, data)
  })
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        ok: { type: 'string' },
      }
    }
  }
}

fastify.post('/messages', async (request, reply) => {
  const message = request.body
  const sanitized_message = decodeURI(message.split('&')[6].replaceAll('+',' '))
  const { completation } = await generate_text({ text: sanitized_message })
  const { msg_created } = await send_msg_to_whatsapp({ msg_to_whatsapp : completation })
  return { hello: "msg_created.body" }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err.message)
    process.exit(1)
  }
}
start()