var chai = require("chai");
var expect = chai.expect;
var robotController = require("../src/controllers/RobotController");
var config = require("../src/config/config");

describe('Test Suite 1 - Initialization of Robot Controller', () => {
    it('Unit Test 1 - initial robot position is undefined', () => {
        var currentPosition = robotController.robot.currentRobotPosition;
        expect(currentPosition.xAxis == undefined &&
            currentPosition.yAxis == undefined &&
            currentPosition.direction == undefined).equals(true);
    });
    it('Unit Test 2 - defaults values for the table is correct', () => {
        var defaultValues = config.defaults.table;
        expect(defaultValues.minbreadth == 0 &&
            defaultValues.minlength == 0 &&
            defaultValues.maxbreadth == 5 &&
            defaultValues.maxlength == 5).equals(true);
    });
    it('Unit Test 3 - defaults action for the robot should be correct', () => {
        var testData = ["PLACE", "MOVE", "REPORT", "LEFT", "RIGHT"];
        var defaultValues = config.defaults.commands.actions;
        expect(defaultValues).to.eql(testData);
    });
    it('Unit Test 4 - defaults directions for the robot should be correct', () => {
        var testData = ['NORTH', 'SOUTH', 'EAST', 'WEST'];
        var defaultValues = config.defaults.commands.directions;
        expect(defaultValues).to.eql(testData);
    });
    it('Unit Test 5 - initial value for "placedRobot" in table is false', () => {
        expect(robotController.robot.placedRobot).equals(false);
    });
});

describe('Test Suite 2 - Method "place" of Robot Controller', () => {
    it('Unit Test 1 - store the co-ordinates for the place() action', () => {
        var testData = {
            xAxis: 2,
            yAxis: 3,
            direction: "SOUTH"
        };
        robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction);
        var currentPosition = robotController.robot.currentRobotPosition;
        expect(robotController.robot.placedRobot).to.equal(true);
        expect(currentPosition).to.eql(testData);
    });
    it('Unit Test 2 - pass co-ordinates for X and Y axis beyond the table', () => {
        var testData = {
            xAxis: 10,
            yAxis: 10,
            direction: "SOUTH"
        };
        expect(robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction)).to.equal(config.messages.edgeLocation);
    });
    it('Unit Test 3 - pass invalid co-ordinates for X and Y axis ', () => {
        var testData = {
            xAxis: -1,
            yAxis: 0,
            direction: "SOUTH"
        };
        expect(robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction)).to.equal(config.messages.invalidCoordinates);
    });
    it('Unit Test 4 - pass invalid direction for place() function ', () => {
        var testData = {
            xAxis: 1,
            yAxis: 0,
            direction: "LAST"
        };
        expect(robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction)).to.equal(config.messages.invalidDirections);
    });
});