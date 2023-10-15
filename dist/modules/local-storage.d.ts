declare type Intercept = {
    Set: (_name: string, _data: any) => any;
    Get: (_name: string, _data: any, _context: {
        /** Storage */
        storage: LocalStorage<any>;
        /** 是否是採用預設值 */
        isDefault: boolean;
        /** 獲取預設值 */
        defaultValue: () => any;
    }) => any;
};
declare type CusStorage = {
    readonly length: number;
    keys?: () => string[];
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
};
export declare class LocalStorage<T extends Record<string, any>> {
    private options?;
    private storage;
    private namespaces;
    private interceptGet;
    private interceptSet;
    constructor(namespaces: string, options?: {
        /** 指定運行的 LocalStorage 環境，假如你想應用在 SessionStorage 上必須設定此參數 */
        storageSystem?: CusStorage;
        /** 假如該欄位尚未寫入時給予預設值 */
        defaultColumns?: Partial<{
            [K in keyof T]: () => T[K];
        }>;
        /** 攔截相關 get set 設定 */
        intercept?: {
            /** 攔截資料獲取 */
            get?: Intercept['Get'];
            /** 攔截資料設定 */
            set?: Intercept['Set'];
        };
    });
    private _genName;
    /** 設定指定名稱的資料 */
    set<K extends keyof T>(name: K, data: T[K] | ((_value: T[K]) => T[K])): void;
    /** 獲取指定名稱的資料 */
    get<K extends keyof T>(name: K): T[K];
    /** 刪除整個 namespaces 的資料 */
    clear(): void;
    /** 刪除指定名稱的資料 */
    remove<K extends keyof T>(name: K): void;
}
export {};
