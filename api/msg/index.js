import Twilio from 'twilio'
import dotenv from 'dotenv'
dotenv.config()

const twilio_default_number = process.env.TWILIO_DEFAULT_NUMBER

const twilio_to = process.env.TWILIO_TO_MESSAGE
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN

const client = Twilio(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN, {
  region: 'br1'
})

export async function send_msg_to_whatsapp({ msg_to_whatsapp }){
 
   const msg_created = await client.messages.create({
      body: msg_to_whatsapp,
      from: twilio_default_number,
      to: twilio_to
    })

    return { msg_created }
  }

