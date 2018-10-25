# Update item

Update an item with the given parameters

**URL**

  /api/items/[item_id]

**Method:**
  
  `PUT`
  
**Parameters**

- item_id: The id of the item to be deleted
- title (optional): Title of the new item
- description (optional): Description of the new item

**Content-Type**

  `application/json`

**Success Response:**

- Item successfully updated

```json
{
    "item": {
        "description": "My car is red and it is awesome",
        "title": "Awesome car",
        "author": "5ae5049fe22c59001bf4a205",
        "created_at": 1526168002442,
        "item_id": "5af779c2ea97590143f29193"
    }
}
```
 
**Error Response:**

- Invalid item id

```json
{
    "code": 2
}
```

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