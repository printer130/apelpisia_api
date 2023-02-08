import Twilio from 'twilio'
import dotenv from 'dotenv'
dotenv.config()

const JESUS_CHRIST = process.env.TWILIO_DEFAULT_NUMBER
const JESUS = process.env.JESUS
/* const twilio_to = process.env.TWILIO_TO_MESSAGE*/
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN

const client = Twilio(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN, {
  region: 'br1'
})

export async function send_msg_to_whatsapp({ completation, from_whatsapp }){
  const msg_created = await client.messages.create({
    body: completation,
    from: JESUS_CHRIST,
    to: from_whatsapp
  })
  new_account()
  return { msg_created }
}

export async function new_account() {
  return await client.api.v2010.accounts(process.env.TWILIO_ACCOUNT_SID)
                .fetch()
                .then(account => console.log(account))
}


