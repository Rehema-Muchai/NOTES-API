# Notes REST API

# Project Description
This is a simple Notes API built using Node.js and Express.js. It allows users to create, view, update, and delete notes. The API follows REST principles and uses in-memory storage (no database required). All endpoints were tested using Postman.

# How to Run the Server

1. Open your terminal and navigate to the project folder
2. Run the following commands:

```bash
npm install
node notes.js
The server will start at: http://localhost:3000

API Endpoints
Method	Endpoint:	Description:
GET	/notes	        Get all notes
GET	/notes/:id	Get a note by ID
POST	/notes	        Create a new note
PUT	/notes/:id	Update a note by ID
DELETE	/notes/:id	Delete a note by ID
Testing with Postman
All endpoints were tested using Postman. Screenshots are included in the API screenshots/ folder showing:
Successful GET, POST, PUT, DELETE requests"# NOTES-API" 
