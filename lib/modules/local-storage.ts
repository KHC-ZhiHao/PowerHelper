import { Base } from '../module-base'

let globalLocalStorage: Storage | null = null

export class LocalStorage<T extends Record<string, any>> extends Base {
    private namespaces: string
    private storage = globalLocalStorage ? globalLocalStorage : typeof window === 'undefined' ? null : window.localStorage
    constructor(namespaces: string, options?: {
        dafaultColumns?: Partial<T>
    }) {
        super('LocalStorage')
        this.namespaces = namespaces
        if (options) {
            if (options.dafaultColumns) {
                for (let key in options.dafaultColumns) {
                    if (this.get(key) == null) {
                        this.set(key, options.dafaultColumns[key] as any)
                    }
                }
            }
        }
    }

    static setGlobalLocalStorage(storage: any) {
        globalLocalStorage = storage
    }

    private _genName(name: string | number | symbol) {
        return `_power_${this.namespaces}/${name.toString()}`
    }

    set<K extends keyof T>(name: K, data: T[K]) {
        if (this.storage) {
            this.storage.setItem(this._genName(name), JSON.stringify(data))
        }
    }

    get<K extends keyof T>(name: K): T[K] | undefined {
        if (this.storage) {
            let data = this.storage.getItem(this._genName(name))
            if (data != null) {
                return JSON.parse(data)
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
