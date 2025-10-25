# SIID Download Page - Deployment Guide

## Overview

This guide will help you deploy the SIID Download Page to Firebase Hosting with automatic GitHub Actions deployment.

## Prerequisites

1. Firebase account
2. GitHub repository
3. Firebase CLI installed: `npm install -g firebase-tools`

## Firebase Setup

### ✅ Project Already Configured

Your SIID Download Page is deployed to:
- **Project**: `salesforce-ide-c1761` (Salesforce IDE)
- **Hosting Site**: `siid-download`
- **Live URL**: https://siid-download.web.app

### Existing Sites in Project:
- **Original Site**: `salesforce-ide-c1761.web.app` (preserved)
- **SIID Download**: `siid-download.web.app` (new)

### 1. Create Firebase Project

✅ **Already Complete** - Using existing project `salesforce-ide-c1761`

### 2. Enable Firebase Hosting

✅ **Already Complete** - Separate hosting site created for download page

### 3. Configure Firebase Locally

1. Login to Firebase CLI:
```bash
firebase login
```

2. Initialize the project:
```bash
firebase init hosting
```

Select:
- Use existing project: `siid-download`
- Public directory: `dist`
- Configure as single-page app: `Yes`
- Set up automatic builds and deploys with GitHub: `No` (we'll set this up manually)

### 4. Update Firebase Configuration

✅ **Already Complete** - Configuration updated for multi-site hosting:

`.firebaserc`:
```json
{
  "projects": {
    "default": "salesforce-ide-c1761"
  }
}
```

`firebase.json`:
```json
{
  "hosting": {
    "site": "siid-download",
    "public": "dist",
    ...
  }
}
```

## GitHub Actions Setup

### 1. Generate Firebase Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to "IAM & Admin" > "Service Accounts"
4. Click "Create Service Account"
5. Name it `github-actions`
6. Grant roles:
   - Firebase Hosting Admin
   - Firebase Rules Admin
7. Create and download the JSON key

### 2. Add GitHub Secrets

In your GitHub repository:

1. Go to Settings > Secrets and variables > Actions
2. Add new repository secret:
   - Name: `FIREBASE_SERVICE_ACCOUNT_SALESFORCE_IDE_C1761`
   - Value: Paste the entire JSON content from the service account key

### 3. Update Workflow Configuration

✅ **Already Complete** - Workflow configured for:
- **Project ID**: `salesforce-ide-c1761`
- **Target Site**: `siid-download`
- **Production URL**: https://siid-download.web.app

## Manual Deployment

For manual deployment:

```bash
# Build the project
npm run build

# Deploy to Firebase
npm run firebase:deploy
```

## Automatic Deployment

Once configured, the application will automatically deploy when:

- Code is pushed to the `main` branch (production deployment)
- Pull requests are created (preview deployment)

## Environment Variables

### Production Environment

Add these to your GitHub repository secrets if needed:

```
VITE_GITHUB_OWNER=Conscendotechnologies
VITE_GITHUB_REPO=AIpexium2
```

### Local Development

Create `.env.local`:

```env
VITE_GITHUB_OWNER=Conscendotechnologies
VITE_GITHUB_REPO=AIpexium2
```

## Custom Domain (Optional)

### 1. Add Custom Domain

1. In Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the verification steps
4. Update DNS records as instructed

### 2. SSL Certificate

Firebase automatically provides SSL certificates for custom domains.

## Monitoring

### Firebase Console

Monitor your deployment in:
- Firebase Console > Hosting > Dashboard
- View usage, performance, and deployment history

### GitHub Actions

Monitor deployments in:
- GitHub repository > Actions tab
- View build logs and deployment status

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors: `npm run build`
   - Verify all dependencies are installed: `npm install`

2. **Firebase Deployment Errors**
   - Verify project ID in `.firebaserc`
   - Check service account permissions
   - Ensure Firebase Hosting is enabled

3. **GitHub Actions Failures**
   - Verify `FIREBASE_SERVICE_ACCOUNT_SIID_DOWNLOAD` secret
   - Check workflow file syntax
   - Review action logs

### Support

- [Firebase Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Project Issues](https://github.com/Conscendotechnologies/AIpexium2/issues)

## Security Notes

1. Never commit service account keys to version control
2. Use environment variables for sensitive configuration
3. Regularly rotate service account keys
4. Monitor Firebase usage and costs

## Performance Optimization

1. **Caching**: Firebase Hosting automatically caches static assets
2. **CDN**: Content is served from Firebase's global CDN
3. **Compression**: Assets are automatically compressed
4. **HTTP/2**: Supported by default

## Backup and Recovery

1. **Source Code**: Stored in GitHub repository
2. **Firebase Project**: Can be exported/imported
3. **Domain Configuration**: Document custom domain settings

Your SIID Download Page is now ready for deployment! 🚀