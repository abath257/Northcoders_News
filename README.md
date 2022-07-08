# Northcoders Positive News API

## Link to Hosted version on the internet:
[(https://dashboard.heroku.com/apps/nc-positive-news)]

## Summary of the Project: 
This is a fullstack application, designed by myself, following guidelines from Northcoders college. The aim was to build a website API that serves news articles using Node-Postgres on the backend and REACT on the frontend. As a slight twist to the project, i decided to cater for positive news stories and create a positive news sitegit c.    


## Setup
1. This project needs to be run using an Ubuntu distribution on linux. You must have git, npm and node.js installed. For more information please visit:
[(https://github.com/git-guides/install-git)]: For installing git. 
[(https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)]: Advice for downloading and installing npm/node.js

The minimum version of Node required: >= 6.9.0
The minimum version of Postgres required: >= 8.7.3


2. Clone this project from git: https://github.com/abath257/Northcoders_News.git

3. In the terminal, ensure you are in the projects directory

4. Install dependencies by typing: npm install. 
5. Create the Environment Variables:
If you are cloning this project locally, you will need to do the following tasks in order to set up the environment varibales:

* Create the following files in the project's root directory:
.env.test
.env.development

* Ensure the files contain the follwing: 
The .env.development file should contain the following script: PGDATABASE=<database name here>
The .env.test file should contain the following script: PGDATABSE=<test database name here>

6. Initiate the databse by typing in the terminal: npm run setup-dbs 
7. Testing can be initiated by typing npm t app.test.js in the terminal from anywhere in the root directory of the project. 
 
