import { inIOS, inSafari } from './detect'

function getLayerPosition(event) {
    var parent = event.targetTouches[0].target.parentNode
    var firstOffsetTop = null
    var position = {
        x: (event.targetTouches) ? event.targetTouches[0].pageX : event.clientX,
        y: (event.targetTouches) ? event.targetTouches[0].pageY : event.clientY
    }
    while(parent.offsetParent){
        if (firstOffsetTop == null) {
            firstOffsetTop = parent.offsetTop
        }
        position.y -= parent.offsetTop - parent.scrollTop
        parent = parent.offsetParent
    }
    position.y += firstOffsetTop
    return position
}

type StartCallback = (context: { id: string, x: number, y: number }) => void
type MoveCallback = (context: { id: string, x: number, y: number }) => void
type EndCallback = (context: { id: string }) => void

export const onPointer = (element: HTMLElement, { start, end, move }: {
    start: StartCallback
    move: MoveCallback
    end: EndCallback
}) => {
    let id = null
    if (inIOS()) {
        element.addEventListener('touchstart', event => {
            id = Math.round((Math.random() * 100000) + Date.now()).toString()
            let { x, y } = getLayerPosition(event)
            start({ id, x, y })
        })
        element.addEventListener('touchmove', event => {
            let { x, y } = getLayerPosition(event)
            move({ id, x, y })
        })
        element.addEventListener('touchend', () => {
            end({ id })
        })
    } else if (inSafari()) {
        element.addEventListener('mousedown', event => {
            id = Math.round((Math.random() * 100000) + Date.now())
            start({
                id,
                x: event.layerX,
                y: event.layerY
            })
        })
        element.addEventListener('mousemove', event => {
            move({
                id,
                x: event.layerX,
                y: event.layerY
            })
        })
        element.addEventListener('mouseup', () => {
            end({ id })
        })
    } else {
        element.addEventListener('pointerdown', event => {
            id = Math.round((Math.random() * 100000) + Date.now())
            start({
                id,
                x: event.pageX,
                y: event.pageY
            })
        })
        element.addEventListener('pointermove', event => {
            move({
                id,
                x: event.pageX,
                y: event.pageY
            })
        })
        element.addEventListener('pointerup', () => {
            end({ id })
        })
    }
    return {
        close: () => {}
    }
}
