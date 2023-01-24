export const getAllWords = (text) => {
    const allWordsIncludingDups = text.split(' ');
    const wordSet = allWordsIncludingDups.reduce((prev, current) => {
        prev[current] = true;
        return prev;
    }, {});
    
    return Object.keys(wordSet);
};