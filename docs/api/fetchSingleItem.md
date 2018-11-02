# Fetch single item

Returns the item with the given id

**URL**

  /v1/items/[item_id]

**Method:**
  
  `GET`
  
**Headers**

- Accept-Language

**Parameters**

- item_id: The id of the item

**Content-Type**

  `application/json`

**Success Response:**
  
- Item with the given id

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
        "updated_at": 1526168002934,
        "item_id": "5af779c2ea97590143f29193",
        "images": [
            {
                "image": "image1.png"
            },
            {
                "image": "image2.png"
            }
        ]
    }
}
```
 
**Error Response:**

- Invalid item identifier

```json
{
    "code": 2
}
```
