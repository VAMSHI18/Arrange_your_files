'use strict';
const fs = require('fs-extra');
const _ = require('underscore');
const pathLib = require('path');
const moveFile = require('move-file');

const Documents_path = '/Users/vpatelna/Documents';

const Downloads_path = '/Users/vpatelna/Downloads';

var readFiles = async function(path) {
    var files = fs.readdirSync(path);

    for(var file of files) {
        try {
            var isFile = fs.statSync(pathLib.join(path, file)).isFile();
            // console.log(isFile);
        } catch(e) {

        }
        if(isFile) {
            // console.log(file);
            // split the file name by dot
            // var file_string = file + '';
            
            var extension = pathLib.extname(file);
            extension = extension.substring(1);
            
            if(fs.existsSync(pathLib.join(path, extension))) {
                await moveFile(pathLib.join(path, file), pathLib.join(path, extension, file));
            }
            else {
                fs.mkdirSync(pathLib.join(path, extension));
                await moveFile(pathLib.join(path, file), pathLib.join(path, extension, file));
            }
        }
    }
    console.log('Sorting Done!');
};

readFiles(Documents_path);