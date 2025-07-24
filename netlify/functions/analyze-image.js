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
    const { image, question } = JSON.parse(event.body);
    
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
            
            IMPORTANT: Respond ONLY with a valid JSON object, no markdown formatting, no code blocks, just pure JSON.
            
            The JSON must have this exact structure:
            {
              "basic": {
                "en": "English explanation of what the graph shows",
                "it": "Spiegazione in italiano di cosa mostra il grafico"
              },
              "realWorld": {
                "en": "English explanation of real-world e-commerce applications",
                "it": "Spiegazione in italiano delle applicazioni nel mondo reale dell'e-commerce"
              },
              "interactive": {
                "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
              }
            }
            
            Make sure to provide complete translations in Italian for both basic and realWorld sections.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: question ? 
                  `Analyze this economics graph/chart and explain it for Italian students interested in e-commerce. Also address this specific question: ${question}` :
                  "Analyze this economics graph/chart and explain it for Italian students interested in e-commerce."
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
    let content = data.choices[0].message.content;
    
    // Check if content is wrapped in markdown code block
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      content = jsonMatch[1];
    }
    
    try {
      // Try to parse as JSON
      analysis = JSON.parse(content);
    } catch (e) {
      // Try one more time - remove any markdown formatting
      const cleanContent = content.replace(/```[a-zA-Z]*\n?/g, '').trim();
      try {
        analysis = JSON.parse(cleanContent);
      } catch (e2) {
        // Final fallback - return error
        throw new Error('Failed to parse AI response as JSON');
      }
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