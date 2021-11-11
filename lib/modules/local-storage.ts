import { Base } from '../module-base'

let globalLocalStorage = typeof window === 'undefined' ? null : window.localStorage

export class LocalStorage<T extends Record<string, any>> extends Base {
    private namespaces: string
    constructor(namespaces: string, dafaultColumns?: Partial<T>) {
        super('LocalStorage')
        this.namespaces = namespaces
        if (dafaultColumns) {
            for (let key in dafaultColumns) {
                if (this.get(key) == null) {
                    this.set(key, dafaultColumns[key] as any)
                }
            }
        }
    }
    static setGlobalLocalStorage(storage: any) {
        globalLocalStorage = storage
    }
    private _genName(name: string | number | symbol) {
        return `_super_${this.namespaces}/${name.toString()}`
    }

    set<K extends keyof T>(name: K, data: T[K]) {
        if (globalLocalStorage) {
            globalLocalStorage.setItem(this._genName(name), JSON.stringify(data))
        }
    }

    get<K extends keyof T>(name: K): T[K] | undefined {
        if (globalLocalStorage) {
            let data = globalLocalStorage.getItem(this._genName(name))
            if (data != null) {
                return JSON.parse(data)
            }
        }
    }

    clear() {
        if (globalLocalStorage) {
            let name = `_power_${this.namespaces}/`
            let items = Object.keys(globalLocalStorage)
            for (let key of items) {
                if (key.length >= name.length && key.slice(0, name.length) === name) {
                    this.remove(key)
                }
            }
        }
    }

    remove<K extends keyof T>(name: K) {
        if (globalLocalStorage) {
            globalLocalStorage.removeItem(this._genName(name))
        }
    }
}
