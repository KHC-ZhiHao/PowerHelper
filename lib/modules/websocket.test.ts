import { expect } from 'chai'
import { WebSocketClient } from './websocket'

class FakeSocket {
    state = 1
    constructor() {
        setTimeout(() => {
            this.onopen()
        }, 10)
    }
    get readyState() {
        return this.state
    }
    send() {}
    close() {
        this.onclose()
    }
    onmessage() {}
    onerror() {}
    onopen() {}
    onclose() {}
}

class FakeSocketError {
    constructor() {
        setTimeout(() => {
            // @ts-ignore
            this.onerror('123')
        }, 10)
    }
    onerror() {}
}

describe('Time', () => {
    it('basic', async function() {
        let ws = new WebSocketClient({
            url: '123',
            system: FakeSocket as any,
            onMessage: async(event) => {},
            sendHandler: async(channel, data) => {}
        })
        await ws.send('123', {})
        await ws.connect()
        await ws.send('123', {})
        await ws.connect()
    })
    it('status', async function() {
        let ws = new WebSocketClient({
            url: '123',
            system: FakeSocket as any,
            onMessage: async(event) => {},
            sendHandler: async(channel, data) => {}
        })
        expect(ws.getStatus()).to.equal('wait')
        await ws.connect()
        // @ts-ignore
        ws._websocket.state = 0
        expect(ws.getStatus()).to.equal('connecting')
        // @ts-ignore
        ws._websocket.state = 1
        expect(ws.getStatus()).to.equal('open')
        // @ts-ignore
        ws._websocket.state = 2
        expect(ws.getStatus()).to.equal('closeing')
        // @ts-ignore
        ws._websocket.state = 3
        expect(ws.getStatus()).to.equal('closed')
    })
    
    it('fail', function(done) {
        let ws = new WebSocketClient({
            url: '123',
            system: FakeSocket as any,
            onMessage: async(event) => {},
            sendHandler: async(channel, data) => {
                throw '123'
            }
        })
        ws.on('$error', ({ from, error }) => {
            expect(from).to.equal('send')
            expect(error).to.equal('123')
            done()
        })
        ws.send('123', {})
    })
    
    it('close', async function() {
        let ws = new WebSocketClient({
            url: '123',
            system: FakeSocket as any,
            onMessage: async(event) => {},
            sendHandler: async(channel, data) => {
                throw '123'
            }
        })
        await ws.connect()
        ws.disconnect()
        ws.disconnect()
    })
        
    it('onmessage', function(done) {
        let ws = new WebSocketClient({
            url: '123',
            system: FakeSocket as any,
            onMessage: async(event) => {
                expect(event).to.equal('123')
                done()
            },
            sendHandler: async(channel, data) => {
                throw '123'
            }
        })
        ws.connect().then(() => {
            // @ts-ignore
            ws._websocket.onmessage('123' as any)
        })
    })
     
    it('onmessage error', function(done) {
        let ws = new WebSocketClient({
            url: '123',
            system: FakeSocket as any,
            onMessage: async(event) => {
                expect(event).to.equal('123')
                throw '456'
            },
            sendHandler: async(channel, data) => {
                throw '123'
            }
        })
        ws.on('$error', ({ from, error }) => {
            expect(from).to.equal('message')
            expect(error).to.equal('456')
            done()
        })
        ws.connect().then(() => {
            // @ts-ignore
            ws._websocket.onmessage('123' as any)
        })
    })
      
    it('onmessage error', function(done) {
        let ws = new WebSocketClient({
            url: '123',
            system: FakeSocket as any,
            onMessage: async(event) => {},
            sendHandler: async(channel, data) => {}
        })
        ws.on('$error', ({ from, error }) => {
            expect(from).to.equal('unknown')
            expect(error).to.equal('123')
            done()
        })
        ws.connect().then(() => {
            // @ts-ignore
            ws._websocket.onerror('123' as any)
        })
    })
          
    it('onmessage error2', function(done) {
        let ws = new WebSocketClient({
            url: '123',
            system: FakeSocketError as any,
            onMessage: async(event) => {},
            sendHandler: async(channel, data) => {}
        })
        ws.connect().catch(() => {
            done()
        })
    })
})
