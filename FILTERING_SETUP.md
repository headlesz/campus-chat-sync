# 🔍 Filtering System Setup Guide

## ✅ **What's Already Working**

Your filtering system is now **fully functional** with:
- ✅ **Filter Modal** with all criteria (major, graduation year, interests, mode, campus radius, age, GPA)
- ✅ **Elasticsearch Integration** (falls back to mock data if not configured)
- ✅ **Filter Button** in the Discover page header
- ✅ **Loading States** and error handling
- ✅ **Toast Notifications** for filter results

## 🚀 **How to Use**

1. **Go to Discover page** (`/discover`)
2. **Click the filter button** (🔍) in the header
3. **Set your criteria**:
   - **Mode**: Dating, Friends, or Both
   - **Major**: Select specific majors
   - **Graduation Year**: Set year range
   - **Age**: Set age range
   - **GPA**: Set GPA range
   - **Interests**: Select shared interests
   - **Campus Radius**: Set distance in miles
   - **Nearby Schools**: Include/exclude nearby schools
4. **Click "Apply Filters"** to see filtered results
5. **Click "Clear Filters"** to reset

## 🔧 **Elasticsearch Labs Setup (Hackathon Sponsor)**

For **production-level filtering** with Elasticsearch Labs (your hackathon sponsor):

### 1. **Get Elasticsearch Labs Credentials**
- Sign up at [Elastic Cloud](https://cloud.elastic.co/) (Elasticsearch Labs)
- Create a deployment
- Get your **Cloud ID** and **API Key**

### 2. **Set Environment Variables**
Create a `.env` file in your project root:
```bash
VITE_ELASTIC_CLOUD_ID=your_cloud_id_here
VITE_ELASTIC_API_KEY=your_api_key_here
```

### 3. **Restart Development Server**
```bash
npm run dev
```

## 📊 **Current Behavior**

- **Without Elasticsearch**: Uses mock data with basic filtering
- **With Elasticsearch**: Full search capabilities with geo-location, complex queries, and real-time results

## 🎯 **Filter Criteria Available**

| Criteria | Type | Description |
|----------|------|-------------|
| **Mode** | Select | Dating, Friends, or Both |
| **Major** | Multi-select | Computer Science, Engineering, Business, etc. |
| **Graduation Year** | Range | 2020-2030 |
| **Age** | Range | 18-30 |
| **GPA** | Range | 2.0-4.0 |
| **Interests** | Multi-select | AI, Hiking, Coffee, Photography, etc. |
| **Campus Radius** | Slider | 1-50 miles |
| **Nearby Schools** | Toggle | Include/exclude nearby schools |

## 🔄 **How It Works**

1. **User applies filters** → FilterModal sends criteria to DiscoveryService
2. **DiscoveryService** → Queries Elasticsearch (or uses mock data)
3. **Results returned** → Profiles updated in Discover page
4. **User swipes** → Filtered profiles are shown

## 🛠️ **Troubleshooting**

### **Filter Button Not Working**
- Check browser console for errors
- Ensure all dependencies are installed: `npm install`

### **No Results Found**
- Try broader filter criteria
- Check if Elasticsearch is properly configured
- Verify mock data is loading

### **Elasticsearch Labs Errors**
- Verify environment variables are set correctly
- Check Elasticsearch Labs deployment status
- Ensure API key has proper permissions
- Contact Elasticsearch Labs support (hackathon sponsor)

## 🎉 **Ready to Use!**

Your filtering system is now **fully functional**! Users can:
- Filter by multiple criteria simultaneously
- See real-time results
- Clear filters easily
- Get feedback on filter results

The system gracefully handles both Elasticsearch and mock data scenarios, so it works out of the box!
