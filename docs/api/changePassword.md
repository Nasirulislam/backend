# Change password

Change the password of a logged in user

**URL**

  /v1/accounts/password

**Method:**
  
  `POST`
  
**Parameters**

- old
- new

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

- Wrong credentials

```json
{
    "code": 1
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

- Invalid password

```json
{
    "code": 11
}
```

- Invalid new password

```json
{
    "code": 13
}
```