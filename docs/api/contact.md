# Change password

Contact the author of an item.

**URL**

  /v1//contact/item/[item_id]

**Method:**
  
  `POST`
  
**Parameters**

- from
- message

**Content-Type**

  `application/json`

**Success Response:**
  
- Message succesfully sent

```json
{}
```
 
**Error Response:**

- Invalid item identifier  
```json
{
    "code": 2
}
```

- Invalid email

```json
{
    "code": 10
}
```

- Invalid message

```json
{
    "code": 15
}
```