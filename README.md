# IDHSOneStopShop
An application for the INvTX Hackathon. Creating an application to assist the IDHS

# Running the Project

## Locally

### Mongo

To run the project locally you need mongodb running at `mongodb://localhost:27017/intxhack`

To install mongo run:

````sh
# Install from homebrew
$ brew install mongodb

# Create the default data directory for mongo to use
$ mkdir -p /data/db

# Run the service
$ mongod
````

### NODE.js

This app runs on NODE.js
Install NODE.js and npm to run.

````sh
$ brew install node

# cd into the project directory
$ npm install # updates all of the dependancies

# Run the server. (If grunt is not global, run from node_modules)
$ grunt
````

NOTE TO SELF: Look into grunt.

## Remotely

I will load this onto Heroku or something soon, including a server instance of mongo

# browserify

This project uses b-ify. Any js files in /src will be compiled to /public/dist with `grunt`. They can then be used on the browser end as if they were in node. 
