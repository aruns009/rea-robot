var config = require('../config/config');

var message = config.messages;
var defaults = config.defaults;
var robot = {};

robot.placedRobot = false;

robot.currentRobotPosition = {
    xAxis: undefined,
    yAxis: undefined,
    direction: undefined
};

robot.place = function(xAxis, yAxis, direction) {
    try {
        if (!Number.isInteger(parseInt(xAxis)) || !Number.isInteger(parseInt(yAxis)) || (xAxis < 0 ) ||(yAxis < 0)) {
            throw new Error(message.invalidCoordinates);
        }
        if (this.isInTable(xAxis, yAxis)) {
            throw new Error(message.edgeLocation);
        }
        direction = direction.toUpperCase();
        if ((!direction) || (defaults.commands.directions.indexOf(direction) < 0)) {
            throw new Error(message.invalidDirections);
        }
        if(this.storeRobotCoordinates(xAxis, yAxis, direction)){
            this.placedRobot = true;
        }
        return currentRobotPosition;
    } catch (e) { 
        return e.message;
    }
},
robot.isInTable = function(xAxis, yAxis){
    return ((xAxis > (defaults.table.minlength + (defaults.table.maxlength - 1))) || (yAxis > (defaults.table.minbreadth + (defaults.table.maxbreadth - 1))));
},
robot.storeRobotCoordinates = function (xAxis, yAxis, direction) {
    try{
        this.currentRobotPosition.xAxis = xAxis,
        this.currentRobotPosition.yAxis = yAxis,
        this.currentRobotPosition.direction = direction;
    }catch(e){
        return false
    }
    return true;
}
module.exports = { robot, message };