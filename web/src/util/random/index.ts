export const randomString = () => Math.random().toString(36).substring(2, 15)
export const randomNumber = () => Math.floor(Math.random() * 100)
export const randomBoolean = () => Math.random() < 0.5
export const randomDate = () => {
    const start = new Date(2000, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}