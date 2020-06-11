let sum = (...m) => {
    let arr = [...m]
    let count = 0 
    for (let i = 0; i < arr.length; i++) {
        count +=arr[i]
    }
    return count
}

let minus = (a, b) => a-b

export var v = 123

setTimeout(() => {
    v = 100
}, 500);



export default {sum, minus} 
