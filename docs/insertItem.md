# Insert item

Insert the item with the given parameters

**URL**

  /api/items

**Method:**
  
  `POST`
  
**Parameters**

- title: Title of the new item
- description: Description of the new item

**Content-Type**

  `application/json`

**Success Response:**

- Item successfully inserted

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
