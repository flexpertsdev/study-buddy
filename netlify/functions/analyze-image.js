exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { image } = JSON.parse(event.body);
    
    if (!image) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No image provided' })
      };
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an educational assistant helping Italian economics students understand graphs and charts. 
            Analyze the image and provide a fun, engaging explanation with real-world e-commerce examples.
            
            Respond with a JSON object containing:
            - basic: object with 'en' and 'it' explanations
            - realWorld: object with 'en' and 'it' real-world applications
            - interactive: suggestions for interactive learning`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this economics graph/chart and explain it for Italian students interested in e-commerce."
              },
              {
                type: "image_url",
                image_url: { url: image }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    let analysis;
    
    try {
      // Try to parse as JSON
      analysis = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      // Fallback structure
      analysis = {
        basic: {
          en: data.choices[0].message.content,
          it: "Traduzione non disponibile"
        },
        realWorld: {
          en: "Analysis provided above",
          it: "Analisi fornita sopra"
        },
        interactive: {
          suggestion: "Try changing variables to see effects"
        }
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, analysis })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Analysis failed', 
        details: error.message 
      })
    };
  }
};