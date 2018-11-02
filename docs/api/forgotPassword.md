Send a request to reset a forgotten password

**URL**

  /v1/accounts/forgotpassword

**Method:**
  
  `POST`
  
**Parameters**

- email

**Content-Type**

  `application/json`

**Success Response:**
  
```json
{ }
```
 
**Error Response:**

- Invalid email

```json
{
    "code": 9
}
```

- Invalid username

```json
{
    "code": 10
}
```

- Error sending email

```json
{
    "code": 14
}
