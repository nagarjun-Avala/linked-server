# Share Park Application API

---

### Routes

###### Authentication

1. http://localhost:8080/api/auth/register - Register
2. http://localhost:8080/api/auth/login - Login
3. http://localhost:8080/api/auth/logout - Logout
4. http://localhost:8080/api/auth/refreshtoken - Refresh auth

###### Posts

1.  http://localhost:8080/api/posts/create - Create a post
1.  http://localhost:8080/api/posts/getAll - Get all post with Category filter

###### User

1.  http://localhost:8080/api/user/update - Update User details

---

## Register route - parameters

1. fullname
1. email
1. linkedIn profile ID
1. linkedIn followers
1. password
1. category
1. gender
1. dailyLimit
1. verified - For User verification check

## Login route - parameters

1. email
1. password

## Create a post route - parameters

1. Post link
1. Category
1. User details
