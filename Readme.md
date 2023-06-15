### To run this Server
(Assuming Node.js and npm are installed)
1. In the root directory, perform "npm install" to download npm packages.
2. Make a .env file in root directory, inside that file, pass in two variables.
    1. MONGO_URL = {Insert Your MongoDB URL}
    2. JWT_SECRET = {Insert some random value as a Secret}
3. To run the Server, first perform "npm run build" to transpile code from TS to JS and then perform "npm start"
4. The port is hardcoded as 3000. So, to try the API's, use http://localhost:3000/


### API Endpoints
1. '/auth/register' (POST): Register a new user. Provide {name,email,password} in Body.
2. '/auth/login' (POST): Login User. Provide {email,password} in Body.
3. '/books' (POST): Add a new book in Library. In Body, provide {title, author, genre, publicationDate, availabilityStatus}.
4. '/books' (GET): Retrieve list of all books available in the library.
5. '/books/:bookId' (GET) : Retrieve Information about a particular book.
6. '/books/:bookId' (PUT) : Update Information of a particular book. Provide fields to be updated in the body.
7. '/books/:bookId' (DEL) : Delete a particular book
8. '/users/:userId/books/:bookId' (POST) : User(userId) borrows a book(bookId) from the library. Authorization needed for this.
9. '/users/:userId/books/:bookId' (PUT) : User(userId) returns a book(bookId) from the library. Authorization needed for this.
10. '/users/:userId/books' (GET) : Returns a list of books borrowed by a specific user.

### Youtube Video
1. https://youtu.be/S4bPCkias9s -> In this video, I have tested API endpoints to ensure the working of the backend library system.