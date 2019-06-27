const readline = require('readline');
var os = require("os");
var robotController = require("./src/controllers/RobotController");
var robotApp = {};
//process settings
process.title = "REA robot";

//getting the standard input, output
var stdin = process.stdin;
var stdout = process.stdout;

//setting the encoding type
stdin.setEncoding('utf8');

// read the user input from terminal
stdin.on('data', function(data) {
    sendOutput(data);
});

var performAction = function (inputCommand) {
    var response = null;
    try{
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
    }catch(e){
        return e.message;
    }
    return response;
}
var sendOutput = function(data) {
    var inputData = data.trim();

    if (inputData.match(/(quit|exit)/i)){
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

robotApp.execute = function() {
    stdout.write(robotController.message.welcome + os.EOL + '> ');
    stdin.resume();
};

robotApp.execute();