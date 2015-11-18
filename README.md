#Using
## Pre requisites
* **node.js**
* **grunt**

## Build and Run
Dev version:
```
npm install
grunt debug
```
Production version:
```
npm install
grunt release
```
required bower packages will be loaded automatically
build destination "dist"
build start http server on the root
http://localhost:8001/dist/

#Functionality
## App start
When you open any team - id of this team stored (in local storage/cookies)

When application started in case if you open root it will open previous team

Example if you open:

http://localhost:8001/dist/#/team/199

then open

http://localhost:8001/dist

you will be redirected to team with id 199

http://localhost:8001/dist/#/team/199

if you open some specific route it will left as is
 
http://localhost:8001/dist/#/teams

## Data
Data Loaded from one football api

#Structure
```
|   index.html
|
+---app
|   |   app.js
|   |
|   +---controllers
|   |       gamesSummaryController.js - controller that handle chart for Games Summary - (Win/Defeat/Drawn)  
|   |       groupPointsController.js  - controller that handle chart for Group Summary - (points of team)
|   |       navigationController.js - controller for navigation
|   |       teamController.js - main controller for team view
|   |       teamsController.js - main controller for teams view
|   |
|   +---services
|   |       alertService.js - Service that handle user notifications
|   |       teamService.js - Service to retrieve team(s) data
|   |
|   \---templates
|           alerts.html - displays alerts from Alert Service 
|           navigationBar.html - displays Navigation Bar
|           team.html  - displays team -> charts
|           teams.html - displays list of teams
|
+---assets
|   \---css
|           app.less - styles file
|
+---common
|   |   utils.js - utils methods
|   |
|   \---officeUI
|           Jquery.NavBar.js - Lib from office for navigation bar
|
\---libs - libs that required for application
    +---angular
    +---angular-animate
    +---angular-local-storage
    +---angular-resource
    +---angular-ui-router
    +---underscore
```