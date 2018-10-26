# Upload image

Upload an image to be used for item insertion

**URL**

  /api/images

**Method:**
  
  `POST`
  
**Parameters**

- image: The image to be uploaded

**Content-Type**

  `application/json`

**Success Response:**

- Identifier of the image

```json
{
    "identifier": "1.1832503920.png"
}
```
 
**Error Response:**

- Unauthorized

```json
{
    "code": 3
}
```

- Forbidden

```json
{
    "code": 4
}
```
