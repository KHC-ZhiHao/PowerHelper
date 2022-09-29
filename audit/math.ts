const arc = Math.PI / 180
const rarc = 180 / Math.PI
const trigonometric: Record<string, {
    sin: number
    cos: number
}> = {}

for (let i = -360; i < 360; i++) {
    trigonometric[i] = {
        sin: Math.sin(i * arc),
        cos: Math.cos(i * arc)
    }
}

/** 具擴展性的多元物件 */

export const helper = {

    minToMs(min: number) {
        return 1000 * 60 * min
    },

    /**
     * 獲取角度轉換弧度後的 sin 值
     */

    sinByRad(deg: number) {
        if (trigonometric[Math.round(deg)]) {
            return trigonometric[Math.round(deg)].sin
        } else {
            return Math.sin(deg * arc)
        }
    },

    /**
     * 獲取角度轉換弧度後的cos值
     */

    cosByRad(deg: number) {
        if (trigonometric[Math.round(deg)]) {
            return trigonometric[Math.round(deg)].cos
        } else {
            return Math.cos(deg * arc)
        }
    },

    /**
     * 獲取向量
     */

    getVector(deg: number, distance: number) {
        return {
            x: distance * helper.cosByRad(deg),
            y: distance * helper.sinByRad(deg)
        }
    },

    /**
     * 求兩點角度
     */

    getAngle(x: number, y: number, ax: number, ay: number) {
        if (x === ax && y === ay) {
            return 0
        }
        let angle = Math.atan2(ay - y, ax - x) * rarc
        return angle > 0 ? angle : 360 + angle
    },

    /**
     * 隨機獲取顏色
     */

    getRandomColor() {
        let letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    },

    /** 獲取兩點距離 */

    twoPointDistance(x: number, y: number, x2: number, y2: number){
        return Math.sqrt(Math.pow((x - x2), 2) + Math.pow((y - y2), 2))
    },

    /**
     * 經緯度
     * @param unit K = 英里 N = 公里
     */

    getGeoDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'N' | 'K' = 'K') {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0
        } else {
            let theta = lon1 - lon2
            let radlat1 = Math.PI * lat1 / 180
            let radlat2 = Math.PI * lat2 / 180
            let radtheta = Math.PI * theta / 180
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
            if (dist > 1) {
                dist = 1
            }
            dist = Math.acos(dist)
            dist = dist * 180 / Math.PI
            dist = dist * 60 * 1.1515
            dist = dist * 60 * 1.1515
            if (unit === 'K') {
                dist = dist * 1.609344
            }
            if (unit === 'N') {
                dist = dist * 0.8684
            }
            return dist
        }
    }
}
