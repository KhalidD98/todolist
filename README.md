# KD's TodoList Application

A simple TODO list app to keep track of tasks

## Tech/Frameworks used
- [React JS](https://reactjs.org/)
- [Express JS](https://expressjs.com/)
- [Node JS](https://nodejs.org/en/)
- [Material UI](https://mui.com/)
- [MySQL](https://www.mysql.com/)

## Installation:
1. Clone repo
2. Open 2 separate terminals (``cd`` one terminal into the client folder, and ``cd`` the other terminal into the server folder)
3. ``npm install`` in both terminals
5. ``npm start`` in both terminals


### MySQL DB communication Functions
- Add Task
		- Add new task to database
- Get Tasks
		- Get all tasks from database
- Delete Task
		- Remove Task from database
- Update Complete Status
		- Toggle task complete or incomplete, update it in the database
- Edit Task
		- Edit the task text


## Features
- Create a new task
- Set task to complete, or reset to incomplete
- Edit the task
- Search for a task
- Delete tasks

## Improvements
Things I could improve with more time:

 - Create a login system for users to have their own tasks
 - Create categories for tasks
 - Set priorities on tasks
 - Share tasks with others
 - Add due dates on tasks
 - Have reminder notifications on phone or email

## Biggest Struggle
The struggles I faced when creating this web application were:
- Learning MySQL as this was my first time using MySQL
- Deploying both the front and back end of my application to seperate services and connecting the two
- Creating the filter system, separating completed and pending tasks without calling the database every time a filter was selected. I resolved this by keeping a local version of the database and performed filters on that local version
-   Designing the UI to be user friendly as to be very easy to use and understand

