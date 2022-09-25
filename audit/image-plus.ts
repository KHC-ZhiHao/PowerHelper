import env from '@/env'
import { t } from '@/vue-core'
import { createCanvas } from '@/utils/canvas'

const imageCaches: Map<string, HTMLImageElement> = new Map()

export function loadImage(fileName: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        if (imageCaches.has(fileName)) {
            return resolve(imageCaches.get(fileName))
        } else {
            let image = new Image()
            image.crossOrigin = 'anonymous'
            image.onerror = reject
            image.onload = () => {
                imageCaches.set(fileName, image)
                resolve(image)
            }
            image.src = fileName
        }
    })
}

export function getServerImagePath(fileName: string) {
    return env.fileUrl + fileName
}

export async function imageChipShape(shape: string, image: string): Promise<HTMLCanvasElement> {
    let [ shapeImg, textureImg ] = await Promise.all([
        loadImage(shape),
        loadImage(image)
    ])
    let { canvas, context } = createCanvas(shapeImg.width, shapeImg.height)
    context.drawImage(shapeImg, 0, 0)
    context.scale(shapeImg.width / textureImg.width, shapeImg.height / textureImg.height)
    context.globalCompositeOperation = 'source-in'
    context.drawImage(textureImg, 0, 0)
    return canvas
}

export async function imageChipToBase64(image: HTMLImageElement, width: number, height: number): Promise<string> {
    let { canvas, context } = createCanvas(width, height)
    context.drawImage(image, 0, 0)
    return canvas.toDataURL()
}

export function loadImageByFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let success = async() => {
            let url = reader.result.toString()
            if (url.match('data:image/jpeg')) {
                resolve(url)
            } else {
                reject(t('圖片不符合標準'))
            }
        }
        reader.addEventListener('error', reject)
        reader.addEventListener('load', success)
        reader.readAsDataURL(file)
    })
}