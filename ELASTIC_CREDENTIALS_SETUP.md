# 🔑 Elasticsearch Labs Credentials Setup

## 📋 **Quick Setup Checklist**

### ✅ **Step 1: Get Your Credentials**
1. Go to [Elastic Cloud](https://cloud.elastic.co/)
2. Sign in to your account
3. Click on your deployment
4. **Copy Cloud ID** (looks like: `deployment-name:region:hash`)
5. Go to **Security** → **API Keys**
6. Click **Create API Key**
7. Name it: `CampusMatch Hackathon`
8. **Copy the API Key**

### ✅ **Step 2: Update Your .env File**
Replace the placeholder values in your `.env` file:

```bash
# Replace these with your actual credentials:
VITE_ELASTIC_CLOUD_ID=your_cloud_id_here
VITE_ELASTIC_API_KEY=your_api_key_here
```

### ✅ **Step 3: Restart Your App**
```bash
npm run dev
```

### ✅ **Step 4: Verify It's Working**
Check your browser console for:
- ✅ **"Elasticsearch Labs index created successfully"** = Working!
- ⚠️ **"Elasticsearch Labs environment variables not set"** = Need to add credentials

## 🎯 **Example .env File**

```bash
VITE_ELASTIC_CLOUD_ID=campusmatch:us-west1:abc123def456
VITE_ELASTIC_API_KEY=VnVhQ2ZHY0JDZGJrUW0tZTVhT3g6dWkybHA1YXpUTm1zeWEySnJ1c1E2QQ==
```

## 🚨 **Important Notes**

- **Never commit `.env` to git** - it contains sensitive credentials
- **Your app works without these** - it falls back to mock data
- **Elasticsearch Labs is optional** - but great for hackathon demos!

## 🆘 **Need Help?**

- **Elasticsearch Labs Support**: Contact your hackathon sponsor
- **Free Trial**: [Elastic Cloud](https://cloud.elastic.co/) offers free trials
- **Documentation**: [Elastic Cloud Docs](https://www.elastic.co/guide/en/cloud/current/index.html)
