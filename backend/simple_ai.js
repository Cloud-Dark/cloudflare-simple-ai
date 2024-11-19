export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Check if the request is for an image
    if (url.pathname === '/image') {
      if (request.method === 'GET') {
        // Handle GET request
        const model = url.searchParams.get('model');
        const prompt = url.searchParams.get('prompt');

        if (!model || !prompt) {
          return new Response(
            JSON.stringify({ error: 'Model and prompt are required in query parameters' }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }

        try {
          // Generate image based on the prompt
          const inputs = { prompt: prompt };
          const response = await env.AI.run(model, inputs);

          return new Response(response, {
            headers: {
              'Content-Type': 'image/png',
              'Access-Control-Allow-Origin': '*',
            },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Error generating image', details: error.message }),
            {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }
      } else if (request.method === 'POST') {
        // Handle POST request
        try {
          const { model, prompt } = await request.json();

          if (!model || !prompt) {
            return new Response(
              JSON.stringify({ error: 'Model and prompt are required' }),
              {
                status: 400,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
              }
            );
          }

          // Generate image based on the prompt
          const inputs = { prompt: prompt };
          const response = await env.AI.run(model, inputs);

          return new Response(response, {
            headers: {
              'Content-Type': 'image/png',
              'Access-Control-Allow-Origin': '*',
            },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Error generating image', details: error.message }),
            {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }
      } else {
        return new Response(
          JSON.stringify({ error: 'Method Not Allowed' }),
          {
            status: 405,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }

    // Default handling for text processing
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method Not Allowed' }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    try {
      // Parse the JSON body from the request
      const { model, messages } = await request.json();

      if (!model || !messages) {
        return new Response(
          JSON.stringify({ error: 'Model and messages are required' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Prepare the chat object
      const chat = { messages };

      // Run the AI model with the parsed model and chat data
      const response = await env.AI.run(model, chat);

      return new Response(
        JSON.stringify({ response }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } catch (error) {
      // Return error in JSON format
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};
