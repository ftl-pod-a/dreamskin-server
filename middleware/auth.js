const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = "http://localhost:3000/auth/google/callback";

const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);


async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401); // No token provided

  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401); // No token in the authorization header

  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: google_id, email } = payload;

    // Check if user exists in database, create if not
    let user = await prisma.user.findUnique({
      where: { google_id },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          google_id,
          email,
          username: email.split("@")[0], // Example: Use email prefix as username
        },
      });
    }

    req.user = { userId: user.user_id, username: user.username }; // Attach user information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (e) {
    return res.sendStatus(403); // Invalid token
  }
}

module.exports = verifyToken;