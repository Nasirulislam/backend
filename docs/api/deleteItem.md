# Delete item

Deletes the item with the given id

**URL**

  /v1/items/[item_id]

**Method:**
  
  `DELETE`
  
**Parameters**

- item_id: The id of the item to be deleted

**Content-Type**

  `application/json`

**Success Response:**

- Item successfully deleted

```json
{
}
```
 
**Error Response:**

- Invalid item identifier

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
