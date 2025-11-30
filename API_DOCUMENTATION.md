# StyleHub API Documentation

## Base URL
Development: `http://localhost:3001/api`

## Authentication
Most endpoints require authentication using NextAuth.js session cookies.

---

## Authentication Endpoints

### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "user" // or "designer"
}
```

**Response:**
```json
{
  "user": {
    "id": "clxxx...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### POST /api/auth/signin
Login endpoint (handled by NextAuth)

**Credentials:**
- email
- password

---

## Wardrobe Endpoints

### GET /api/wardrobe
Get all clothing items for the authenticated user.

**Query Parameters:**
- `category` (optional): Filter by category (tops, bottoms, dresses, etc.)

**Response:**
```json
{
  "items": [
    {
      "id": "clxxx...",
      "userId": "clxxx...",
      "name": "Blue T-Shirt",
      "category": "tops",
      "color": "blue",
      "brand": "Nike",
      "season": "summer",
      "occasion": "casual",
      "imageUrl": "https://...",
      "tags": "casual,comfortable",
      "isDesignerPiece": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /api/wardrobe
Add a new clothing item.

**Request Body:**
```json
{
  "name": "Blue T-Shirt",
  "category": "tops",
  "color": "blue",
  "brand": "Nike",
  "season": "summer",
  "occasion": "casual",
  "imageUrl": "https://cloudinary.com/...",
  "tags": ["casual", "comfortable"]
}
```

**Response:**
```json
{
  "item": { /* created item */ }
}
```

### GET /api/wardrobe/[id]
Get a specific clothing item.

**Response:**
```json
{
  "item": { /* item details */ }
}
```

### PATCH /api/wardrobe/[id]
Update a clothing item.

**Request Body:**
```json
{
  "name": "Updated Name",
  "color": "red"
  // any fields to update
}
```

### DELETE /api/wardrobe/[id]
Delete a clothing item.

**Response:**
```json
{
  "success": true
}
```

---

## Outfit Endpoints

### GET /api/outfits
Get outfits.

**Query Parameters:**
- `public` (optional): "true" to get public outfits from all users

**Response:**
```json
{
  "outfits": [
    {
      "id": "clxxx...",
      "userId": "clxxx...",
      "name": "Casual Friday",
      "description": "Perfect for office",
      "occasion": "work",
      "season": "spring",
      "imageUrl": "https://...",
      "likes": 24,
      "saves": 12,
      "isPublic": true,
      "items": [
        {
          "id": "clxxx...",
          "clothingItem": { /* clothing item details */ }
        }
      ],
      "user": {
        "id": "clxxx...",
        "name": "John Doe",
        "avatar": "https://..."
      },
      "_count": {
        "likedBy": 24,
        "savedBy": 12
      }
    }
  ]
}
```

### POST /api/outfits
Create a new outfit.

**Request Body:**
```json
{
  "name": "Summer Vibes",
  "description": "Light and breezy",
  "itemIds": ["item-id-1", "item-id-2", "item-id-3"],
  "occasion": "casual",
  "season": "summer",
  "imageUrl": "https://...",
  "isPublic": true
}
```

### GET /api/outfits/[id]
Get a specific outfit with all details.

### PATCH /api/outfits/[id]
Update an outfit.

### DELETE /api/outfits/[id]
Delete an outfit.

---

## Social Endpoints

### POST /api/social/like
Like or unlike an outfit.

**Request Body:**
```json
{
  "outfitId": "clxxx..."
}
```

**Response:**
```json
{
  "liked": true // or false if unliked
}
```

### POST /api/social/save
Save or unsave an outfit.

**Request Body:**
```json
{
  "outfitId": "clxxx..."
}
```

**Response:**
```json
{
  "saved": true // or false if unsaved
}
```

### POST /api/social/follow
Follow or unfollow a user/designer.

**Request Body:**
```json
{
  "userId": "clxxx..."
}
```

**Response:**
```json
{
  "following": true // or false if unfollowed
}
```

---

## Weather Endpoint

### GET /api/weather
Get weather data for outfit recommendations.

**Query Parameters:**
- `city` (optional): City name (e.g., "New York")
- `lat` (optional): Latitude
- `lon` (optional): Longitude

Use either city OR lat/lon coordinates.

**Response:**
```json
{
  "weather": {
    "temp": 72,
    "feelsLike": 70,
    "condition": "Clear",
    "description": "clear sky",
    "humidity": 45,
    "windSpeed": 5.2
  }
}
```

---

## Recommendations Endpoint

### GET /api/recommendations
Get AI-powered outfit recommendations.

**Query Parameters:**
- `city` (optional): City for weather-based recommendations
- `occasion` (optional): Occasion type (casual, work, formal, etc.)

**Response:**
```json
{
  "recommendations": [
    {
      "items": [
        { /* clothing item 1 */ },
        { /* clothing item 2 */ }
      ],
      "reasons": [
        {
          "reason": "Warm weather (72°F) - light and breathable fabrics ideal",
          "score": 9
        }
      ],
      "totalScore": 9
    }
  ],
  "weather": {
    "temp": 72,
    "condition": "Clear"
    // ... weather details
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "error": "Item not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- Rate limiting middleware
- API key authentication for external access
- Request throttling per user

---

## Future API Endpoints (Planned)

### Designer Management
- `GET /api/designers` - List all designers
- `GET /api/designers/[id]` - Get designer profile
- `POST /api/designers` - Create designer profile
- `PATCH /api/designers/[id]` - Update designer profile

### Collections
- `GET /api/collections` - List collections
- `POST /api/collections` - Create collection
- `PATCH /api/collections/[id]` - Update collection
- `DELETE /api/collections/[id]` - Delete collection

### Search & Discovery
- `GET /api/search` - Search items, outfits, designers
- `GET /api/trending` - Get trending outfits
- `GET /api/feed` - Personalized feed

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/[id]/read` - Mark as read

### User Profile
- `GET /api/users/[id]` - Get user profile
- `PATCH /api/users/me` - Update own profile
- `GET /api/users/me/stats` - Get user statistics

---

## SDK/Client Examples

### JavaScript/TypeScript
```typescript
// Login
const response = await fetch('/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

// Get wardrobe
const wardrobe = await fetch('/api/wardrobe');
const data = await wardrobe.json();

// Create outfit
const outfit = await fetch('/api/outfits', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Summer Look',
    itemIds: ['id1', 'id2'],
    isPublic: true,
  }),
});

// Like outfit
await fetch('/api/social/like', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ outfitId: 'outfit-id' }),
});
```

### React Hook Example
```typescript
import { useState, useEffect } from 'react';

function useWardrobe(category?: string) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWardrobe() {
      const url = category
        ? `/api/wardrobe?category=${category}`
        : '/api/wardrobe';

      const response = await fetch(url);
      const data = await response.json();
      setItems(data.items);
      setLoading(false);
    }

    fetchWardrobe();
  }, [category]);

  return { items, loading };
}
```

---

## Testing with curl

```bash
# Create account
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"user"}'

# Get weather
curl http://localhost:3001/api/weather?city=Boston

# Get recommendations (requires auth cookie)
curl -b cookies.txt http://localhost:3001/api/recommendations?city=Boston
```

---

## WebSocket Endpoints (Future)

Planned for real-time features:
- `/ws/notifications` - Real-time notifications
- `/ws/chat` - Designer-user messaging
- `/ws/feed` - Live feed updates
