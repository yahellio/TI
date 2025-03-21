//x^28 + x^3 + 1
 
const x28 = 27;
const x3 = 2;
 
function createArr(key){
    const charArray = key.split('');
    
    const binaryArray = charArray.map(char => parseInt(char, 2));
    
    return binaryArray;
}
 
export function Ncrypt(val, key){
    let res = [];
    let reg = createArr(key);
    for(let i = 0; i < val.length; i++){
        let xorResult = reg[x3] ^ reg[x28];
        let binaryXOR = xorResult.toString(2);
        res.unshift(binaryXOR);

        reg.push(binaryXOR);
        reg.shift();
    }

    const valBits = val.split('').map(bit => parseInt(bit, 2));

    const xorWithVal = valBits.map((bit, index) => bit ^ res[index]);

    const resultBinary = xorWithVal.map(bit => bit.toString(2)).join('');

    return [resultBinary,res];
}   
