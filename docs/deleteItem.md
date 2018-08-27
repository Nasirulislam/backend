# Delete item

Deletes the item with the given id

* **URL**
  /api/items/[item_id]

* **Method:**
  
  `DELETE`
  
* **Parameters**

- item_id: The id of the item to be deleted

* **Content-Type**

  `application/json`

* **Success Response:**
  
List of items matching a given criteria

* **Code:** 200 <br />

Item successfully removed 
  **Content:** 
  ```json
  {
  }
  ```
 
* **Error Response:**

- Missing item id

```json
{
    code: 1
}
```

- Unauthorized

```json
{
    code: 3
}
```

- Forbidden

```json
{
    code: 4
}
```

- Invalid item id

```json
{
    code: 5
}
```
