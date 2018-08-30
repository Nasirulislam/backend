# Login

Login with the given credentials

**URL**

  /api/accounts/login

**Method:**
  
  `POST`
  
**Parameters**

- email
- password

**Content-Type**

  `application/json`

**Success Response:**
  
- Token result of succesfully logging in

```json
{
    "token": "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ..."
}
```
 
**Error Response:**

- Wrong credentials

```json
{
    "code": 1
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
