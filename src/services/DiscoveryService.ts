// Browser-compatible Elasticsearch service using fetch API
// This avoids Node.js module compatibility issues

// Elastic Cloud configuration for Elasticsearch Labs
const ELASTIC_CLOUD_ID = import.meta.env.VITE_ELASTIC_CLOUD_ID
const ELASTIC_API_KEY = import.meta.env.VITE_ELASTIC_API_KEY

// Helper function to make Elasticsearch API calls
const makeElasticsearchRequest = async (endpoint: string, method: string = 'GET', body?: any) => {
  if (!ELASTIC_CLOUD_ID || !ELASTIC_API_KEY || 
      ELASTIC_CLOUD_ID === 'your_cloud_id_here' || 
      ELASTIC_API_KEY === 'your_api_key_here') {
    throw new Error('Elasticsearch Labs credentials not configured')
  }

  const baseUrl = `https://${ELASTIC_CLOUD_ID}.es.us-central1.gcp.cloud.es.io`
  const url = `${baseUrl}${endpoint}`
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `ApiKey ${ELASTIC_API_KEY}`
    },
    body: body ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    throw new Error(`Elasticsearch request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export interface UserProfile {
  id: string
  name: string
  age: number
  major: string
  graduationYear: number
  interests: string[]
  mode: 'dating' | 'friends'
  gpa: number
  school: string
  location: {
    lat: number
    lon: number
  }
  photo: string
  bio: string
}

export interface FilterCriteria {
  majors: string[]
  graduationYearRange: [number, number]
  interests: string[]
  mode: 'dating' | 'friends' | 'both'
  campusRadius: number
  nearbySchools: boolean
  gpaRange: [number, number]
  ageRange: [number, number]
  userLocation?: {
    lat: number
    lon: number
  }
}

export class DiscoveryService {
  private static readonly INDEX_NAME = 'campus-match-profiles'

  // Mock profiles for fallback
  private static getMockProfiles(): UserProfile[] {
    return [
      {
        id: "1",
        name: "Jamie",
        age: 21,
        school: "Stanford University",
        major: "AI & Machine Learning",
        graduationYear: 2025,
        mode: "dating",
        bio: "Passionate about technology and making meaningful connections. Love hiking and exploring new cafes.",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
        interests: ["AI", "Hiking", "Photography"],
        gpa: 3.9,
        location: { lat: 37.7749, lon: -122.4194 },
      },
      {
        id: "2",
        name: "Morgan",
        age: 22,
        school: "UC Berkeley",
        major: "Product Design",
        graduationYear: 2024,
        mode: "dating",
        bio: "Designer by day, chef by night. Always looking for the next great adventure or coffee shop.",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        interests: ["Design", "Cooking", "Travel"],
        gpa: 3.7,
        location: { lat: 37.7749, lon: -122.4194 },
      },
      {
        id: "3",
        name: "Taylor",
        age: 20,
        school: "MIT",
        major: "Computer Science",
        graduationYear: 2026,
        mode: "friends",
        bio: "Building the future one line of code at a time. When I'm not coding, you'll find me at the climbing gym.",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
        interests: ["Coding", "Rock Climbing", "Music"],
        gpa: 3.85,
        location: { lat: 37.7749, lon: -122.4194 },
      },
    ]
  }

  // Initialize Elasticsearch index
  static async initializeIndex() {
    try {
      // Check if index exists
      try {
        await makeElasticsearchRequest(`/${this.INDEX_NAME}`)
        console.log('Elasticsearch Labs index already exists')
        return
      } catch (error) {
        // Index doesn't exist, create it
        console.log('Creating Elasticsearch Labs index...')
      }

      // Create index with mappings
      await makeElasticsearchRequest(`/${this.INDEX_NAME}`, 'PUT', {
        mappings: {
          properties: {
            name: { type: 'text' },
            age: { type: 'integer' },
            major: { type: 'keyword' },
            graduationYear: { type: 'integer' },
            interests: { type: 'keyword' },
            mode: { type: 'keyword' },
            gpa: { type: 'float' },
            school: { type: 'keyword' },
            location: {
              type: 'geo_point'
            },
            bio: { type: 'text' },
            photo: { type: 'keyword' }
          }
        }
      })
      
      console.log('Elasticsearch Labs index created successfully')
    } catch (error) {
      console.error('Error initializing Elasticsearch index:', error)
      throw error
    }
  }

  // Index a user profile
  static async indexProfile(profile: UserProfile) {
    try {
      await makeElasticsearchRequest(`/${this.INDEX_NAME}/_doc/${profile.id}`, 'PUT', profile)
    } catch (error) {
      console.error('Error indexing profile:', error)
      throw error
    }
  }

  // Search profiles with filters
  static async searchProfiles(filters: FilterCriteria, currentUserId: string): Promise<UserProfile[]> {
    try {
      const query: any = {
        bool: {
          must: [
            {
              bool: {
                must_not: [
                  { term: { _id: currentUserId } }
                ]
              }
            }
          ]
        }
      }

      // Mode filter
      if (filters.mode !== 'both') {
        query.bool.must.push({
          term: { mode: filters.mode }
        })
      }

      // Major filter
      if (filters.majors.length > 0) {
        query.bool.must.push({
          terms: { major: filters.majors }
        })
      }

      // Graduation year range
      query.bool.must.push({
        range: {
          graduationYear: {
            gte: filters.graduationYearRange[0],
            lte: filters.graduationYearRange[1]
          }
        }
      })

      // Age range
      query.bool.must.push({
        range: {
          age: {
            gte: filters.ageRange[0],
            lte: filters.ageRange[1]
          }
        }
      })

      // GPA range
      query.bool.must.push({
        range: {
          gpa: {
            gte: filters.gpaRange[0],
            lte: filters.gpaRange[1]
          }
        }
      })

      // Interests filter
      if (filters.interests.length > 0) {
        query.bool.must.push({
          terms: { interests: filters.interests }
        })
      }

      // Location filter (if user location is provided)
      if (filters.userLocation && filters.campusRadius > 0) {
        query.bool.filter = [
          {
            geo_distance: {
              distance: `${filters.campusRadius}mi`,
              location: {
                lat: filters.userLocation.lat,
                lon: filters.userLocation.lon
              }
            }
          }
        ]
      }

      const response = await makeElasticsearchRequest(`/${this.INDEX_NAME}/_search`, 'POST', {
        query,
        size: 50,
        sort: [
          { _score: { order: 'desc' } },
          { graduationYear: { order: 'asc' } }
        ]
      })

      return response.hits.hits.map((hit: any) => hit._source)
    } catch (error) {
      console.error('Error searching profiles:', error)
      console.warn('Falling back to mock profiles')
      return this.getMockProfiles()
    }
  }

  // Get nearby schools
  static async getNearbySchools(userLocation: { lat: number; lon: number }, radius: number) {
    try {
      const response = await makeElasticsearchRequest('/schools/_search', 'POST', {
        query: {
          geo_distance: {
            distance: `${radius}mi`,
            location: {
              lat: userLocation.lat,
              lon: userLocation.lon
            }
          }
        },
        size: 20
      })

      return response.hits.hits.map((hit: any) => hit._source)
    } catch (error) {
      console.error('Error getting nearby schools:', error)
      return []
    }
  }

  // Get filter suggestions based on current user
  static async getFilterSuggestions(userId: string) {
    try {
      const userProfile = await makeElasticsearchRequest(`/${this.INDEX_NAME}/_doc/${userId}`)
      const profile = userProfile._source

      return {
        suggestedMajors: [profile.major],
        suggestedInterests: profile.interests,
        suggestedGraduationYear: profile.graduationYear,
        suggestedAgeRange: [profile.age - 2, profile.age + 2] as [number, number]
      }
    } catch (error) {
      console.error('Error getting filter suggestions:', error)
      return null
    }
  }
}
