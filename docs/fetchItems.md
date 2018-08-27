# Fetch items

Returns all the items matching a given criteria

* **URL**
  /api/items

* **Method:**
  
  `GET`
  
* **Parameters**

* **Content-Type**

  `application/json`

* **Success Response:**
  
- List of items matching a given criteria

```json
{
    "items": [
        {
            "description": "My car is red and it is awesome",
            "title": "Awesome car",
            "author": "5ae5049fe22c59001bf4a205",
            "created_at": 1526168002442,
            "item_id": "5af779c2ea97590143f29193"
        },
        {
            "description": "My house is amazing",
            "title": "Amazing house",
            "author": "5ae5049fe22c59001bf4a210",
            "created_at": 1526168002934,
            "item_id": "5af779c2ea97590143f299865"
        }
    ]
}
```
 
* **Error Response:**

Not documented