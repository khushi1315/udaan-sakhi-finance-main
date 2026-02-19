# Netlify Deployment Guide

## Prerequisites
- Netlify account (https://netlify.com)
- GitHub repository with your code pushed
- Supabase project set up

## Deployment Steps

### 1. Connect GitHub Repository to Netlify
1. Log in to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Select GitHub and authorize Netlify
4. Choose your repository (`udaan-sakhi-finance-main`)
5. Click **"Deploy site"**

### 2. Configure Environment Variables
Before deployment, set the Supabase environment variables in Netlify:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Edit variables"** and add:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-public-anon-key
   ```
3. Save and redeploy

### 3. Build Configuration
The project uses:
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 20 (configured in `netlify.toml`)

### 4. Test Locally Before Deploying
```bash
npm run build
npm run preview
```
Then open http://localhost:4173 to test the production build.

### 5. Troubleshooting

**Build fails with missing env vars:**
- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are set in Netlify environment variables
- Redeploy after adding vars

**App loads but Supabase fails:**
- Verify Supabase project URL and anon key are correct
- Check Supabase Auth settings → **Redirect URLs** includes your Netlify domain (e.g., `https://your-site.netlify.app`)

**Route not found errors:**
- The `netlify.toml` includes a redirect rule for SPA routing — all undefined routes redirect to `/index.html`

### 6. Custom Domain (Optional)
1. Go to **Site settings** → **Domain management**
2. Add your custom domain and update DNS records as instructed
