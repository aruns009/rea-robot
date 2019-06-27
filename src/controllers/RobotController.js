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

robot.place = function (xAxis, yAxis, direction){
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
    } catch (e) { 
        return e.message;
    }
},
robot.report = function () {
    try{
        if (robot.placedRobot) {
            var currentRobotPosition = this.getRobotCoordinates();
            if (currentRobotPosition == undefined) {
                throw new Error(message.noPlaceInvoked);
            } else {
                return this.constructMessage(currentRobotPosition);
            }
        } else{
            throw new Error(message.noPlaceInvoked);
        }
    }catch(e){
        return e.message;
    }
},
robot.isInTable = function (xAxis, yAxis) {
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
},
robot.getRobotCoordinates = function () {
    return this.currentRobotPosition;
},
robot.constructMessage = function (currentRobotPosition) {
    return(message.robotPosition + currentRobotPosition.xAxis + ', ' + currentRobotPosition.yAxis + ', ' + currentRobotPosition.direction);
}
module.exports = { robot, message };