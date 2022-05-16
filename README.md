### Northcoders News API

## Creating the Environment Variables
If you are cloning this project locally, you will need to do the following tasks in order to set up the environment varibales:

1. Create the follwing files in the project's root directory:
.env.test
.env.development

2. Ensure the files contain the follwing: 
The .env.development file should contain the following script: PGDATABASE=<databse name here>
The .env.test file should contain the following script: PGDATABSE=<test databse name here>

3. Install the dependency DOTENV by using the following command in your terminal: npm i DOTENV
4. Run the db/setup.sql file which will then setup the databses for use. 
5. The connection file will then take care of running the database according to which environment you are using to operate it. 
