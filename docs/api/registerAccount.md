# Register account

Create a new account with the given parameters

**URL**

  /v1/accounts

**Method:**
  
  `POST`
  
**Parameters**

- username
- email
- password

**Content-Type**

  `application/json`

**Success Response:**
  
- Account succesfully created

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

- Email already registered

```json
{
    "code": 7
}
```

- Username already registered

```json
{
    "code": 8
}
```

- Invalid username

```json
{
    "code": 9
}
```

- Invalid email

```json
{
    "code": 10
}
```

- Invalid password

```json
{
    "code": 11
}
```
