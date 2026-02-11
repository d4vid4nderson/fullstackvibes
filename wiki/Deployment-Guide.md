# Deployment Guide

Step-by-step guide to deploying the FullStackVibes portfolio to various hosting platforms.

## 🎯 Deployment Options

The portfolio is built as a static export, making it compatible with many hosting platforms:

1. **Vercel** (Recommended) - Zero-config Next.js hosting
2. **Netlify** - JAMstack platform
3. **GitHub Pages** - Free hosting for static sites
4. **Cloudflare Pages** - Fast global CDN
5. **AWS S3 + CloudFront** - Enterprise-grade hosting
6. **Custom Server** - Self-hosted options

---

## 🚀 Vercel Deployment (Recommended)

Vercel is the company behind Next.js and offers the best integration.

### Method 1: GitHub Integration (Easiest)

**Step 1:** Push code to GitHub

```bash
git add .
git commit -m "feat: ready for deployment"
git push origin main
```

**Step 2:** Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings
5. Click "Deploy"

**Step 3:** Done! 🎉

Your site is live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from project directory
vercel

# Follow prompts, then deploy to production
vercel --prod
```

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `fullstackvibes.io`)
3. Update DNS records as instructed
4. SSL certificate auto-provisioned

### Environment Variables

If you add API integrations later:

1. Project Settings → Environment Variables
2. Add key-value pairs
3. Redeploy to apply

---

## 🌐 Netlify Deployment

### Method 1: Git Integration

**Step 1:** Push to GitHub

**Step 2:** Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
6. Click "Deploy site"

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --dir=out --prod
```

### Custom Domain on Netlify

1. Site Settings → Domain Management
2. Add custom domain
3. Update DNS records
4. SSL automatically enabled

### Redirects & Headers

Create `netlify.toml` in root:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

---

## 📄 GitHub Pages Deployment

### Setup

**Step 1:** Enable GitHub Pages

1. Go to repository Settings
2. Pages section
3. Source: GitHub Actions

**Step 2:** Create GitHub Action

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v2
```

**Step 3:** Update `next.config.ts`

```typescript
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name', // Only if not using custom domain
  images: {
    unoptimized: true,
  },
};
```

**Step 4:** Push to GitHub

```bash
git add .
git commit -m "feat: add GitHub Pages deployment"
git push origin main
```

Site will be live at: `https://yourusername.github.io/your-repo-name/`

### Custom Domain with GitHub Pages

1. Add `CNAME` file to `public/` directory:
   ```
   your-domain.com
   ```

2. Configure DNS:
   - Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or CNAME pointing to: `yourusername.github.io`

3. Enable HTTPS in repository settings

---

## ☁️ Cloudflare Pages Deployment

### Using Git Integration

**Step 1:** Push to GitHub/GitLab

**Step 2:** Create Cloudflare Pages Project

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Pages → Create a project
3. Connect to Git provider
4. Select repository
5. Build settings:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output: `out`
6. Save and Deploy

### Using Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Build project
npm run build

# Deploy
wrangler pages deploy out --project-name=your-project
```

### Custom Domain

1. Pages project → Custom domains
2. Add domain (must be on Cloudflare)
3. Automatically configured

---

## 🪣 AWS S3 + CloudFront Deployment

### S3 Setup

**Step 1:** Create S3 Bucket

```bash
aws s3 mb s3://your-bucket-name --region us-east-1
```

**Step 2:** Configure bucket for static hosting

```bash
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

**Step 3:** Upload build files

```bash
# Build project
npm run build

# Upload to S3
aws s3 sync out/ s3://your-bucket-name --delete
```

### CloudFront Setup

**Step 1:** Create distribution

```bash
aws cloudfront create-distribution \
  --origin-domain-name your-bucket-name.s3.amazonaws.com \
  --default-root-object index.html
```

**Step 2:** Configure error pages

- 404 → /index.html (for client-side routing)
- 403 → /index.html

**Step 3:** Update bucket policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### Custom Domain with Route 53

1. Create hosted zone for your domain
2. Add A record (Alias to CloudFront)
3. Request ACM SSL certificate
4. Attach certificate to CloudFront distribution

### Automated Deployment

Create GitHub Action:

```yaml
name: Deploy to AWS

on:
  push:
    branches: ['main']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'out'
```

---

## 🐳 Docker Deployment

### Dockerfile

