export const groupBy = (arr: object[], key: string) => {
    if (arr.length === 0) return undefined;
    const obj = {};
    for (const item of arr) {
        const errMsg: string|null = item[key];
        if (errMsg) {
            obj[errMsg] ??= [];
            obj[errMsg].push(item);
        }
    }
    return obj;
};