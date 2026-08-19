export const getHueFromString = (str: string): number => {
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
            sum += str.charCodeAt(i);
        }
        return (sum * 10 + 250) % 360;
    };