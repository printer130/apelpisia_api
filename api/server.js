import Fastify from 'fastify'
import pump from 'pump'
import split from 'split2'
import { sanitizeMessage } from '../utils/sanitizeMessage.js'
import { generate_text } from './ai/index.js'
import { send_msg_to_whatsapp } from './msg/index.js'

const fastify = Fastify({
  logger: true
})

fastify.addContentTypeParser('*; charset=utf-8', function (request, payload, done) {
  var data = ''
  payload.on('data', chunk => { 
    return data += chunk
   })
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
      type: 'string',
    }
  }
}

fastify.post('/messages', opts, async (request, reply) => {
  const message = request.body
  const { from_body, from_whatsapp } = sanitizeMessage({ message })

  const { completation } = await generate_text({ 
    to_promt: from_body,
   })

  const { msg_created } = await send_msg_to_whatsapp({ completation : completation,
    from_whatsapp
   })
   /* console.log({ msg_created }) */
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
/* 
create new sub accounts
client.api.v2010.accounts('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                .fetch()
                .then(account => console.log(account.friendlyName));
 */