# Study Buddy - Italian Economics Helper

Turn boring economics graphs into exciting business insights! This app helps Italian students understand economics by analyzing textbook graphs and explaining them in both English and Italian with real-world e-commerce examples.

## 🚀 Live Demo

**Visit:** https://study-buddy-italy.netlify.app

## Features

- 📸 Upload photos of economics graphs/charts
- 🤖 AI-powered analysis using OpenAI Vision API
- 🇮🇹 Bilingual explanations (English & Italian)
- 💼 Real-world business examples
- 📱 Mobile-friendly design
- ⚡ Instant results
- 💾 Save explanations to local notebook
- 📋 Copy explanations to clipboard
- 📄 Export as HTML documents
- 📚 Complete notebook export

## 🛠️ Setup & Deployment

### GitHub Repository
- **Repo:** https://github.com/flexpertsdev/study-buddy
- Clone: `git clone https://github.com/flexpertsdev/study-buddy.git`

### Netlify Deployment
1. Site is already deployed at: https://study-buddy-italy.netlify.app
2. OpenAI API key is configured as environment variable
3. Automatic deploys enabled from GitHub

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variable
# Add your OpenAI API key to .env file
OPENAI_API_KEY=your_key_here

# Run locally
npm run dev

# Deploy to production
npm run deploy
```

## 📝 How to Use

1. Visit https://study-buddy-italy.netlify.app
2. Upload or drag a photo of an economics graph/chart
3. Click "✨ Analyze This!"
4. View explanations in English and Italian
5. Save to notebook for later study
6. Export individual analyses or entire notebook

## 🔐 Security Note

The OpenAI API key is securely stored in Netlify environment variables and never exposed to the client.

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

Made with ❤️ by [Lovingyourskin.net](https://lovingyourskin.net)