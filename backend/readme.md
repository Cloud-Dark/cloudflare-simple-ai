# Simple AI Cloudflare Worker

`simple_ai.js` is a Cloudflare Worker script designed to interact with Cloudflare's AI model service. It processes POST requests to execute AI tasks, handling chat-based messages for use in front-end applications.

## Features

- **POST Request Handling**: Accepts JSON payloads via POST, supporting chat-based interactions.
- **Model Integration**: Runs AI models on Cloudflare's AI infrastructure based on user input.
- **Error Handling**: Provides structured error responses for unsupported methods or processing issues.

## Installation

1. **Upload the Script to Cloudflare Workers**:
   - Go to your Cloudflare dashboard.
   - Select **Workers** from the **Developer** section.
   - Create a new Worker and paste the contents of `simple_ai.js` into the script editor.

2. **Configure Environment Variables**:
   - Set up `env.AI` in the Worker’s environment to access Cloudflare's AI model API.

## Usage

### Endpoint URL

After deploying, your Worker will be available at a unique URL provided by Cloudflare (e.g., `https://<your-worker-name>.<your-cloudflare-account>.workers.dev`).

### Making Requests

This Worker accepts only POST requests with the following JSON payload:

```json
{
  "model": "<model_name>",
  "messages": [
    {"role": "user", "content": "Hello!"},
    {"role": "assistant", "content": "How can I assist you today?"}
  ]
}
```

- **model**: Specify the AI model name as per Cloudflare's AI service.
- **messages**: An array representing a conversation, where each message has a `role` (`user` or `assistant`) and `content`.

### Example Request (cURL)

```bash
curl -X POST https://<your-worker-name>.<your-cloudflare-account>.workers.dev \
-H "Content-Type: application/json" \
-d '{
  "model": "example_model",
  "messages": [{"role": "user", "content": "Hello!"}]
}'
```

### Response Format

A successful response will return JSON formatted like this:

```json
[
  {
    "inputs": {
      "messages": [
        {"role": "user", "content": "Hello!"}
      ]
    },
    "response": "<AI model response>"
  }
]
```

### Error Handling

- **405 Method Not Allowed**: Returned if the request method is not POST.
- **500 Internal Server Error**: Returned for issues during model processing or JSON parsing errors.

## Deployment

Once the Worker is deployed on Cloudflare, it can be used in your frontend application by sending POST requests to the Worker URL, making it straightforward to integrate AI capabilities into your app.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

By following this guide, you'll have `simple_ai.js` deployed on Cloudflare Workers, enabling backend AI processing for your frontend interactions.
