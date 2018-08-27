# Delete item

Deletes the item with the given id

* **URL**
  /api/items/[item_id]

* **Method:**
  
  `DELETE`
  
* **Parameters**

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

Error 1: Missing item id

```json
{
    code: 1
}
```