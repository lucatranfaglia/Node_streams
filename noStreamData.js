const {readFileSync , writeFileSync, createReadStream, createWriteStream} = require('fs');

const namefile = './filecsv_no_stream.out';

const createFile = async function() {
    const column = ['row, name']
    for (let index = 0; index < 10000; index++) {
        column.push(`${index}, test_${index}`);        
    }
    writeFileSync(namefile, column.join('\n'));        
}

const readNoStream = async function () {
    console.log('readNoStream START')
    // unico buffer
    const fileRead = readFileSync(namefile, 'utf-8'); //utf-8
    // console.log('fileRead: ', fileRead);

    const lines = fileRead.trim('\n').split('\n');
    lines.shift();

    const sum = lines.reduce((acc, line)=>{
        console.log("line: ",line.split(',')[0]);
        return acc + parseFloat(line.split(',')[0])
    }, 0)
    console.log('sum: ', sum);
    return sum;
}

const noStreamData = async function (req, res) {
    try {        
        await createFile();    
        const result = await readNoStream();  
        res.status(200).json( result);          
    } catch (error) {
        if (error.message) {
            res.status(500).send({"error":error.message});            
        }        
        res.status(500).send(error);
    }                       
}



module.exports = {noStreamData}