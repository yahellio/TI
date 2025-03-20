const getArr = (val) => {
    let arr = [];
    for(let i=0; i < val.length; i++) arr.push([val[i]]);
    return arr;
}

const writeKey = (arr, key) => {
    let shift = -1;
    for(let i = 0; i < arr.length; i++){
        if(i % key.length === 0){shift++};
        if(key[i % key.length].charCodeAt(0) <= 1045 && key[i % key.length].charCodeAt(0) !== 1025){
            arr[i].push(key[i%key.length].charCodeAt(0) +shift - 1040);
        }else if(key[i % key.length].charCodeAt(0) > 1045){
            arr[i].push(key[i%key.length].charCodeAt(0) +shift - 1040 + 1);
        }else{
            arr[i].push(6 + shift);
            console.log('`')
        }

        if(arr[i][0].charCodeAt(0) <= 1071 || arr[i][0].charCodeAt(0) === 1025){
            arr[i].push(1040);
        }else{
            arr[i].push(1072);
        };
    }
    return arr;
}

const createC = (arr) => {
    let result = '';
    let temp;
    for(let symb of arr){
        if(symb[0] === 'ё' || symb[0] === 'Ё'){
            temp = (6 + symb[1])%33;
        }else{
            temp = (symb[0].charCodeAt(0) + symb[1] - symb[2]) % 33;
            if (symb[0].charCodeAt(0) >= 1046  && symb[0].charCodeAt(0) <= 1071) {temp++; console.log("`");}; 
            if (symb[0].charCodeAt(0) >= 1078  && symb[0].charCodeAt(0) <= 1104) {temp++; console.log("`");}; 
            temp %= 33;
        }
        if(temp <= 5){
            result += String.fromCharCode(temp+symb[2]);
        }else if(temp >= 7){
            result += String.fromCharCode(temp+symb[2]-1);
        }else if(temp === 6 && symb[2] === 1040){
            result += "Ё";
        }else if(temp === 6 && symb[2] === 1072){
            result += "ё";
        }
    }
        
    return result;
}

const getM = (arr) => {
    let result = '';

    let temp;
    for(let symb of arr){
        if(symb[0] === 'ё' || symb[0] === 'Ё'){
            temp = (6 - symb[1])%33;
        }else{
            temp = (symb[0].charCodeAt(0) - symb[1] - symb[2]);
            if (symb[0].charCodeAt(0) >= 1046  && symb[0].charCodeAt(0) <= 1071) {temp++; console.log("`");}; 
            if (symb[0].charCodeAt(0) >= 1078  && symb[0].charCodeAt(0) <= 1104) {temp++; console.log("`");}; 
        }
        if(temp < 0){
            temp += 33;
        }
        if(temp <= 5){
            result += String.fromCharCode(temp+symb[2]);
        }else if(temp >= 7){
            result += String.fromCharCode(temp+symb[2]-1);
        }else if(temp === 6 && symb[2] === 1040){
            result += "Ё";
        }else if(temp === 6 && symb[2] === 1072){
            result += "ё";
        }
    }

    return result;
}

export function EncryptV(val, key){
    key = key.replace(/[^а-яА-ЯёЁ]/g, ''); 
    val = val.replace(/[^а-яА-ЯёЁ]/g, '');
    //val = val.toUpperCase();
    key = key.toUpperCase();
    if(key === "") return '--------------------------------------------------------------------Error-----------------------------------------------------------------------\n\n----------------------------------------------------------------Incorrect key-----------------------------------------------------------------';
    if(val === "") return '--------------------------------------------------------------------Error-----------------------------------------------------------------------\n\n----------------------------------------------------------------Incorrect text-----------------------------------------------------------------';

    let arr = getArr(val);
    arr = writeKey(arr, key);

    return createC(arr);
}

export function DecryptV(val, key){
    key = key.replace(/[^а-яА-ЯёЁ]/g, ''); 
    val = val.replace(/[^а-яА-ЯёЁ]/g, '');
    //val = val.toUpperCase();
    key = key.toUpperCase();
    if(key === "") return '--------------------------------------------------------------------Error-----------------------------------------------------------------------\n\n----------------------------------------------------------------Incorrect key-----------------------------------------------------------------';
    if(val === "") return '--------------------------------------------------------------------Error-----------------------------------------------------------------------\n\n----------------------------------------------------------------Incorrect text-----------------------------------------------------------------';
    
    let arr = getArr(val);
    arr = writeKey(arr, key);
    
    return getM(arr);
}