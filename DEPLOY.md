# 🚀 Study Buddy Deployment Guide

## Prerequisites
- A Netlify account (sign up at netlify.com)
- Your OpenAI API key

## Deployment Steps

### 1. Set Up Environment Variable
In Netlify, you need to set your OpenAI API key as an environment variable:

1. Go to your Netlify dashboard
2. Select your site (or create a new one)
3. Go to Site Settings → Environment Variables
4. Add a new variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key (starts with `sk-`)

### 2. Deploy to Netlify

#### Option A: Deploy via CLI (Recommended)
```bash
# Login to Netlify (first time only)
netlify login

# Deploy to production
npm run deploy
```

#### Option B: Deploy via Git
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will auto-deploy on every push

#### Option C: Manual Deploy
1. Run `netlify deploy --prod`
2. Follow the prompts

## Features Included

✅ **Vision API Integration**: Analyzes economics graphs and charts using GPT-4 Vision
✅ **Bilingual Support**: Explanations in both English and Italian
✅ **Local Storage Notebook**: Save analyses for later reference
✅ **Export Options**: 
   - Copy individual entries to clipboard
   - Export single entries as HTML
   - Export entire notebook as HTML document
✅ **Mobile Responsive**: Works on all devices
✅ **No Database Required**: Everything saves locally in the browser

## Testing Locally

```bash
# Start local development server
npm run dev

# Open http://localhost:3000
```

## Important Notes

1. **API Key Security**: Never commit your API key to git. Always use environment variables.
2. **Usage Costs**: Each image analysis uses OpenAI API credits. Monitor your usage.
3. **Local Storage**: All notebook data is saved in the user's browser. Clearing browser data will delete saved entries.

## Troubleshooting

- **"Analysis failed" error**: Check that your OpenAI API key is correctly set in Netlify
- **Images not analyzing**: Ensure the image is clear and contains a graph/chart
- **Notebook not saving**: Check browser's local storage settings

## Support

For issues or questions, contact lovingyourskin.net