# Deployment Guide for Crowd App

## Prerequisites
- Node.js 18+
- npm or yarn
- Git repository
- Deployment platform account (Vercel, Netlify, Azure, etc.)

## Before Deploying

### 1. Generate Secure Environment Variables

```bash
# Generate a new secure NEXTAUTH_SECRET
openssl rand -base64 32
```

### 2. Environment Variables to Set

Create these in your deployment platform's environment variables section:

```
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_KEY
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-generated-secret-key
```

## Deployment Platforms

### Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel:**
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repository
- Vercel automatically detects Next.js

3. **Set Environment Variables:**
- In Vercel dashboard, go to Settings → Environment Variables
- Add:
  - `DATABASE_URL`
  - `NEXTAUTH_URL` (set to your production URL)
  - `NEXTAUTH_SECRET`

4. **Deploy:**
- Click "Deploy"
- Monitor build and deployments

### Netlify

1. **Build Command:**
```
npm run build
```

2. **Publish Directory:**
```
.next
```

3. **Set Environment Variables:**
- In Netlify dashboard → Site settings → Build & deploy → Environment
- Add the required environment variables

### Azure App Service

1. **Create App Service:**
```bash
az appservice plan create --name myplan --resource-group mygroup --sku B1 --is-linux
az webapp create --resource-group mygroup --plan myplan --name myapp --runtime "node|18"
```

2. **Deploy:**
```bash
az webapp config appsettings set --resource-group mygroup --name myapp --settings DATABASE_URL=... NEXTAUTH_URL=... NEXTAUTH_SECRET=...
git push azure main
```

### Docker (for any platform)

1. **Create Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./
COPY public ./public
COPY prisma ./prisma

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build and Push:**
```bash
docker build -t myapp:latest .
docker push myregistry.azurecr.io/myapp:latest
```

## Post-Deployment Checklist

- [ ] Domain configured correctly
- [ ] HTTPS/SSL certificate working
- [ ] Environment variables set on platform
- [ ] Database connection verified
- [ ] Authentication tested (sign up, sign in)
- [ ] Create post functionality verified
- [ ] Monitoring and logs configured
- [ ] Backup strategy in place

## Troubleshooting Deployment

### Build Fails
- Check Node.js version matches (18+)
- Verify all environment variables are set
- Check for TypeScript errors: `npm run build`

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Ensure NEXTAUTH_URL matches your domain
- Check database is accessible from deployment

### Database Connection Issues
- Verify DATABASE_URL is correct
- Test connection with: `npx prisma db execute --stdin < test.sql`
- Check firewall rules allow connections

## Monitoring

### Logging
```bash
# Check recent logs
npm run build
npm start

# Production logs from your platform
# Vercel: Dashboard → Logs
# Netlify: Analytics → Logs
```

### Performance
- Monitor build time (should be < 5 minutes)
- Check API response times
- Monitor database query times

## Scaling

### Database
- Increase Prisma Accelerate tier if needed
- Monitor connection usage
- Scale database if needed

### Application
- Use CDN for static assets (done automatically on Vercel)
- Enable caching headers
- Monitor memory usage

## Security Notes

- [ ] NEXTAUTH_SECRET never committed to git
- [ ] Environment variables only in platform settings
- [ ] Use HTTPS only
- [ ] Keep dependencies updated
- [ ] Regular security audits
- [ ] Implement rate limiting for production

## Rollback

If deployment fails:
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Deployment platforms will auto-redeploy from latest commit
```

## Support

- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Azure: https://docs.microsoft.com/en-us/azure/app-service
- Next.js: https://nextjs.org/docs/deployment
