const readline = require('readline');

function readLine(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}


const ans = readLine("This is just a mock to start with the app! Please press \"Enter\" key");