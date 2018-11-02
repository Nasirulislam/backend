# Logout

Log out a currently logged in user

**URL**

  /v1/accounts/logout

**Method:**
  
  `POST`
  
**Parameters**

**Content-Type**

  `application/json`

**Success Response:**

- Empty response

```
{}
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
