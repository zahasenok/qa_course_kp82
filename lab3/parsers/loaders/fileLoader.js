const fs = require('fs');


class FileLoader{
    constructor(filename){
        this.filename = filename;
    }

    async save(data) {
        console.log('-----------------------------------------------')
        console.log("saving")
        const out = JSON.stringify(data);
        fs.appendFile(this.filename, out, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    }
}

exports.FileLoader = FileLoader