import { Base } from '../module-base'

// LocalStorage Size 問題
// 檢驗資料正確的 function

export class LocalStorage<T extends Record<string, any>> extends Base {
    private storage: Storage | null
    private namespaces: string
    constructor(namespaces: string, options?: {
        storageSystem?: Storage
        dafaultColumns?: Partial<T>
    }) {
        super('LocalStorage')
        this.storage = typeof window === 'undefined' ? null : window.localStorage
        this.namespaces = namespaces
        if (options) {
            if (options.storageSystem) {
                this.storage = options.storageSystem
            }
            if (options.dafaultColumns) {
                for (let key in options.dafaultColumns) {
                    if (this.get(key) == null) {
                        this.set(key, options.dafaultColumns[key] as any)
                    }
                }
            }
        }
    }

    private _genName(name: string | number | symbol) {
        return `_power_${this.namespaces}/${name.toString()}`
    }

    set<K extends keyof T>(name: K, data: T[K]) {
        if (this.storage) {
            this.storage.setItem(this._genName(name), JSON.stringify({
                createdAt: Date.now(),
                data
            }))
        }
    }

    get<K extends keyof T>(name: K): T[K] | undefined {
        if (this.storage) {
            let data = this.storage.getItem(this._genName(name))
            if (data != null) {
                let result = JSON.parse(data)
                return result.data
            }
        }
    }

    clear() {
        if (this.storage) {
            let name = `_power_${this.namespaces}/`
            let items = Object.keys(this.storage)
            for (let key of items) {
                if (key.length >= name.length && key.slice(0, name.length) === name) {
                    this.remove(key.slice(name.length))
                }
            }
        }
    }

    remove<K extends keyof T>(name: K) {
        if (this.storage) {
            this.storage.removeItem(this._genName(name))
        }
    }
}
