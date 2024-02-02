/**
 * 資料檢查器。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/checker.md
 */

export const checker = {
    /**
     * 負責檢查檔案是否符合 input tag accept 指定的格式。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/checker.md#inputaccept
     */
    inputAccept: (targetType: string, fileType: string, fileName?: string) => {
        // 無限制接受任何檔案
        if (targetType === '*/*') {
            return true
        }
        const acceptPatterns: RegExp[] = []
        targetType.split(',').forEach(type => {
            if (type === '.jpg' || type === '.jpeg') {
                acceptPatterns.push(/image\/(jpeg)/i)
                acceptPatterns.push(/image\/(jpg)/i)
            }
            if (type === '.mp3') {
                acceptPatterns.push(/audio\/(mpeg)/i)
                acceptPatterns.push(/audio\/(mp3)/i)
            }
            // MIME 類型的通配符，例如 image/* 轉換成正則表達式
            if (type.indexOf('/*') !== -1) {
                acceptPatterns.push(new RegExp(type.replace('*', '.+'), 'i'))
            }
            // 擴展名，例如 .png
            if (type.startsWith('.')) {
                acceptPatterns.push(new RegExp(`\\${type}$`, 'i'))
            }
            // 完整的 MIME 類型，例如 image/png
            acceptPatterns.push(new RegExp(type.replace('/', '\\/'), 'i'))
        })
        if (fileName) {
            const matches = acceptPatterns.some(pattern => pattern.test(fileType) || pattern.test(fileName))
            if (!matches) {
                return false
            }
        } else {
            const matches = acceptPatterns.some(pattern => pattern.test(fileType))
            if (!matches) {
                return false
            }
        }
        return true
    }
}
