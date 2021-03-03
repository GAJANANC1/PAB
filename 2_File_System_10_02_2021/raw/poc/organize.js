let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
function isFileOrNot(src) {
    return fs.lstatSync(src).isFile();
}
function readContent(src) {
    return fs.readdirSync(src);
}
function checkExtension(src) {
    // C:\Users\Ritik Singh\Desktop\Batches\PAB\2_File_System_10_02_2021\activity\mycli.js 
    let ext = src.split(".").pop();
     //console.log(ext);
    for (let type in types) {
        for (let i = 0; i < types[type].length; i++) {
            if (ext == types[type][i]) {
                return type;
            }
        }
    }
    return "others";
}
function sendFile(src, dest, folderName) {
    // check if folder 
// src,path-> file
    let foldertoMake = path.join(dest, folderName);
    if (fs.existsSync(foldertoMake) == false) {
        fs.mkdirSync(foldertoMake);
    }
    // src -> foldertomake
    let pathofdestFile = path.join(foldertoMake,
         path.basename(src));
    // abc-> f1.txt
    // def -> f1.txt
    fs.copyFileSync(src, pathofdestFile);
}
function organizeFiles(src) {
    // src -> folder create
    let folderToMake = path.join(src, "Organized_files");
    if (fs.existsSync(folderToMake) == false) {
        fs.mkdirSync(folderToMake);
    }
    // abstraction
    organize(src, folderToMake)
    // not present ->  create a directory
    // organize -> files inside different folders
}
function organize(src, dest) {
    // content read 
    let isFile = isFileOrNot(src);
    if (isFile == true) {
        // extension check
        let folderName = checkExtension(src);
        // console.log(folderName,"  ->  ",path.basename(src));
        // copy file
        sendFile(src, dest, folderName);
        // console.log(src);
    } else {
        // console.log(src);
        // folder -> recursive call
        let fDirnames = readContent(src);
        // recursion 
        for (let i = 0; i < fDirnames.length; i++) {
            let child = fDirnames[i];
            let dirNamepath = path.join(src, child);
            organize(dirNamepath, dest);
        }
    }
    //  file->
}
organizeFiles(process.argv[2]);
// checkExtension(process.argv[2]);