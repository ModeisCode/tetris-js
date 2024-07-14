let blocks = [];
let Id = 0;

const worker = new Worker('worker.js');

async function startGame() {
    for (let index = 0; index < 40; index++) {
        if (index % 5 === 0 && index !== 0) {
            $("#t-area").append(`<br>`);
        }
        $("#t-area").append(`<div id="${index}" class="block"><h5>${index}</h5></div>`);
    }
    const block = [1,2,3.4];
    const block2 = [1,2,7,3];
    const block3 = [0,1,5];
    draw(block,100);
    draw(block2,5000);
    //draw(block3,1000);
}

async function collision(checkBlock) 
{
    checkBlock.data.forEach((data_value)=> {
        blocks.forEach((block)=> {
            block.data.forEach((value)=> {
                if (data_value - 1 === value) {
                    return true;
                }
            });
        });
    });
    return false;
}

function removeBlock(id) {
    let index = 0;
    blocks.forEach((block)=>{
        if (block.id === newBlock.id) 
        {
            blocks.slice(index , 1);
        }
        index++;
    });
}

function updateBlock(newBlock) 
{
    blocks.forEach((block)=>{
        if (block.id === newBlock.id) 
        {
            block.data = newBlock.data;
        }
        else {
            blocks.push(newBlock);
        }
    });
}

async function draw(block,interval) {
    block = block.map((element) => element - 5);
    const i = setInterval(()=> {
        //while (Math.max(...block) < 35) {
        if (Math.max(...block) > 35) 
        {
            clearInterval(intervalId);
        }

        const oldBlock = block.slice(); // Create a copy for removing "red" class
    
        // Remove "red" class from previous block elements
        oldBlock.forEach((element) => $(`#${element}`).removeClass("red"));
    
        // Update block positions
        block = block.map((element) => element + 5);
        
        // Add "red" class to elements in the updated block
        block.forEach((element) => $(`#${element}`).addClass("red"));
    
        let newBlock = { id: Id , data: block};
        Id++;
        updateBlock(newBlock);
        console.table(blocks.data);

        if (collision(newBlock)) {
            clearInterval(i);
        }

        //}
    },interval);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

startGame();
