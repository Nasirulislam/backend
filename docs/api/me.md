# Me

Returns account information to a logged in user

**URL**

  /v1/accounts/me

**Method:**
  
  `GET`
  
**Parameters**

**Content-Type**

  `application/json`

**Success Response:**
  
- Account updated

```json
{
    "account": {
        "username": "username",
        "email": "user@gmail.com",
        "id": 4
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
