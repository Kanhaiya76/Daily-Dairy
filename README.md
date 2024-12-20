# Daily Memoir: A Personal Journal Web Application

Live Link: https://memoir-a-daily-journal.onrender.com/

Daily Memoir is a full-stack web application that allows users to create, manage, and reflect on their daily journal entries. It provides a secure and user-friendly platform for personal journaling with image upload capabilities.

This application is built using the MERN stack (MongoDB, Express.js, React, and Node.js) and incorporates modern web development practices and tools.

## Repository Structure

The repository is organized into two main directories:

### backend/
- `Controllers/`: Contains the logic for handling API requests
  - `journalController.js`: Manages journal-related operations
  - `userControllers.js`: Handles user authentication and profile management
- `database/`: Database connection setup
- `middlewares/`: Custom middleware functions
  - `authMiddleware.js`: Handles user authentication
  - `multerMiddleware.js`: Configures file upload handling
  - `validationMiddleware.js`: Validates user input
- `models/`: Defines database schemas
- `routes/`: Defines API routes
- `utils/`: Utility functions and error handling
- `index.js`: Entry point for the backend server

### frontend/
- `src/`: Source code for the React application
  - `Components/`: React components
  - `redux/`: Redux store and slices for state management
- `App.jsx`: Main application component
- `main.jsx`: Entry point for the React application

## Usage Instructions

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd backend && npm install
   cd ../frontend && npm install
   ```

### Environment Setup

1. Create a `.env` file in the `backend/` directory with the following variables:
   ```
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

2. Create a `.env` file in the `frontend/` directory with the following variable:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend && npm run dev
   ```

2. Start the frontend development server:
   ```
   cd frontend && npm run dev
   ```

3. Access the application at `http://localhost:5173` (or the port specified by Vite)

## API Endpoints

### User Routes

- `POST /api/user/register`: Register a new user
  - Content-Type: multipart/form-data
  - Body:
    - username: string (required)
    - email: string (required)
    - password: string (required)
    - profilePicture: file (optional)
  - Responses:
    - 200 OK: User registered successfully
      ```json
      {
        "success": true,
        "message": "User registered successfully",
        "user": {
          "username": "string",
          "email": "string",
          "profilePicture": "string (URL)"
        }
      }
      ```
    - 400 Bad Request: Validation error or user already exists
    - 500 Internal Server Error: Server error during registration

- `POST /api/user/login`: Log in a user
  - Content-Type: application/json
  - Body:
    - email: string (required)
    - password: string (required)
  - Responses:
    - 200 OK: User logged in successfully
      ```json
      {
        "success": true,
        "message": "User logged in successfully",
        "user": {
          "username": "string",
          "email": "string",
          "profilePicture": "string (URL)"
        }
      }
      ```
    - 400 Bad Request: Invalid credentials
    - 500 Internal Server Error: Server error during login

- `GET /api/user/getuser`: Get the current user's information
  - Headers:
    - Cookie: token=<jwt_token>
  - Responses:
    - 200 OK: User information retrieved successfully
      ```json
      {
        "success": true,
        "user": {
          "username": "string",
          "email": "string",
          "profilePicture": "string (URL)"
        }
      }
      ```
    - 401 Unauthorized: User not authenticated
    - 500 Internal Server Error: Server error while fetching user data

- `GET /api/user/logout`: Log out the current user
  - Responses:
    - 200 OK: User logged out successfully
      ```json
      {
        "success": true,
        "message": "User logged out successfully"
      }
      ```
    - 500 Internal Server Error: Server error during logout

### Journal Routes

- `POST /api/journal/add`: Add a new journal entry
  - Requires: Authentication, content
  - Optional: images (up to 5 file uploads)

- `PUT /api/journal/update/:id`: Update an existing journal entry
  - Requires: Authentication, journal entry ID
  - Optional: content, images (up to 5 file uploads)

- `DELETE /api/journal/delete/:id`: Delete a journal entry
  - Requires: Authentication, journal entry ID

- `GET /api/journal/alljournal`: Get all journal entries for the current user
  - Requires: Authentication

- `GET /api/journal/today`: Get today's journal entry for the current user
  - Requires: Authentication

- `GET /api/journal/:id`: Get a specific journal entry
  - Requires: Journal entry ID

All routes are relative to the base URL of the API (e.g., http://localhost:3000/api).

## Data Flow

1. User Authentication:
   - User registers or logs in through the frontend
   - Frontend sends credentials to the backend
   - Backend validates credentials and returns a JWT token
   - Frontend stores the token for subsequent requests

2. Journal Entry Creation:
   - User creates a new journal entry in the frontend
   - Frontend sends entry data and images to the backend
   - Backend processes the request:
     * Authenticates the user using the JWT token
     * Uploads images to Cloudinary
     * Saves the journal entry in the MongoDB database
   - Backend returns the created journal entry
   - Frontend updates the UI with the new entry

3. Journal Entry Retrieval:
   - Frontend requests journal entries from the backend
   - Backend authenticates the request and queries the database
   - Backend returns the journal entries
   - Frontend displays the entries to the user

```
[User] <-> [Frontend (React)] <-> [Backend (Express)] <-> [Database (MongoDB)]
                                         ^
                                         |
                                  [Cloudinary API]
```

## Troubleshooting

### Common Issues

1. Connection refused to MongoDB:
   - Ensure your MongoDB instance is running
   - Verify the `MONGO_URL` in your `.env` file is correct

2. Image upload fails:
   - Check Cloudinary credentials in the `.env` file
   - Ensure the `multerMiddleware.js` is correctly configured

3. Authentication fails:
   - Verify the `JWT_SECRET_KEY` in the `.env` file
   - Check if the token is being correctly sent from the frontend

### Debugging

To enable verbose logging:

1. In the backend, add the following to `index.js`:
   ```javascript
   const debug = require('debug')('app:server');
   app.use((req, res, next) => {
     debug(`${req.method} ${req.url}`);
     next();
   });
   ```

2. Run the backend with:
   ```
   DEBUG=app:* npm run dev
   ```

3. For frontend debugging, use the React Developer Tools browser extension

## Performance Optimization

- Monitor API response times using tools like `morgan` middleware
- Use React's `useMemo` and `useCallback` hooks for expensive computations
- Implement pagination for journal entry retrieval to reduce payload size
