/**
 * 資料檢查器。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/checker.md
 */
export declare const checker: {
    /**
     * 負責檢查檔案是否符合 input tag accept 指定的格式。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/checker.md#inputaccept
     */
    inputAccept: (targetType: string, fileType: string, fileName?: string) => boolean;
};
