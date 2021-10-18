const arr = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '' 
];

let playerCharacter = '';
let computerCharacter = '';
let isComputerMove = false;

const selectCharacter = (char) => {
    resetGame();
    playerCharacter = char;
    computerCharacter = char === 'X' ? 'O' : 'X';
    document.getElementById('modal').style.display = "none";
}

const resetGame = () => {
    // Reset the array 
    for(let i=0; i< arr.length; i++){
        arr[i] = '';
    }
    // Reset the UI
    for(let i=0; i< arr.length; i++){
        let blockId = `block${i}`;
        document.getElementById(blockId).innerHTML = '';
        document.getElementById(blockId).style.backgroundColor = 'white';
    }
} 

const makePlayerMove = (block) => {
    if(isComputerMove === false){
        makeMove('player',block, playerCharacter);    
    }
}

const makeComputerMove = () => {
    let availableBlocks = [];
    arr.forEach((value,index) => {
        if(value === ''){
            availableBlocks.push(index)
        }
    });
    const block = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];
    setTimeout(() => makeMove('computer', block, computerCharacter), 500);
}

const makeMove = (entity, block, char) => {
    if(arr[block] === ''){
        arr[block] = char;
    }
    else{
        console.log('value taken');
        return;
    }
    const blockId = `block${block}`;
    document.getElementById(blockId).innerHTML = char;
    document.getElementById(blockId).style.backgroundColor = 'rgb(243, 243, 243)';
    win = checkForWin(char)
    if(win !== false){
        console.log(`${entity} wins`);
        win.forEach(id => document.getElementById(`block${id}`).style.backgroundColor = 'green');
        document.getElementById('winner').innerHTML = `${entity} wins`
        setTimeout(() => {document.getElementById('modal').style.display = "block"}, 200);
        return;
    }
    if(entity === 'player'){
        isComputerMove = true;
        makeComputerMove();
    }
    else{
        isComputerMove = false;
    }
}

const checkForWin = (char) => {
    const count = (arr.filter((value) => value === char)).length;
    if(count < 3){
        return false;
    }
    if (checkCombination(arr[0], arr[1], arr[2], char)){
        return [0, 1, 2];
    }
    if (checkCombination(arr[3], arr[4], arr[5], char)){
        return [3, 4, 5];
    }
    if (checkCombination(arr[6], arr[7], arr[8], char)){
        return [6, 7, 8];
    }
    if (checkCombination(arr[0], arr[3], arr[6], char)){
        return [0, 3, 6];
    }
    if (checkCombination(arr[1], arr[4], arr[7], char)){
        return [1, 4, 7];
    }
    if (checkCombination(arr[2], arr[5], arr[8], char)){
        return [2, 5, 8];
    }
    if (checkCombination(arr[0], arr[4], arr[8], char)){
        return [0, 4, 8];
    }
    if (checkCombination(arr[6], arr[4], arr[2], char)){
        return [6, 4, 2];
    }
    return false;
}

const checkCombination = (val1,val2,val3,char) => {
    if(val1 === char && val2 === char && val3 === char){
        return true;
    }
    else{
        return false;
    }
}


