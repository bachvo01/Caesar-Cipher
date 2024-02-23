export const shift = (array, step) => {
    let firstArr = []
    let secondArr = []

    for(let i = 0; i < array.length; i++){
        if(i < step){
            secondArr.push(array[i])
        }
        else{
            firstArr.push(array[i])
        }
    }

    const result = firstArr.concat(secondArr)
    console.log(result)

    return result
}