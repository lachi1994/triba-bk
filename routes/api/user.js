const express = require('express');

const router = express.Router();

// controllers
const { googleLogin } = require('../../controllers/customer');
// const { authControl } = require('../../controllers/auth');

/**
* @swagger
*   /api/v1/user/googlelogin:
*  post:
*    summary: Log's a user in via google authentication.
*    tags:
*      - User's authentication
*    description: This endpoint handles everything about a user's login using google.
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*                tokenId:
*                  type: string
*                  description: A token got from the google API response.
*                  example: eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNzQ4OTUwOSwiaWF0IjoxNjM3NDg5NTA5fQ.oE_0iehBIvKvhXaGP3OOMzxmo3o9uyz9Ja3lsBNTGA
*
*    responses:
*      200:
*        description: User login was successful.
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                  message:
*                    type: string
*                    description: A short message to know that call was a success.
*                    example: success
*                  verified:
*                    type: boolean
*                    description: Tells if user is verified or not.
*                    example: true
*                  token:
*                    type: string
*                    description: shows the user's signed token
*                    example: eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNzQ0OTA0MSwiaWF0IjoxNjM3NDQ5MDQxfQ.nrrU9TZpi567XQRUBLnmov2RFS1gj5iVPElB9PkYNKA
*                  customer:
*                    type: object
*                    items:
*                      type: object
*                    properties:
*                        id:
*                          type: string
*                          description: The database object id of the user
*                          example: 7a8777ae41eee4f6
*                        name:
*                          type: string
*                          description: The full name of the user
*                          example: James Bond
*                        email:
*                          type: string
*                          description: The email of the user
*                          example: 007@jamesbond.com
*/

router.post('/googlelogin', googleLogin);

/* const isAuthenticated = require('../../middlewares/isAuthenticated');

// GET /users
router.get('/users', isAuthenticated, (req, res) => {
  res.send('Get a list of users - User =>' + req.user.username);
});

// GET /users/:id
router.get('/users/:id', isAuthenticated, (req, res) => {
  res.send('Get a list of users - User => ' + req.user.username + ' ID => ' + req.params.id);
});

// POST /users
router.post('/users', isAuthenticated, (req, res) => {
  res.send('Add a new user - User => ' + req.user.username);
});

router.get('/all', authControl, (req, res) => {
  res.send(req.user.username);
}); */

module.exports = router;
