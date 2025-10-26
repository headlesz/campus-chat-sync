# 🚀 Elasticsearch Labs Setup Guide

## 🎯 **For CalHacks - Elasticsearch Labs Sponsor**

This guide will help you set up **Elasticsearch Labs** (your hackathon sponsor) for your CampusMatch filtering system.

## 📋 **Quick Setup Steps**

### 1. **Get Elasticsearch Labs Credentials**
1. Go to [Elastic Cloud](https://cloud.elastic.co/)
2. Sign up for a **free trial** (perfect for hackathons!)
3. Create a new deployment
4. Get your credentials:
   - **Cloud ID** (looks like: `deployment-name:region:hash`)
   - **API Key** (generate in Security → API Keys)

### 2. **Configure Your App**
Create a `.env` file in your project root:
```bash
# Elasticsearch Labs Configuration
VITE_ELASTIC_CLOUD_ID=your_cloud_id_here
VITE_ELASTIC_API_KEY=your_api_key_here
```

### 3. **Restart Your App**
```bash
npm run dev
```

## 🔍 **What This Enables**

With Elasticsearch Labs, your filtering system gets:

- ✅ **Real-time search** across thousands of profiles
- ✅ **Geo-location filtering** (campus radius)
- ✅ **Complex queries** (multiple criteria simultaneously)
- ✅ **Fuzzy matching** for interests and majors
- ✅ **Scalable performance** for hackathon demos
- ✅ **Professional-grade** search capabilities

## 🎨 **Perfect for Hackathon Demo**

- **Impressive**: Shows enterprise-level search technology
- **Fast**: Sub-second response times
- **Reliable**: Managed by Elasticsearch Labs
- **Free**: No cost for hackathon usage
- **Sponsor-friendly**: Uses your sponsor's technology!

## 🛠️ **Testing Your Setup**

1. **Check Console**: Look for "Elasticsearch Labs index created successfully"
2. **Test Filters**: Apply filters and see real-time results
3. **Check Network**: See Elasticsearch API calls in browser dev tools

## 🆘 **Need Help?**

- **Elasticsearch Labs Support**: Contact your hackathon sponsor
- **Documentation**: [Elastic Cloud Docs](https://www.elastic.co/guide/en/cloud/current/index.html)
- **Community**: [Elastic Community](https://discuss.elastic.co/)

## 🎉 **Ready to Impress!**

Your CampusMatch app now has **enterprise-grade search** powered by Elasticsearch Labs - perfect for your hackathon demo! 🚀
