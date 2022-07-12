# VistaarX 
---
## Backend APIs:
**Representation: {HTTP_TYPE}:{sub_route}, middleware_functions, function_executed (comment)**

### Auth
* **USE**: /api/auth **AuthRoutes**
* POST: /signup, upload.single("profile_pic"), SignupUser
* POST: /login LoginUser
* GET: /logout, authRequired, Logout
* PUT:/update_password, authRequired, ChangePassword

### Post
* **USE**: /api/post **PostRoutes**
* POST: /, authRequired, createPost
* GET: /:postId, authRequired, fetchPostById
* GET: /, authRequired, feed
* GET: /comment/:commentId/like_dislike, authRequired, likeDislikeComment
* GET: /:postId/like_dislike, authRequired, likeDislikePost
* GET: /:postId/comment, authRequired, fetchComments
* POST: /:postId/comment, authRequired, createComment

### Profile
* **USE**: /api/profile **ProfileRoutes**
* POST: /createmanu, authRequired, createManu
* POST: /createdistributor, authRequired, createDistributor
* POST: /createretailer, authRequired, createRetailer
* POST: /joinprofile, authRequired, joinprofile
* POST: /addproduct, authRequired, addproduct
* GET: /catalogue/:id, catalogue
* GET: /createorder/:productid, authRequired, createorder
* GET: /completeorder/:order_id, authRequired, completeorder)
* GET: /getmycompanyprofile/, authRequired, getmycompanyprofile 
* GET: /getcompanyprofile/:profileid", authRequired, getClickedcompanyprofile (by profileID)
* GET: /getprofile/:profileid, authRequired, getprofilebyId (by userID)
* GET: /getorderbyprofile/:profileid, getordersbyprofile
* GET: /getuserorders, authRequired, getuserorders
* GET: /getproducts, authRequired, getproducts
* GET: /getprofiles, authRequired, getprofiles
* GET: /getallprofiles, authRequired, getAllprofiles

### User
* **USE**: /api/user **UserRoutes**
* GET: /me, authRequired, me
* GET: /recommended_users, authRequired, fetchRecommandedUsers
* GET: /connection_request/sended, authRequired, fetchSendedConnectionRequest
* GET: /connection_request/received,authRequired, fetchIncommingConnectionRequest
* GET: /search, searchUsers
* GET: /connection_request/:userId/send, authRequired sendConnectionRequest
* GET: /connection_request/:requestId/accept, authRequired, acceptConnectionRequest
* GET: /connection_request/:requestId/decline, authRequired, declineConnectionRequest
* GET: /connection_request/:requestId/cancel, authRequired, cancelSendedConnectionRequest
* GET: /:user_id, fetchUserById

### Models:
1. Chat
2. Comment
3. ConnectionRequest
4. Distributor
5. Manufacturer
6. Notification
7. Order
8. Post
9. Product
10. Profile
11. Retailer
12. User.

* controllers folder have the functions that are to be executed when the route is called
* middleware folder contain the authentication controlling functions that act as middleware for the protected routes of the project. Functions included: **authRequired**