Create `Dockerfile` in root:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### Build and Run

```bash
# Build image
docker build -t fullstackvibes .

# Run container
docker run -p 3000:80 fullstackvibes
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - '3000:80'
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

---

## 🔧 Build Configuration

### Production Build

```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Output directory: ./out
```

### Build Optimization

**next.config.ts:**
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
};
```

### Environment-Specific Builds

Create `.env.production`:
```bash
NEXT_PUBLIC_SITE_URL=https://fullstackvibes.io
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Access in code:
```typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
```

---

## 🔐 Security Considerations

### Headers

Add security headers in your hosting platform:

**Vercel:** Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### HTTPS

- Always use HTTPS in production
- Most platforms provide free SSL (Let's Encrypt)
- Redirect HTTP to HTTPS
- Use HSTS headers

### Content Security Policy

Add CSP header:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

---

## 📊 Monitoring

### Analytics

**Vercel Analytics:**
Already included in `app/layout.tsx`

**Google Analytics:**
Add to `app/layout.tsx`:
```tsx
import Script from 'next/script';

<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### Error Tracking

**Sentry Integration:**

```bash
npm install @sentry/nextjs
```

Create `sentry.client.config.js`:
```javascript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0,
});
```

### Uptime Monitoring

Free options:
- [UptimeRobot](https://uptimerobot.com)
- [StatusCake](https://www.statuscake.com)
- [Pingdom](https://www.pingdom.com)

---

## 🚀 Performance Optimization

### CDN Configuration

**Cloudflare:**
- Enable Auto Minify (HTML, CSS, JS)
- Enable Brotli compression
- Set Browser Cache TTL: 4 hours

**Vercel:**
- Automatic CDN deployment
- Edge caching enabled by default

### Image Optimization

**After deployment, test:**
- Lighthouse scores
- Core Web Vitals
- Image loading performance

**Optimize images:**
```bash
# Install sharp for local optimization
npm install sharp

# Or use online tools
# - TinyPNG
# - Squoosh
# - ImageOptim
```

### Caching Strategy

**Static Assets:**
```
Cache-Control: public, max-age=31536000, immutable
```

**HTML:**
```
Cache-Control: public, max-age=0, must-revalidate
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Vercel)

Auto-deploy on push:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: ['main']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Preview Deployments

Vercel/Netlify automatically create preview deployments for:
- Pull requests
- Feature branches

Test changes before merging to main!

---

## 🧪 Pre-Deployment Checklist

- [ ] Run build locally: `npm run build`
- [ ] Test build output: `npx serve out`
- [ ] Check all links work
- [ ] Test on mobile devices
- [ ] Verify all images load
- [ ] Test all terminal commands
- [ ] Try all themes in light/dark mode
- [ ] Check modal functionality
- [ ] Test resume download
- [ ] Verify external links (GitHub, LinkedIn)
- [ ] Run Lighthouse audit
- [ ] Test browser compatibility
- [ ] Check console for errors
- [ ] Verify meta tags (SEO)
- [ ] Test social media sharing
- [ ] Check favicon appears

---

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

**Error: Out of memory**
```bash
# Increase Node memory
NODE_OPTIONS="--max_old_space_size=4096" npm run build
```

### Images Not Loading

- Verify images exist in `public/` directory
- Check file paths (case-sensitive on Linux)
- Ensure `images.unoptimized = true` in next.config.ts

### Routing Issues

- For static export, all routes must exist as HTML files
- Use `trailingSlash: true` in next.config.ts if needed

### Theme Not Persisting

- Check localStorage is accessible (not in private/incognito)
- Verify theme blocking script in layout.tsx
- Test in different browsers

---

## 📚 Additional Resources

### Documentation

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

### Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org)
- [GTmetrix](https://gtmetrix.com)

---

## 🎉 Success!

Your portfolio is now live! Share it with the world:

```
🌐 Live Site: https://your-domain.com
🐙 GitHub: https://github.com/yourusername/fullstackvibes
💼 LinkedIn: Share your achievement!
```

**Next Steps:**
1. Add custom domain
2. Set up analytics
3. Enable monitoring
4. Share on social media
5. Update resume with live link

---

Congratulations on deploying your portfolio! 🚀

If you encounter any issues, check the [GitHub Issues](https://github.com/d4vid4nderson/fullstackvibes/issues) or open a new one.
