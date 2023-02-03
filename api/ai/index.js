import { Configuration, OpenAIApi } from "openai"
import dotenv from 'dotenv'
dotenv.config()
const SECRET = process.env.OPENAI_KEY_SECRET
const configuration = new Configuration({
    apiKey: SECRET
})
const openai = new OpenAIApi(configuration)

export async function generate_text({ text }) {

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    max_tokens: 225,
    temperature: 0
  })
 
  return {
    completation: response.data.choices[0].text 
  }
}