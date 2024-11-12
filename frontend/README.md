# Simple AI Frontend

This is a React-based frontend application designed to interact with an AI backend through a chat interface. Users can select AI models, input messages, and receive responses, with response times tracked for each interaction.

## Features

- **Chat Interface**: Allows users to send messages and receive AI-generated responses.
- **Model Selection**: Provides a dropdown to select different AI models.
- **Response Time Tracking**: Displays the average and last response time for AI responses.

## Installation

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/Cloud-Dark/cloudflare-simple-ai
cd frontend
```

### 2. Install Dependencies

Use npm to install all required packages as specified in `package.json`:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project with the following content:

```
REACT_APP_BACKEND_SERVER=<your_backend_url>
```

Replace `<your_backend_url>` with the URL of your backend server. This is where the frontend will send requests.

### 4. Start the Application

To run the app in development mode, use:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. **Select Model**: Choose from various AI models using the dropdown menu on the sidebar.
2. **Input Message**: Type a message in the input box and press **Enter** or click the **Run** button to send it.
3. **View Responses**: Messages and AI responses are displayed in the chat window, with the response time shown in seconds.

## Project Structure

- **`App.js`**: Main application component handling chat logic, model selection, and API requests.
- **`App.css` and `index.css`**: Styles for the user interface.

## Dependencies

This project uses the following main dependencies, as listed in `package.json`:

- **React** and **React DOM** for building the user interface.
- **axios** for HTTP requests to the backend.
- **marked** for rendering AI responses in Markdown format.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.

## License

This project is licensed under the MIT License.

---

This README provides all the setup and usage information for running the React frontend of the Simple AI project.
