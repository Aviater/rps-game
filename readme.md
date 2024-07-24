# Rock, Paper, Scissors Game

## Setup

Before starting, it's advisable to populate the values in *.env.template*.
Don't forget to remove the *.template* section of the filename after doing so.

Install project dependencies using the install script.

- `npm install`

## Local development

To start the application for development, use the dev script.
This script uses *nodemon*, which automatically restarts the node application when file changes are detected.

- `npm run dev`

You can also call the test runner, *jest*, using the test script.

- `npm run test`

Once the application is running, all the API endpoints and associated documentation can be viewed on the route: **/api-docs**

## Production build

To build the application use the build script.

- `npm run build`

Change the **NODE_ENV** environment variable to *production* to enable Node's production features.
Run the built application with the start script.

- `npm start`

## Misc

This application was built using:

- Node v20.15.1
- NPM v10.8.2

Some initial tests are included as a starting point and are in no way exhaustive.
