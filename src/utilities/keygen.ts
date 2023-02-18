export const keyGenerator = () => {
    const min = 100;
    const max = 100000000;
    return Math.floor(Math.random() * (max - min) + min )
}