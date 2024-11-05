# QuizAI: AI-Powered Quiz Generator

## Overview
**QuizAI** is an interactive web application that lets users generate personalized quizzes based on any topic they choose. Built with **Next.js** and integrated with the **Google Gemini-Flash 1.5 API**, the app allows users to input a topic and create a quiz with a customizable number of questions. Whether you're studying, testing your knowledge, or just having fun, QuizAI makes quiz creation quick and easy. The app is also fully responsive, ensuring a great user experience on both desktop and mobile devices.

## Features

-   **Customizable Quiz Generation**: Users can input any topic and generate a quiz with a specific number of questions.
-   **Real-Time Question Fetching**: The app fetches quiz questions in real-time using the Google Gemini-Flash 1.5 API.
-   **Authentication & User Profiles**: Users can sign up and log in using **NextAuth.js** for secure access and personalized quiz management.
-   **Responsive UI**: Fully responsive design using **Tailwind CSS** and **Shadcn UI** for modern, accessible, and user-friendly interfaces.
-   **Database Integration**: Store user data, quiz history, and preferences with **MongoDB** for persistent storage.

## Tech Stack

-   **Frontend**:
    
    -   **Next.js** – A React framework for building static and dynamic websites.
    -   **React** – JavaScript library for building user interfaces.
    -   **Tailwind CSS** – Utility-first CSS framework for building custom designs.
    -   **Shadcn UI** – A modern, accessible component library for React.
-   **Backend/API**:
    
    -   **Google Gemini-Flash 1.5 API** – API used to fetch quiz questions based on user-input topics.
-   **Authentication**:
    
    -   **NextAuth.js** – A flexible authentication solution for Next.js, providing user sign-up, login, and session management.
-   **Database**:
    
    -   **MongoDB** – NoSQL database for storing user data and quiz history.

## Getting Started

To run **QuizAI** locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14 or above)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package managers)
-   [MongoDB](https://www.mongodb.com/) – Create a MongoDB account and set up a cloud database, or install MongoDB locally.

### Installation Steps

1.  **Clone the repository**:
    
    ```bash 
    git clone https://github.com/PiyushPb/QuizAi.git
    ``` 
    
2.  **Navigate into the project directory**:
    ```bash
    cd quizai
    ```
    
3.  **Install dependencies**:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
4.  **Set up environment variables**: Create a `.env` file in the root directory and configure the following:
    ```bash
    GITHUB_CLIENT_ID=<GITHUB_CLIENT_ID>
    GITHUB_CLIENT_SECRET=<GITHUB_CLIENT_SECRET>
    NEXTAUTH_URL=<NEXTAUTH_URL>
    NEXTAUTH_SECRET=<NEXTAUTH_SECRET>
    MONGODB_URI=<MONGODB_URI>
    GEMINI_API_KEY=<GEMINI_API_KEY>
    ```  

-   **MONGODB_URI**: Your MongoDB connection string (you can get this from MongoDB Atlas or a local MongoDB instance).
-   **NEXTAUTH_SECRET**: A secret key used by NextAuth.js for session encryption (you can generate one using any random string generator).
-   **GEMINI_API_KEY**: Your API key for the Google Gemini-Flash 1.5 API.

5. **Run the app locally**:
```bash
npm run dev # or yarn dev
```

## How It Works

1.  **User Registration/Login**: Users can sign up or log in via the authentication system powered by **NextAuth.js**. After logging in, users can start generating quizzes and track their quiz history.
    
2.  **Generate a Quiz**: Once logged in, users can:
    
    -   Enter a topic for their quiz.
    -   Select the number of questions they want (e.g., 5, 10, 20 questions).
    -   Click on "Generate Quiz," and the app will fetch quiz questions using the **Google Gemini-Flash API**.
3.  **Taking the Quiz**: Users can take the quiz directly in the app, answering questions one by one, with real-time feedback.

## Contributing

We welcome contributions! If you'd like to contribute to **QuizAI**, please follow these steps:

1.  Fork this repository.
2.  Clone your forked repository.
3.  Create a new branch for your feature or bug fix.
4.  Make your changes and commit them.
5.  Push your changes to your fork.
6.  Open a pull request to the main repository.

## Screenshots
![screencapture-quizaity-vercel-app-2024-11-05-15_20_28](https://github.com/user-attachments/assets/6b9380ee-b9be-40b9-958b-46f4db8ab9b2)


## Acknowledgments

-   **Google Gemini-Flash 1.5 API** – For providing AI-powered question generation based on user-input topics.
-   **Next.js** – For enabling fast, scalable, and dynamic web applications.
-   **NextAuth.js** – For easy authentication and session management in Next.js apps.
-   **Tailwind CSS** – For simplifying responsive UI design.
-   **Shadcn UI** – For accessible and modern UI components.
