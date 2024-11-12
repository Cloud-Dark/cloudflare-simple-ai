# Simple AI Chat Application

This project is a two-part application that includes a **React frontend** for user interaction and a **Cloudflare Worker backend** for processing AI model requests. The frontend allows users to select models, enter chat messages, and receive AI-generated responses.
![image](https://github.com/user-attachments/assets/d510bc5a-8111-4add-8332-e969be2b58c1)

## Project Structure

- **frontend/**: React application for the user interface.
- **backend/**: Cloudflare Worker script for processing requests and returning AI model responses.

## Features

- **Frontend**: 
  - Chat interface for interacting with AI models.
  - Model selection options and response time tracking.
- **Backend**:
  - Handles AI model requests and returns responses.
  - Error handling for unsupported methods or processing issues.

## Setup Instructions

### Prerequisites

- Node.js and npm installed for the frontend.
- Cloudflare account for deploying the backend Worker.

---

## Backend Setup (Cloudflare Worker)

The backend is a Cloudflare Worker that processes AI model requests.

### 1. Configure the Worker Script

1. Go to the Cloudflare dashboard.
2. Under **Developer** > **Workers**, create a new Worker.
3. Copy the contents of `backend/simple_ai.js` and paste it into the Worker editor.

### 2. Set Up Environment Variables

Add `env.AI` to the Worker environment to enable API access for Cloudflare's AI models.

### Endpoint

After deployment, the Worker will be accessible at a unique URL (e.g., `https://<your-worker-name>.<your-cloudflare-account>.workers.dev`).

---

## Frontend Setup (React)

The frontend is a React application that sends chat messages to the backend Worker and displays the responses.

### 1. Clone the Repository

```bash
git clone https://github.com/Cloud-Dark/cloudflare-simple-ai/
cd frontend
```

### 2. Install Dependencies

Navigate to the `frontend` folder and install dependencies:

```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `frontend` directory with the following content:

```
REACT_APP_BACKEND_SERVER=<your_worker_url>
```

Replace `<your_worker_url>` with the URL for your deployed Cloudflare Worker.

### 4. Start the Frontend

In the `frontend` directory, run:

```bash
npm start
```

The application will run at `http://localhost:3000`.

---

## Usage

1. **Model Selection**: Choose an AI model from the dropdown menu in the sidebar.
2. **Chat Interface**: Type a message and hit **Enter** or click **Run** to send it.
3. **View Responses**: Responses and timestamps are displayed in the chat area.

---

## Project Structure

- **`frontend/`**: Contains the React app for user interaction.
  - **App.js**: Main application logic for handling chat interactions.
  - **App.css** and **index.css**: Styling for the frontend.
- **`backend/simple_ai.js`**: Cloudflare Worker script for AI model processing.

## Available Scripts

In the `frontend` directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.

## License

This project is licensed under the MIT License.

---

This README provides full setup instructions for both frontend and backend components, enabling a functional AI chat application.
