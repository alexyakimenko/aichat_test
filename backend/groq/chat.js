import 'dotenv/config'
import Groq from 'groq-sdk'

const chat_history = []

const groq = new Groq({apiKey: process.env.GROQ_API_KEY})

export async function* message_steam(message) {
    chat_history.push({
        role: 'user',
        content: message
    })

    const response = await groq.chat.completions.create({
        messages: chat_history,
        temperature: 1.2,
        model: 'llama3-70b-8192',
        stream: true
    })

    let response_msg = ''

    for await (const chunk of response) {
        const text_chunk = await chunk.choices[0]?.delta?.content ?? ''
        response_msg += text_chunk
        yield text_chunk
    }

    chat_history.push({
        role: 'assistant',
        content: response_msg,
    })
}

export const clear_history = () => {
    chat_history.length = 0
}