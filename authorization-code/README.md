# Node OAuth2 authorization code grant example

To run the example: ```npm install``` and then ```npm start```.

Visit ```http://localhost:4000/secure``` and enter ```test_user``` and ```test_password``` for the username and password when prompted.

### /authorization-server
An implementation of [express-oauth-server](https://www.npmjs.com/package/express-oauth-server). The server receives
authentication requests from clients at ```/authorize```. It then authenticates directly with the user (aka 'the resource owner') using [passport-local](https://www.npmjs.com/package/passport-local). After this, a callback is made to the client
containing an authorization code. The client should then make a request to ```/token``` containing this authorization code
to receive an access token. The client can then make a request containing the access token to ```/profile``` to retrieve
the user's profile.

### /client
A NodeJS client application which uses [passport-oauth2](https://www.npmjs.com/package/passport-oauth2) to delegate authentication to the authorization server as described above. The app exposes a single endpoint ```/secure``` which requires this authentication.
