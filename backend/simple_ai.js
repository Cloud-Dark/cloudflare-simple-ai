export default {
  async fetch(request, env) {
    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and OPTIONS methods
          'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
        },
      });
    }

    // Handle only POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method Not Allowed' }), 
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          }
        }
      );
    }

    const tasks = [];
    const chatMessages = [];

    try {
      // Parse the JSON body from the request
      const { model, messages } = await request.json();
      
      // Prepare the chat object
      const chat = {
        messages: messages || chatMessages
      };

      // Run the AI model with the parsed model and chat data
      const response = await env.AI.run(model, chat);

      // Collect task data
      tasks.push({ inputs: chat, response });
      
      return new Response(JSON.stringify(tasks), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        },
      });

    } catch (error) {
      // Return error in JSON format
      return new Response(
        JSON.stringify({ error: error.message }), 
        {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          }
        }
      );
    }
  }
};
