# Insert item

Insert the item with the given parameters

**URL**

  /v1/items

**Method:**
  
  `POST`
  
**Parameters**

- title: Title of the new item
- description: Description of the new item
- images: Identifier of the images to bind with the new item

**Content-Type**

  `application/json`

**Success Response:**

- Item successfully inserted

```json
{
    "item": {
        "description": "My car is red and it is awesome",
        "title": "Awesome car",
        "author": {
            "id": 1,
            "username": "test1"
        },
        "created_at": 1526168002442,
        "updated_at": 1526168002442,
        "item_id": "5af779c2ea97590143f29193",
        "images": [
            "image0.png",
            "image1.png"
        ]
    }
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

- Invalid title

```json
{
    "code": 5
}
```

- Invalid description

```json
{
    "code": 6
}
```
