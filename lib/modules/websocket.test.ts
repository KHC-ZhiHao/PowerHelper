import { expect } from 'chai'
import { WebSocketClient } from './websocket'

class FakeSocket {
    get readyState() {
        return 1
    }
    send() {}
    close() {}
    onmessage() {}
    onerror() {}
    onopen() {}
    onclose() {}
}

const getWebSocket = () => {
    return new WebSocketClient({
        url: '123',
        system: FakeSocket as any,
        onMessage: async(event) => {
            event
        },
        sendHandler: async(channel, data) => {}
    })
}

describe('Time', () => {
    it('basic', async function() {
        

    })
    it('send', async function() {

    })
    
    it('fail', async function() {

    })
    
    it('close', async function() {

    })
})
