# Welcome to Task Management App!

Introducing a sleek and efficient **Task Management WebApp** where **Python** based application backend using **FastAPI** and **Angular** based Frontend. 

**Backend**
With its minimalist design and robust functionality, this backend serves as the backbone for managing your daily tasks effortlessly. Powered by FastAPI, renowned for its high performance and easy-to-use interface, this backend ensures lightning-fast response times and seamless integration with various frontend technologies.

**Frontend**
With User friendly interface and interactive design, this frontend serves as the UI that manages your daily tasks. Build with Angular framework provide various features such as:
1. Authentication and Authorization for restricted access.
2. Allow user to crate, update, and delete categories.
3. Allow users to divide their task into different categories for better management. 
4. Allow users to create, update, and delete tasks.
5. Allow users to share different categories with their friend and colleagues. 
6. Tasks have a title, description, and a status (e.g., "To Do," "In Progress," "Done").
7.  Users can also be able to view a list of tasks and filter them by status.
8. Users can search from various task. (search functionality).


## Database Requirement
- Application is Developement using PostgreSQL
- Requirements
	 > Install Postgresql and pgAdmin for easy UI based DB access
- [ Important ] **Create a database** with name `taskDB`or any name of your choice but then you have to make similar change in .env file.
- Set Database settings 
	>**for simplicity use below settings**--
	
	>DATABASE_HOSTNAME=localhost 
	
	>DATABASE_PORT=5432 
	
	>DATABASE_PASSWORD=password123 
	
	>DATABASE_NAME=taskDB
	
	>DATABASE_USERNAME=postgres

## Steps to install backend

-   Step 1: Create .env file and paste below values
	>DATABASE_HOSTNAME=localhost 
	DATABASE_PORT=5432 
	DATABASE_PASSWORD=password123 
	DATABASE_NAME=taskDB
	DATABASE_USERNAME=postgres
	SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7 
	ALGORITHM=HS256 
	ACCESS_TOKEN_EXPIRE_MINUTES=30
    
-   Step 2: Put .env file outside app folder
-   Step 3: Create Virtual Environment --
	> `python -m venv .venv` or `py -m venv .venv`
-   Step 4: Activate virtual environment --
	> `.venv\Scripts\Activate.ps1`
-   Step 5: Change the python interpreter if it is not changes to point to virtual environment python interpreter.
-   Step 6: Install all the required libraries use -- 
	> `pip install -r requirements.txt`
-   Step 7: Run the application  --
	> `uvicorn app.main:app --reload`
- Now backend is running on `127.0.0.1:8000`
- You can check the API interface by accessing the swagger ui on 
	> `127.0.0.1:8000/docs`



# Steps to install Frontend

-   Step 1: Open Frontend Folder in vs code terminal 
-   Step 2: Install all the required libraries and dependencies use -- 
	> `npm i` or `npm install`
-   Step 3: Run the application  --
	> `ng serve` or `npm run start` or `npm start`
- Now backend is running on `http://localhost:4200`

# How to use

-   Step 1: Run backend first then run frontend application.  
-   Step 2: Open `http://localhost:4200` in the browser.
-   Step 3: Create a user from register user page.
-   Step 4: Login with the user.
-   Step 5: Create a category like `Goals, daily tasks, etc.`  
-   Step 6: Click category name to open todo list page.
-   Step 7: Now you can create tasks.
-   Step 8: Filter based on status and search functionality is also provided 
