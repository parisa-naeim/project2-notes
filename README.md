# Notes Application

## Description

This is a fullstack application that allows users to sign up, sign in, sign out, and manage their notes. Each user can create, update, and delete their own notes, which are categorised with specific colors.

## Features

- User authentication (Sign up, Sign in, Sign out)
- Create, update, and delete notes
- Create, update, and delete categories
- Each user manages their own notes and categories
- Categorise notes with specific colors

## Tech Stack

- Node.js
- Express.js
- Express session
- MongoDB
- Mongoose
- EJS
- Bootstrap

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/parisa-naeim/project2-notes.git
   cd project2-notes
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:
     ```env
     MONGODB_URI=<connection-string-to-mongo-db>
     SESSION_SECRET=your_session_secret
     ```

4. Start the application:
   ```bash
   npx nodemon
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Sign up for a new account.
3. Sign in with your credentials.
4. Create, update, and delete notes.
5. Assign notes to categories with specific colors.

## Project Structure

```plaintext
├── controllers
│   ├── auth.js
│   ├── notes.js
│   └── categories.js
├── helper
│   ├── helpers.js
├── middleware
│   ├── ensure-signed-in.js
│   └── pass-user-to-view.js
├── models
│   ├── users.js
├── pubilc
│   ├── style.css
├── views
│   ├── partials
│   │   ├── _head.ejs
│   │   └── _navbar.ejs
│   ├── auth
│   │   ├── sign-in.ejs
│   │   └── sign-up.ejs
│   ├── categories
│   │   ├── index.ejs
│   │   └── new.ejs
│   ├── notes
│   │   ├── index.ejs
│   │   └── new.ejs
│   └── index.ejs
├── .env
└── server.js
```

## Deployment
The project is deployed to Heroku. Can be accessed via:

https://guarded-castle-58554-ee9ba952f7ec.herokuapp.com/
