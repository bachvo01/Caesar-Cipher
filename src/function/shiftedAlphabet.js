export const shiftedAlphabet = (alphabet, shift) => {
    let secondArr = []
    for(let i = 0; i < alphabet.length; i++){
        if(i < shift){
            secondArr.push(alphabet[i])
        }
    }

    const result = alphabet.concat(alphabet)
    return result
}