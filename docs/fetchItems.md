# Fetch items

Returns all the items matching a given criteria

**URL**

  /api/items

**Method:**
  
  `GET`
  
**Parameters**

- page: Paging offset, it takes will take the value 1 by default
- author: Identifier of an user to filter items

**Content-Type**

  `application/json`

**Success Response:**
  
- List of items matching a given criteria

```json
{
    "total": 100,
    "page": 1,
    "items": [
        {
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
                {
                    "image": "image1.png"
                },
                {
                    "image": "image2.png"
                }
            ]
        },
        {
            "description": "My house is amazing",
            "title": "Amazing house",
            "author": {
                "id": 1,
                "username": "test1"
            },
            "created_at": 1526168002934,
            "updated_at": 1526168002934,
            "item_id": "5af779c2ea97590143f299865",
            "images": []
        }
    ]
}
```
 
**Error Response:**

- Invalid page

```json
{
    "code": 16
}
```

- Invalid account identifier

```json
{
    "code": 17
}
```

- Invalid search term

```json
{
    "code": 18
}
```