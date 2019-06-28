# REA Robot

Welcome to the REA Robot Repository. This repository contains code base for the REA Robot application and the unit test for the scenarios.

Below are the steps to follow to run the REA Robot application

## Description

- The application is a simulation of a toy robot moving on a square tabletop of dimensions 5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the
  robot falling from the table must be prevented, however further valid movement commands must still be allowed.

## Git

First you will need to install a GitBash:

- [Download GitBash](https://git-scm.com/downloads)

Once installed you need to configure the user name and email address in the global git configurations.

Clone the git repository:

```
git clone https://github.com/aruns009/rea-robot.git
```

Change into the cloned directory :

```
cd rea-robot
```
## Pre-requsites 

1. Your machine should have [NodeJS installed](https://nodejs.org/en/download/)
2. You should have [npm package manager](https://www.npmjs.com/get-npm) 

Once you have installed all the dependencies, you are ready to run the application.


## Install the application:

Run the below command to install the npm dependencies

```
`npm install`
```

## Run the application:

Run the below command to run the application

```
`npm start`
```

Running the above command will give you an interactive terminal to execute the comands. Below is a sample operation

```
npm start

Welcome to REA robot! 
Enter "PLACE X, Y, NORTH | SOUTH | EAST | WEST" command to place the robot on the table. If you want to quit, please enter "q | quit | exit"
> PLACE 0, 0, NORTH
> REPORT
REA Robot's position is at: 0, 0, NORTH
> 

```

## Brief about the commands.
- **PLACE X, Y, DIRECTION** - Will place the robot in the table based on the co-ordinate values passed in X and Y arguments in the command. The "DIRECTION" attribute will determine the facing direction of the robot for the next move.
- **MOVE** - This command will basically move the robot to either X-axis or Y-axis based on the direction set on the previous command.
- **LEFT** - This command will change the orientation of the robot to its left from its current direction.
- **RIGHT** - This command will change the orientation of the robot to its right from its current direction.
- **REPORT** - This command prints the current status of the robot with its co-ordinates and direction.

## Run the application via file
Run the below command to execute the commands via a file. This file should contain the commands for the robot.

```
`npm start test/test-file.txt`
```

Running the above command will execute all the comands in the file. Below is a sample operation

```
npm start test/test-file.txt

Welcome to REA robot! 
Enter "PLACE X, Y, NORTH | SOUTH | EAST | WEST" command to place the robot on the table. If you want to quit, please enter "q | quit | exit"
> PLACE 0,0,NORTH 
> MOVE 
> LEFT
> REPORT 
REA Robot's position is at: 0, 1, WEST

```

## Run the unit test.
Inorder to run the unit test, running the below comand will show you the report of the text execution and summary.
```
`npm test`
```
Below is the sample summary for the test executions.

```
  Test Suite 1 - Initialization of Robot Controller
    ✓ Unit Test 1 - initial robot position is undefined
    ✓ Unit Test 2 - defaults values for the table is correct
    ✓ Unit Test 3 - defaults action for the robot should be correct
    ✓ Unit Test 4 - defaults directions for the robot should be correct
    ✓ Unit Test 5 - initial value for "placedRobot" in table is false

  Test Suite 2 - Method "place" of Robot Controller
    ✓ Unit Test 1 - store the co-ordinates for the place() action
    ✓ Unit Test 2 - pass co-ordinates for X and Y axis beyond the table
    ✓ Unit Test 3 - pass invalid co-ordinates for X and Y axis 
    ✓ Unit Test 4 - pass invalid direction for place() function 

  Test Suite 3 - Method "report" of Robot Controller
    ✓ Unit Test 1 - invoke report without a place invocation
    ✓ Unit Test 2 - invoke report() after a "place" comment

  Test Suite 4 - Method "move" of Robot Controller
    ✓ Unit Test 1 - invoke move command after setting a place command
    ✓ Unit Test 2 - throw message if the "move" command is at the edge of table
    ✓ Unit Test 3 - throw message if the "move" command is invoked without "place" command

  Test Suite 5 - Method "left" of Robot Controller
    ✓ Unit Test 1 - invoke "left" command after setting a place command
    ✓ Unit Test 2 - throw message if the "left" command is invoked without "place" command

  Test Suite 6 - Method "right" of Robot Controller
    ✓ Unit Test 1 - invoke "right" command after setting a place command
    ✓ Unit Test 2 - throw message if the "right" command is invoked without "place" command

  Test Suite 7 - E2E functional scenarios
    ✓ Functional Test 1 - 
         PLACE 0, 1, EAST 
         MOVE 
         LEFT 
         MOVE 
         RIGHT 
         REPORT
    ✓ Functional Test 2 - 
         PLACE 3, 0, NORTH 
         MOVE 
         MOVE 
         LEFT 
         MOVE 
         REPORT

  20 passing (11ms)
```