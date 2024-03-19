const {createReadStream, createWriteStream} = require('fs');

const namefile = './filecsv.out';


const createFileStream = async function() {
    const writeStream = createWriteStream(namefile);

    for (let index = 0; index < 10000; index++) {
        const overWaterMark = writeStream.write(`${index}, test_${1}\n`);
        if(!overWaterMark){
            await new Promise( (resolve ) =>{
                writeStream.once('drain', resolve);
            })
        }
    }
    writeStream.end();
}

const readStream = async function () {
    console.log('readStream START')
    const fileReadStreram = createReadStream(namefile); //utf-8
    let sum = 0, unprocessed='';
    // buffer suddivisi in chunk
    fileReadStreram.on('data', (chunk)=>{
        // convert buffer in string
        let chunkString = unprocessed + chunk.toString();
        unprocessed = '';
        let startIndex = 0;

        for (let ch = startIndex; ch < chunkString.length; ch++) {
            if(chunkString[ch]==='\n'){                
                const line= chunkString.slice(startIndex, ch);
                const idx = line.indexOf(',');
                const cost = line.slice(0, idx);          // first element to string
                // const cost = line.slice(idx+1);        // second element to string                
                sum += parseFloat(cost);
                startIndex = ch+1;
            }            
           
        }

        if(chunkString[chunkString.length-1] !== '\n'){
            unprocessed = chunkString.slice(startIndex);
            console.log("unprocessed: " ,unprocessed);
        }

    });

    fileReadStreram.on('end', ()=>{
        console.log("sum: " ,sum);
        return sum;
    })
}


const streamsData = async function (req, res) {
    try {        
        await createFileStream();    
        const result = await readStream();  
        console.log("result: " ,result);
        res.status(200).json( result);          
    } catch (error) {
        if (error.message) {
            res.status(500).send({"error":error.message});            
        }        
        res.status(500).send(error);
    }    
}



module.exports = {streamsData}