# Fetch single item

Returns the item with the given id

**URL**

  /api/items/[item_id]

**Method:**
  
  `GET`
  
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
        "author": "5ae5049fe22c59001bf4a205",
        "created_at": 1526168002442,
        "item_id": "5af779c2ea97590143f29193"
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
