const awsCognito = require("amazon-cognito-identity-js");

const ID = process.env.CLARIS_ID;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const userPool = new awsCognito.CognitoUserPool({
  UserPoolId: "us-west-2_NqkuZcXQY",
  ClientId: "4l9rvl4mv5es1eep1qe97cautn",
});

const cognitoUser = new awsCognito.CognitoUser({
  Username: ID,
  Pool: userPool,
});

const cognitoRefreshToken = new awsCognito.CognitoRefreshToken({
  RefreshToken: REFRESH_TOKEN,
});

cognitoUser.refreshSession(cognitoRefreshToken, (err, result) => {
  if (err) throw err;
  console.log("認証成功")
  console.log(
    "\nCognito Access Token : " + result.getAccessToken().getJwtToken()
  );
  console.log("\nClaris ID Token : " + result.idToken.jwtToken);
  console.log("\nClaris ID Refresh Token : " + result.refreshToken.token);
});