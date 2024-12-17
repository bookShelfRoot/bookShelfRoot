# Bookshelf

## Project Brief
Bookshelf is a mini social network project for book lovers, allowing users to create and manage their own book collections with friends.

## Feature Set
The web-based application provides the following features:
- **User Accounts**: Sign up and log in using credentials created during registration (authentication based on JWT).
- **Dashboard**: When logged in, users can see the MyProgress section with currently reading and finished books, options to add books, and fetch friends and social updates.
- **My Books**: Search and fetch books using a third-party API (NY Times Books API). Users can view all books, update their status (Currently Reading, Finished), and track progress.
- **My Friends**: Fetch all available users to send requests, view pending requests, and see available friends.
- **Social Cards**: Display updates, reviews, and ratings from friends in a social card format on the user's dashboard, along with all friends' books.

## Development Repositories
1. Backend Development Repository:  
   [https://github.com/tejaGitH/bookShelf.git](https://github.com/tejaGitH/bookShelf.git)
   
2. Frontend Development Repository:  
   [https://github.com/tejaGitH/frontendBookShelf.git](https://github.com/tejaGitH/frontendBookShelf.git)

## Installation

1. Clone the repository and navigate to `bookShelfRoot`:
    ```
    git clone https://github.com/bookShelfRoot/bookShelfRoot.git
    cd bookShelfRoot
    ```

### Backend

2. Navigate to the backend directory:
    ```
    cd bookshelf
    ```
3. Install dependencies:
    ```
    npm install --save
    ```
4. Set up environment variables. Create a `.env` file in the backend directory and add the required variables:
    ```
    MONGO_URI='mongodb+srv://navyateja:navyateja@cluster0.tkjaz.mongodb.net/bookShelf'
    SECRET_KEY='teja@12345'
    NYT_API_KEY='cUdTW6wVvh2Ve1733GYPO8xRIwy1UXFl'
    NYT_API_SECRET='LkC2iAXfMJlgHPRn'
    FRONTEND_URL='https://bookshelfroot1.onrender.com'
    ```
5. Start the backend server:
    ```
    node server.js
    ```

### Frontend

1. Navigate to the frontend directory:
    ```
    cd frontendBookShelf
    ```
2. Install dependencies:
    ```
    npm install --save
    ```
3. Set up environment variables. Create a `.env` file in the frontend directory and add the required variables:
    ```
    BACKEND_URL='https://bookshelfroot.onrender.com'
    ```
4. Navigate to the `src` directory:
    ```
    cd src
    ```

5. Start the frontend server:
    ```
    npm start 
    ```

## Usage

1. Open your browser and explore Bookshelf at [https://bookshelfroot1.onrender.com](https://bookshelfroot1.onrender.com).
2. Sign up or log in using your email ID and password.
3. Explore the My Bookshelf section to search, add, and review books.
4. Check your Dashboard to see currently reading books, update progress, and view social cards with friends' updates.

## Project Structure

### Backend Structure

```plaintext
backend/
├── controllers/
│   ├── userController.js
│   ├── bookController.js
│   ├── reviewController.js
│   └── friendshipController.js
├── models/
│   ├── User.js
│   ├── Book.js
│   ├── ReadingProgress.js
│   ├── Review.js
│   └── Friendship.js
├── routes/
│   ├── userRoutes.js
│   ├── bookRoutes.js
│   ├── reviewRoutes.js
│   └── friendshipRoutes.js
├── middlewares/
│   ├── api.js
│   └── verifyToken.js
├── .env
├── server.js
└── package.json

frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── actions/
│   │   ├── bookActions.js
│   │   ├── reviewActions.js
│   │   ├── friendshipActions.js
│   │   └── userActions.js
│   ├── components/
│   │   ├── LandingPage.jsx
│   │   ├── common/
│   │   │   ├──ErrorBoundary.jsx
│   │   │   └──PrivateRoute.jsx
│   │   ├── NavBar/
│   │   │   ├──MyBooks
│   │   │   │   ├──MyBooks.jsx
│   │   │   │   ├──BestSellers.jsx
│   │   │   │   ├──AddBook.jsx
│   │   │   │   ├──UserBooks.jsx
│   │   │   │   ├──CurrentBooks.jsx
│   │   │   │   └──FinishedBooks.jsx
│   │   │   ├──MyFriends
│   │   │   │   ├──MyFriends.jsx
│   │   │   │   ├──EligibleUsers.jsx
│   │   │   │   ├──FriendRequests.jsx
│   │   │   │   ├──FriendsList.jsx
│   │   │   │   └──FriendUpdates.jsx
│   │   │   └──SocialUpdates
│   │   │       ├──SocialUpdatesPage.jsx
│   │   │       ├──Books.jsx
│   │   │       └──SocialUpdates.jsx
│   │   │   
│   │   └── Dashboard/
│   │       ├──Dashboard.jsx
│   │       ├──MyProgress
│   │       │   ├──MyProgress.jsx
│   │       │   ├──DashBoardCurrentBooks.jsx
│   │       │   └──DashboardFinishedBooks.jsx 
│   │       ├──DashboardAddBook
│   │       │   └──DashboardAddBook.jsx
│   │       ├──DashboardFriendList
│   │       │   └──DashboardFriendList.jsx
│   │       └──DashBoardSocialUpdates
│   │           └──SocialUpdates.jsx
│   ├── reducers/
│   │   ├── bookReducers.js
│   │   ├── reviewReducers.js
│   │   ├── friendshipReducers.js
│   │   └── userReducers.js
│   ├── utils/
│   │   ├── Store.js
│   │   ├── axiosInstance.js
│   │   └── createApiAction.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── .env
└── package.json
