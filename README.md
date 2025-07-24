# Study Buddy - Italian Economics Helper

A simple web app that helps Italian students understand economics graphs and charts with real-world e-commerce examples.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Add your OpenAI API key:**
Edit `.env` file and replace `your-openai-api-key-here` with your actual key

3. **Run locally:**
```bash
npm run dev
```

4. **Deploy to Netlify:**
```bash
npm run deploy
```

## Project Structure

```
study-buddy/
├── public/             # Static files
│   └── index.html     # Main app
├── netlify/
│   └── functions/     # Serverless functions
│       └── analyze-image.js
├── .env               # Environment variables (don't commit!)
├── netlify.toml       # Netlify configuration
└── package.json       # Project config
```

## Features

- 📸 Upload economics graphs/charts
- 🌐 Bilingual explanations (English/Italian)
- 🔒 Secure API key handling via Netlify Functions
- 📱 Mobile-optimized
- 🚀 One-click deploy

## Deployment

1. Push to GitHub
2. Connect to Netlify
3. Add `OPENAI_API_KEY` in Netlify environment variables
4. Deploy!

Made with ❤️ by Lovingyourskin.net