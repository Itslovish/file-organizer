let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function print(path1){
    
    let contentsoffolder = fs.readdirSync(path1);                 

    let pathOfMainFolder = path.join(path1,"organize");           
    fs.mkdirSync(pathOfMainFolder);                               
    for(let i = 0 ; i < contentsoffolder.length ; i++){            
        let extension = path.extname(contentsoffolder[i]);
        let ext = extension.split(".")[1];
        // console.log(extension);
        // console.log(ext);
        let folderName = "other";

        for(key in types){                                      
            for(let j = 0 ; j < types[key].length ; j++){      
                if(ext == types[key][j]){                       
                    folderName = key;
                    break;
                } 
            }
        }

        let typesPath = path.join(pathOfMainFolder,folderName);

        let doesExist = fs.existsSync(typesPath);
        
        if(!doesExist){                                       
                fs.mkdirSync(typesPath);                        
        } 

        let srcPath = path.join(path1,contentsoffolder[i]);                       
        let destPath = path.join(pathOfMainFolder,folderName,contentsoffolder[i]);  
        fs.copyFileSync(srcPath,destPath);
    }
}

module.exports = {
    fxn : print
}