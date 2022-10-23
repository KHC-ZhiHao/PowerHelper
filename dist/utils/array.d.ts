/**
 * 將陣列依照數量集成一組
 * @see
 */
export declare const groups: <T>(size: number, data: T[]) => T[][];
/**
 * 隨機獲取陣列內的一個值
 */
export declare const randomPick: <T>(items: T[]) => T;
/**
 * 隨機獲取陣列內的一個組
 */
export declare const randomPicks: <T>(take: number, items: T[]) => T[];
