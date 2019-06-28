var chai = require("chai");
var expect = chai.expect;
var robotController = require("../src/controllers/RobotController");
var config = require("../src/config/config");

//The below test suites will cover the methods created under the robot controller and also the default values set for the application.

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

describe('Test Suite 3 - Method "report" of Robot Controller', () => {
    it('Unit Test 1 - invoke report without a place invocation', () => {
        robotController.robot.placedRobot = false;
        expect(robotController.robot.report()).to.eql(config.messages.noPlaceInvoked);
    });
    it('Unit Test 2 - invoke report() after a "place" comment', () => {
        var testData = {
            xAxis: 0,
            yAxis: 1,
            direction: "SOUTH"
        };
        robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction);
        expect(robotController.robot.report()).to.equal(config.messages.robotPosition + testData.xAxis + ', ' + testData.yAxis + ', ' + testData.direction);
    });
});

describe('Test Suite 4 - Method "move" of Robot Controller', () => {
    it('Unit Test 1 - invoke move command after setting a place command', () => {
        var testData = { xAxis: 0, yAxis: 1, direction: "EAST" };
        var expectedResult = { xAxis: 1, yAxis: 1, direction: "EAST" };
        robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction);
        robotController.robot.move();
        expect(robotController.robot.report()).to.equal(config.messages.robotPosition + expectedResult.xAxis + ', ' + expectedResult.yAxis + ', ' + expectedResult.direction);
    });
    it('Unit Test 2 - throw message if the "move" command is at the edge of table', () => {
        var testData = { xAxis: 4, yAxis: 1, direction: "EAST" };
        robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction);
        expect( robotController.robot.move()).to.eql(config.messages.edgeLocation);
    });
    it('Unit Test 3 - throw message if the "move" command is invoked without "place" command', () => {
        robotController.robot.placedRobot = false;
        var testData = { xAxis: 4, yAxis: 1, direction: "EAST" };
        expect( robotController.robot.move()).to.eql(config.messages.noPlaceInvoked);
    });
});

describe('Test Suite 5 - Method "left" of Robot Controller', () => {
    it('Unit Test 1 - invoke "left" command after setting a place command', () => {
        var testData = { xAxis: 0, yAxis: 1, direction: "EAST" };
        var expectedResult = { xAxis: 0, yAxis: 1, direction: "NORTH" };
        robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction);
        robotController.robot.left();
        expect(robotController.robot.report()).to.equal(config.messages.robotPosition + expectedResult.xAxis + ', ' + expectedResult.yAxis + ', ' + expectedResult.direction);
    });
    it('Unit Test 2 - throw message if the "left" command is invoked without "place" command', () => {
        robotController.robot.placedRobot = false;
        expect( robotController.robot.left()).to.eql(config.messages.noPlaceInvoked);
    });
});

describe('Test Suite 6 - Method "right" of Robot Controller', () => {
    it('Unit Test 1 - invoke "right" command after setting a place command', () => {
        var testData = { xAxis: 0, yAxis: 1, direction: "EAST" };
        var expectedResult = { xAxis: 0, yAxis: 1, direction: "SOUTH" };
        robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction);
        robotController.robot.right();
        expect(robotController.robot.report()).to.equal(config.messages.robotPosition + expectedResult.xAxis + ', ' + expectedResult.yAxis + ', ' + expectedResult.direction);
    });
    it('Unit Test 2 - throw message if the "right" command is invoked without "place" command', () => {
        robotController.robot.placedRobot = false;
        expect( robotController.robot.right()).to.eql(config.messages.noPlaceInvoked);
    });
});

describe('Test Suite 7 - E2E functional scenarios', () => {
    it('Functional Test 1 - \n \
        PLACE 0, 1, EAST \n \
        MOVE \n \
        LEFT \n \
        MOVE \n \
        RIGHT \n \
        REPORT', () => {
        var testData = { xAxis: 0, yAxis: 1, direction: "EAST" };
        var expectedResult = { xAxis: 1, yAxis: 2, direction: "EAST" };
        robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction);
        robotController.robot.move();
        robotController.robot.left();
        robotController.robot.move();
        robotController.robot.right();
        expect(robotController.robot.report()).to.equal(config.messages.robotPosition + expectedResult.xAxis + ', ' + expectedResult.yAxis + ', ' + expectedResult.direction);
    });
    it('Functional Test 2 - \n \
        PLACE 3, 0, NORTH \n \
        MOVE \n \
        MOVE \n \
        LEFT \n \
        MOVE \n \
        REPORT', () => {
        var testData = { xAxis: 3, yAxis: 0, direction: "NORTH" };
        var expectedResult = { xAxis: 2, yAxis: 2, direction: "WEST" };
        robotController.robot.place(testData.xAxis, testData.yAxis, testData.direction);
        robotController.robot.move();
        robotController.robot.move();
        robotController.robot.left();
        robotController.robot.move();
        expect(robotController.robot.report()).to.equal(config.messages.robotPosition + expectedResult.xAxis + ', ' + expectedResult.yAxis + ', ' + expectedResult.direction);
    });
});