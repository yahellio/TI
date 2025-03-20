const keyInArr = (key) => {
    //Массив для хранения букв и их индексов
    const lettersWithIndex = [];
    for (let i = 0; i < key.length; i++) {
        lettersWithIndex.push({ char: key[i], index: i });
    }

    //Сортируем массив по буквам
    for (let i = 0; i < lettersWithIndex.length - 1; i++) {
        for (let j = i + 1; j < lettersWithIndex.length; j++) {
            if (lettersWithIndex[i].char > lettersWithIndex[j].char) {
                const temp = lettersWithIndex[i];
                lettersWithIndex[i] = lettersWithIndex[j];
                lettersWithIndex[j] = temp;
            }
        }
    }

    //Порядковые номера
    for (let i = 0; i < lettersWithIndex.length; i++) {
        lettersWithIndex[i].order = i + 1; 
    }

    //Восстанавливаем исходный порядок
    const result = [];
    for (let i = 0; i < key.length; i++) {
        for (let j = 0; j < lettersWithIndex.length; j++) {
            if (lettersWithIndex[j].index === i) {
                result.push([lettersWithIndex[j].order]);
                break;
            }
        }
    }

    return result;
};

const valInArr = (val, arr) => {
    let i = 0;
    while(i < val.length){
        arr[i % arr.length].push(val[i]);
        i++;
    }
    return arr;
}

const getC = (arr,key) => {
    let c = "";
    for(let i = 0;i < key.length; i++){
        for(let list of arr){
            if(list[0] == i+1){
                for(let j = 1; j < list.length; j++){
                    c+=list[j];
                } 
            }
        }
    }
    return c;
}

export function Encrypt(val, key){
    key = key.replace(/[^a-zA-Z]/g, '');
    val = val.replace(/[^a-zA-Z]/g, '');
    key = key.toUpperCase();
    if(key === "") return '--------------------------------------------------------------------Error-----------------------------------------------------------------------\n\n----------------------------------------------------------------Incorrect key-----------------------------------------------------------------';
    if(val === "") return '--------------------------------------------------------------------Error-----------------------------------------------------------------------\n\n----------------------------------------------------------------Incorrect text-----------------------------------------------------------------';
    let arr = keyInArr(key);
    arr = valInArr(val,arr);
    return getC(arr,key);
}


const setUpBlocks = (length, blocks, block, add_block) => {
    for(let i = 0; i < length; i++){
        blocks.push(block);
    }
    for (let i = 0; i < length && add_block > 0; i++) {
        blocks[i] += 1;
        add_block--;
    }
    return blocks;

}

const cInArr = (blocks,arr,val) => {
    let index = 0;
    for(let i = 0; i < blocks.length;i++){
        for(let j = 0; j < blocks.length; j++){
            if(arr[j][0] === i+1){
                for(let k = 1; k <= blocks[j]; k++){
                    arr[j].push(val[index]);
                    index++;
                }
            }
        }
    }


    return arr;
}

const valOutArr = (val, arr) => {
    let result = "";
    let i = 0;
    let level = 1;
    while(i < val.length){
        if(arr[i % arr.length][level] == undefined) return result;
        result += arr[i % arr.length][level] ;
        i++;
        if(i % arr.length === 0) level++;
    }
    return result;
}

export function Decrypt(val, key){
    key = key.replace(/[^a-zA-Z]/g, '');
    val = val.replace(/[^a-zA-Z]/g, '');
    key = key.toLowerCase();
    if(key === "") return '--------------------------------------------------------------------Error-----------------------------------------------------------------------\n\n----------------------------------------------------------------Incorrect key-----------------------------------------------------------------';
    if(val === "") return '--------------------------------------------------------------------Error-----------------------------------------------------------------------\n\n----------------------------------------------------------------Incorrect text-----------------------------------------------------------------';
    let block = Math.floor(val.length / key.length);
    let add_block = val.length % key.length;
    let blocks = [];

    blocks = setUpBlocks(key.length,blocks,block,add_block);

    let arr = keyInArr(key);
    arr = cInArr(blocks,arr,val);
    console.log(arr);
    
    return valOutArr(val,arr);
}