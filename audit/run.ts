export const run = <T extends () => any>(cb: T) => cb()

type WorkerCallback = <I, O>(context: {
    close: () => void
    onMessage: (cb: (data: I) => void) => void
    postMessage: (data: O) => void
}) => void

export const runWroker = (cb: WorkerCallback) => {
    if (typeof Worker !== 'undefined') {
        let workerString = /* javascript */`
            var __listeners = []
            var __context = {
                postMessage,
                onMessage: (cb) => {
                    __listeners.push(cb)
                }
            }
            var __handler = ${cb.toString()}
            __handler(__context)
            onmessage = (message) => {
                __listeners.forEach(e => e(message))
            }
        `
        let blob: Blob | null = new Blob([workerString], {
            type: 'application/javascript'
        })
        let url = URL.createObjectURL(blob)
        let worker = new Worker(url)
        URL.revokeObjectURL(url)
        blob = null
        return {
            close: worker.terminate()
        }
    }
}
