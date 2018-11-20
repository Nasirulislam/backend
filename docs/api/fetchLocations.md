# Fetch locations

Returns all the locations

**URL**

  /v1/locations

**Method:**
  
  `GET`

**Headers**

- Accept-Language

**Parameters**

**Content-Type**

  `application/json`

**Success Response:**
  
- List of locations

```json
{
    "all": {
        "name": "All Switzerland",
        "image": "https://gzm.ams3.digitaloceanspaces.com/locations/all.png"
    }
    "locations": [
        {
            "name": "Argovia",
            "image": "https://gzm.ams3.digitaloceanspaces.com/locations/aargau.png"
        },
        {
            "name": "Obvaldo",
            "image": "https://gzm.ams3.digitaloceanspaces.com/locations/obwalden.png"
        },

        [...]
        
        {
            "name": "Zurigo",
            "image": "https://gzm.ams3.digitaloceanspaces.com/locations/zuerich.png"
        },
        {
            "name": "Zugo",
            "image": "https://gzm.ams3.digitaloceanspaces.com/locations/zug.png"
        }
    ]
}
```
 
**Error Response:**

Not documented
