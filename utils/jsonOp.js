const fs = require('fs');
const path = require('path');

const read = (file) => {
    try{
        const data = fs.readFileSync(path.resolve(__dirname, file), 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        return {};
    }
}

const write = (file, data) => {
    try{
        fs.writeFileSync(path.resolve(__dirname, file), JSON.stringify(data, null, 4), 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        return {};
    }
}

module.exports = {
    readJSONFile, 
    writeJSONFile
}