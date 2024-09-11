This file describes the installation process of the Node.js test task project for FraudNetic.
=============================================================================================


## Pre-installation Setup
1. You need to have Node runtime version 16.x or higher. Please navigate to https://nodejs.org and download an appropriate version.
2. Create a PostgreSQL server instance to serve as the database. In the .env file, assign the variables listed in .env.dist with your credentials.

## Installation
To install the project, follow these steps:
1. Clone the repository:

    ```git clone https://github.com/vagison/fraudnetic-test-task.git```

2. Navigate to the project directory:

    ```cd fraudnetic-test-task```

3. Install the dependencies:

    ```npm i```


## Environment Configuration
Create a .env file in the root of the project and configure the environment variables listed in .env.dist:

## Running
To run the project, start the REST API and the gRPC server simultaneously following next steps:

1. To start the compiled project located in the dist directory using Node you have to run the following commands:

    ```npm run build```
    
    After having the compiled project please run these commands in separate terminals:

    ```npm run start:api``` and ```npm run start:grpc```

2. Alternatively to run the project in development mode with nodemon you have to run the following commands in separate terminals:

    ```npm run dev:api``` and ```npm run dev:grpc```
   
3. To clean the dist directory, you can use the following command: 

    ```npm run clean```


## Project Description
The project integrates a Fastify-based REST API for client-facing interactions, gRPC for efficient inter-service communication and PostgreSQL for data storage and retrieval.


## Project Structure
The root directory of the project contains the ```src``` folder, where the entire codebase is located.

Inside the ```src``` folder, there are several subfolders, each with its own structure and description:

```api``` - contains the core functionality for the REST API:
* app.js is the entry point of the app. It starts the server, initiates the the database connection and more.


* controllers: manages the business logic for different API endpoints.
* routes: represents server-side endpoints that expect calls from the client-side and maps them to the corresponding controller methods.
* schemas: contains schemas that define the structure and validation rules for the REST API data.
* utils: serves as a folder to store helper functions and more.


```grpc``` - contains the core components for the gRPC services:
* client.js: implements the gRPC client, used to make requests to the gRPC server.
* server.js: implements the gRPC server, listens for client requests and provides the defined services.


* configs: contains configuration files for the gRPC services.
* proto: stores the Protocol Buffers (proto) files that define the gRPC service contracts.
  - event.proto: defines the gRPC service, methods, and message structure for handling event-related data.
* services: implements the gRPC services and handles communication between the server and client.
  - eventService.js: contains the implementation of the event-related service methods.


```scripts``` - contains files that can be run as independent commands:
* sendEvent.js: this file contains the logic to invoke the gRPC client from the command line.


You can run it with the following commands:

    npm run dev:send-event (for development mode) or npm run start:send-event (for the compiled version)


You must pass eventName and browserHash as arguments. For example:

    npm run dev:send-event yourEventName yourBrowserHash


```shared``` - contains shared modules and utilities that are used across different parts of the project:
* configs: stores configuration settings shared across the project.
* db: handles database-related logic.
  - queries: contains functions to perform database queries.
* transformers: contains logic to transform data into different formats.
* utils: contains utility functions that are used throughout the application.


There are some files in the root directory apart from the ```src``` folder:
* .babelrc.json - contains configuration settings for Babel, a JavaScript compiler that converts ES6+ code into a backward-compatible version of JavaScript that can run in older environments.
* .env.dist - serves as a template for environment variables, providing a sample configuration for the .env file.
* .eslintrc.json - contains configuration settings for ESLint, which is used to identify and fix problems in JavaScript code.
* .gitignore - used to exclude files from being pushed to the repository.
* nodemon.json - configures Nodemon to restart your Node.js app on file changes; customize file watches, ignores, and more.
* package-lock.json - records the exact versions of packages and their dependencies that were installed, ensuring consistent installs across different environments.
* package.json - includes a list of the packages and their versions used for this project.
* README.md - contains the instruction you are currently reading :D


## Using API Endpoints
To use the endpoints, you can visit the Postman URL below and then either fork or download the collection:

https://www.postman.com/grey-equinox-5383/fraudnetic/collection/qyhw7uo/fastify-api

The request names are self-explanatory, and any additional information can be found within the requests themselves.

Note that the local variables "API_URL" and "API_VERSION" should be manually set in your Postman client according to your usage (defaults are http://localhost:3000 and v1). Other variables are set during API calls.

## Using Scripts
For manual invocation of the gRPC client, please refer to the "Project Structure" section of this README. The description of the "scripts" folder provides usage instructions for the scripts.