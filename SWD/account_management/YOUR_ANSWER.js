const fs = require('fs');
const path = require('path')

// fs.readdir('accounts', (err, fileList) => {
//     console.log(fileList);
//     console.log(fileList.length);
// });

fs.readFile(path.join('accounts', 'serena_klein'), (err, fileContents) => {
    //Node uses a special data type (called buffer) to store the contents of a file 
    //(for performance reasons)
    //By calling toString() we can convert this type to a human readble string
    console.log(fileContents.toString());
});

fs.readFile;
// Get an array of all files in the folder: 'accounts' using fs.readdir
// Log the contents of the last file in the list to the console using fs.readFile