const fs = require("fs");
const path = require('path');

exports.isFileExist = (path) => {
    return new Promise((resolve, reject) => {
        fs.exists(path, function (exists) {
            return exists ? resolve() : reject();
        });
    })
}



function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        let fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList);  //递归读取文件
        } else {
            filesList.push(fullPath);
        }
    });
    return filesList;
}
function trimLastSlash(str) {
    return str && str.replace(/\/$/, "");
}
exports.getFuzzyPath = (dataDir, mockPrefix) => {
    const allFiles = readFileList(dataDir);
    // console.log("allFiles", allFiles)
    const fileDirs = new Set();
    allFiles.forEach(e => {
        let str = e.replace(/\\/g, "/");
        str = str.replace(/[^/]*(\/.*)\/.*/, "$1")
        fileDirs.add(str);
    })
    // console.log("fileDirs", fileDirs);
    let list = ([...fileDirs]).filter(e => {
        return /\{.*\}/.test(e)
    }).map(e => {
        let strReg = "^" + trimLastSlash(mockPrefix) + e + "$";
        strReg = strReg.replace(/\{[^/]*\}/g, "[^/]+").replace("/", "\/");
        return {
            reg: new RegExp(strReg),
            dir: trimLastSlash(dataDir) + e
        };
    });
    // console.log(list)
    return list;
}