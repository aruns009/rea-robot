var config = require('../config/config');
var __ = require('lodash');

var message = config.messages;
var defaults = config.defaults;
var robot = {};

robot.placedRobot = false;

//setting the initial values for the robot as undefined.
robot.currentRobotPosition = {
    xAxis: undefined,
    yAxis: undefined,
    direction: undefined
};

/*
description - this method will place the robot into the table.
params - xAxis (X-axis co-ordinates for the robot)
         yAxis (Y-axis co-ordinates for the robot)
         direction (sets the direction for the robot)
*/
robot.place = function (xAxis, yAxis, direction){
    try {
        if (!Number.isInteger(parseInt(xAxis)) || !Number.isInteger(parseInt(yAxis)) || (xAxis < 0 ) ||(yAxis < 0)) {
            throw new Error(message.invalidCoordinates);
        }
        if (this.isInTable(parseInt(xAxis), parseInt(yAxis))) {
            throw new Error(message.edgeLocation);
        }
        if (!direction || typeof direction !== 'string'){
            throw new Error(message.invalidDirections);
        }
        direction = direction.toUpperCase();
        if (defaults.commands.directions.indexOf(direction) < 0) {
            throw new Error(message.invalidDirections);
        }
        if(this.storeRobotCoordinates(xAxis, yAxis, direction)){
            this.placedRobot = true;
        }
    } catch (e) { 
        return e.message;
    }
},
/*
description - this method will return the current status of the robot
*/
robot.report = function () {
    try{
        if (robot.placedRobot) {
            var currentRobotPosition = this.getRobotCoordinates();
            if (currentRobotPosition == undefined) {
                throw new Error(message.noPlaceInvoked);
            } else {
                return this.constructReportMessage(currentRobotPosition);
            }
        } else{
            throw new Error(message.noPlaceInvoked);
        }
    }catch(e){
        return e.message;
    }
},
/*
description - this method will move the robot based on the current direction.
*/
robot.move = function () {
    try{
        if (robot.placedRobot) {
            var tempRobotPosition = Object.assign({}, this.getRobotCoordinates());
            if(tempRobotPosition){
                switch (tempRobotPosition.direction) {
                    case "NORTH":
                        ++tempRobotPosition.yAxis;
                        break;
                    case "EAST": 
                        ++tempRobotPosition.xAxis;
                        break;
                    case "SOUTH": 
                        --tempRobotPosition.yAxis;
                        break;
                    case "WEST": 
                        --tempRobotPosition.xAxis;
                        break;
                    default:
                        break;
                }
            }
            if (this.isInTable(tempRobotPosition.xAxis, tempRobotPosition.yAxis)) {
                throw new Error(message.edgeLocation);
            }
            if(this.storeRobotCoordinates(tempRobotPosition.xAxis, tempRobotPosition.yAxis, tempRobotPosition.direction)){
                this.placedRobot = true;
            }
        } else{
            throw new Error(message.noPlaceInvoked);
        }
    }catch(e){
        return e.message;
    } 
},
/*
description - this method will change the orientation of the robot to its left from its current direction.
*/
robot.left = function () {
    try{
        if (robot.placedRobot && defaults.commands.directionMapping) {
            this.currentRobotPosition.direction = defaults.commands.directionMapping[this.currentRobotPosition.direction];
        } else{
            throw new Error(message.noPlaceInvoked);
        }
    }catch(e){
        return e.message;
    } 
},
/*
description - this method will change the orientation of the robot to its right from its current direction.
*/
robot.right = function () {
    try{
        if (robot.placedRobot && defaults.commands.directionMapping) {
            this.currentRobotPosition.direction = __.invert(defaults.commands.directionMapping)[this.currentRobotPosition.direction];
        } else{
            throw new Error(message.noPlaceInvoked);
        }
    }catch(e){
        return e.message;
    } 
},
/*
description - this method will check if the cordinates of the robot is valid and within the table.
params - xAxis (X-axis co-ordinates for the robot)
         yAxis (Y-axis co-ordinates for the robot)
*/
robot.isInTable = function (xAxis, yAxis) {
    return ((xAxis > (defaults.table.minlength + (defaults.table.maxlength - 1))) || 
           ( xAxis < defaults.table.minlength ) || 
           ( yAxis < defaults.table.minbreadth ) || 
           ( yAxis > (defaults.table.minbreadth + (defaults.table.maxbreadth - 1))));
},
/*
description - this method will save the current co-ordinates of the robot in memory
params - xAxis (X-axis co-ordinates for the robot)
         yAxis (Y-axis co-ordinates for the robot)
         direction (sets the direction for the robot)
*/
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
/*
description - this method will return the current position of the robot
*/
robot.getRobotCoordinates = function () {
    return this.currentRobotPosition;
},
/*
description - this method will construct the message for the report method.
*/
robot.constructReportMessage = function (currentRobotPosition) {
    return(message.robotPosition + currentRobotPosition.xAxis + ', ' + currentRobotPosition.yAxis + ', ' + currentRobotPosition.direction);
}
module.exports = { robot, message };