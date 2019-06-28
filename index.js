//this is the entry point file for the application
const readLine = require('readline');
var os = require("os");
var fs = require("fs");
var robotController = require("./src/controllers/RobotController"); //import the robot controller
var robotApp = {};
//process settings
process.title = "REA robot";

//getting the standard input, output
var stdin = process.stdin;
var stdout = process.stdout;
var fileExist = process.argv.slice(2).length ? process.argv.slice(2)[0] : null;

//setting the encoding type
stdin.setEncoding('utf8');

// read the user input from terminal
stdin.on('data', function (data) {
    sendOutput(data);
});

//perform the action based on the user input. 
//This function will invoke the respective method in RobotController based on the user command
var performAction = function (inputCommand) {
    var response = null;
    try {
        switch (true) {
            case (inputCommand.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i) != null):
                var args = inputCommand.trim().split(/(?:\s+|,\s*)/i).slice(1);
                response = robotController.robot.place(args[0], args[1], args[2]);
                break;
            case (inputCommand.match(/^move\s*$/i) != null):
                response = robotController.robot.move();
                break;
            case (inputCommand.match(/^report\s*$/i) != null):
                response = robotController.robot.report();
                break;
            case (inputCommand.match(/^left\s*$/i) != null):
                response = robotController.robot.left();
                break;
            case (inputCommand.match(/^right\s*$/i) != null):
                response = robotController.robot.right();
                break;
            default:
                throw new Error(robotController.message.initialPrompt);
                break;
        }
    } catch (e) {
        return e.message;
    }
    return response;
}
//this function will send the output to the user in the commandline after the action is performed.
var sendOutput = function (data) {
    var inputData = data.trim();

    if (inputData.match(/(q|quit|exit)/i)) {
        process.exit();
    }
    var response = performAction(inputData);
    if (response instanceof Error) {
        stdout.write(response.message + os.EOL + '> ');
    } else if (typeof response == 'string') {
        stdout.write(response + os.EOL + '> ');
    } else {
        stdout.write('> ');
    }
};
//this function reads comamnds from a file and execute commands each line by line
var readCommandsFromFile = function(fileName){
    try {
        fs.accessSync(fileName, fs.F_OK | fs.R_OK);
    }  catch (e) {
        stdout.write(robotController.message.fileNotPresent + os.EOL);
        process.exit();
    }
    var rl = readLine.createInterface({
        input: fs.createReadStream(fileName),
        terminal: false
    });
    rl.on('line', function (line) {
        stdout.write(line + os.EOL);
        sendOutput(line);
    });
    rl.on('close', function () {
        rl.close();
        process.exit();
    });        

}
if (fileExist) {
    readCommandsFromFile(fileExist);
}
//this function is invoked to start the application
robotApp.execute = function () {
    stdout.write(robotController.message.welcome + os.EOL + '> ');
    stdin.resume();
};

robotApp.execute();