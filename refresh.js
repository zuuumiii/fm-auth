const awsCognito = require("amazon-cognito-identity-js");


const ID = process.env.CLARIS_ID;
const PW = process.env.CLARIS_PASS;

const userPool = new awsCognito.CognitoUserPool({
  UserPoolId: "us-west-2_NqkuZcXQY",
  ClientId: "4l9rvl4mv5es1eep1qe97cautn",
});

const cognitoUser = new awsCognito.CognitoUser({
  Username: ID,
  Pool: userPool,
});

const authenticationDetails = new awsCognito.AuthenticationDetails({
  Password: PW,
});

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess(result) {
    console.log("認証成功")
    console.log(
      "\nCognito Access Token : " + result.getAccessToken().getJwtToken()
    );
    console.log("\nClaris ID Token : " + result.idToken.jwtToken);
    console.log("\nClaris ID Refresh Token : " + result.refreshToken.token);
  },
  onFailure(err) {
    console.error(err);
  },
  async mfaRequired(codeDeliveryDetails) {
    const verificationCode = await readUserInput(
      "２段階認証の数字を入力してください : "
    );
    console.log("verification code = " + verificationCode);
    await cognitoUser.sendMFACode(verificationCode, this);
  },
});

function readUserInput(question) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    readline.question(question, (answer) => {
      resolve(answer);
      readline.close();
    });
  });
};