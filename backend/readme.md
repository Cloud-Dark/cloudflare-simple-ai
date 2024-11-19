# Simple AI Cloudflare Worker

`simple_ai.js` is a Cloudflare Worker script designed to interact with Cloudflare's AI model service. It processes both text-based and image-based AI tasks, handling chat messages and image generation requests for use in front-end applications.

## Features

- **POST and GET Request Handling**: Supports JSON payloads via POST for chat and image requests, and query parameters via GET for image generation.
- **Model Integration**: Runs AI models on Cloudflare's AI infrastructure based on user input.
- **Image Generation**: Generates images from textual prompts using specified AI models.
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

### Text-Based AI (Chat) Requests

#### Making a Request

This Worker accepts POST requests with the following JSON payload:

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

#### Example Request (cURL)

```bash
curl -X POST https://<your-worker-name>.<your-cloudflare-account>.workers.dev \
-H "Content-Type: application/json" \
-d '{
  "model": "@cf/meta/llama-3.1-8b-instruct",
  "messages": [{"role": "user", "content": "Hello!"}]
}'
```

#### Response Format

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

---

### Image Generator Requests

The Worker supports both **POST** and **GET** methods for image generation.

#### POST Request

Send a JSON payload with the following format:

```json
{
  "model": "<model_name>",
  "prompt": "a flying cat in the sky"
}
```

- **model**: Specify the AI image generation model name.
- **prompt**: A textual description of the image you want to generate.

#### Example POST Request (cURL)

```bash
curl -X POST https://<your-worker-name>.<your-cloudflare-account>.workers.dev/image \
-H "Content-Type: application/json" \
-d '{
  "model": "@cf/bytedance/stable-diffusion-xl-lightning",
  "prompt": "a flying cat in the sky"
}'
```

#### GET Request

Send a request using query parameters:

```
https://<your-worker-name>.<your-cloudflare-account>.workers.dev/image?model=@cf/bytedance/stable-diffusion-xl-lightning&prompt=a+flying+cat+in+the+sky
```

#### Response Format

The response will be the generated image with a `Content-Type` header of `image/png`. For integration with frontend applications, you can directly use the image in an `<img>` tag.

---

### Error Handling

- **400 Bad Request**: Missing required parameters (`model` or `prompt/messages`).
- **405 Method Not Allowed**: Returned if the request method is not supported.
- **500 Internal Server Error**: Returned for issues during model processing or JSON parsing errors.

---

## Deployment

Once the Worker is deployed on Cloudflare, it can be used in your frontend application by sending requests (POST or GET) to the Worker URL, enabling backend AI processing for text-based interactions and image generation.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
