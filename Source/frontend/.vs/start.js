const exec = require('child_process').exec;

const child = exec('npm start',
    (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });

console.log(`WebPack running on port: ${process.env.port}`);
`