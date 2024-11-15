import 'dotenv/config'
import http from 'http'
import { WebSocketServer } from 'ws'
import {clear_history, message_steam} from './groq/chat.js'

const port = process.env.PORT || 8000
const server = http.createServer()
const wss = new WebSocketServer({server})

wss.on('connection', ws => {
    ws.on('message', async bytes => {
        const message = JSON.parse(bytes.toString())
        const response = await message_steam(message.message)

        for await (let response_chunk of response) {
            ws.send(JSON.stringify({response: response_chunk}))
            await new Promise(resolve => setTimeout(resolve, 50))
        }
    })

    ws.on('close', () => {
        clear_history();
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

