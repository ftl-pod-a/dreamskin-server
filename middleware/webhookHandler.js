// // const jwt = require("jsonwebtoken");

// // const { OAuth2Client } = require("google-auth-library");
// // const clientId = process.env.GOOGLE_CLIENT_ID;
// // const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
// // const redirectUrl = "http://localhost:3000/auth/google/callback";

// // const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);


// // async function verifyToken(req, res, next) {
// //   const authHeader = req.headers["authorization"];
// //   if (!authHeader) return res.sendStatus(401); // No token provided

// //   const token = authHeader.split(" ")[1];
// //   if (!token) return res.sendStatus(401); // No token in the authorization header

// //   try {
// //     const ticket = await oauth2Client.verifyIdToken({
// //       idToken: token,
// //       audience: process.env.GOOGLE_CLIENT_ID,
// //     });
// //     const payload = ticket.getPayload();
// //     const { sub: google_id, email } = payload;

// //     // Check if user exists in database, create if not
// //     let user = await prisma.user.findUnique({
// //       where: { google_id },
// //     });
// //     if (!user) {
// //       user = await prisma.user.create({
// //         data: {
// //           google_id,
// //           email,
// //           username: email.split("@")[0], // Example: Use email prefix as username
// //         },
// //       });
// //     }

// //     req.user = { userId: user.user_id, username: user.username }; // Attach user information to the request
// //     next(); // Proceed to the next middleware or route handler
// //   } catch (e) {
// //     return res.sendStatus(403); // Invalid token
// //   }
// // }

// // module.exports = verifyToken;




// // const { Webhook } = require("svix");
// // const { PrismaClient } = require("@prisma/client");

// // const prisma = new PrismaClient();

// // // Define webhook secret
// // const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "whsec_SpapTYVu3co5YfsRlhnXocYKTiFYH14i";


// // // Function to handle incoming webhook requests
// // async function handleWebhook(req, res) {
// //   try {
// //     // Parse incoming request body as JSON
// //     const payload = req.body;

// //     // Extract Svix headers for verification
// //     const svix_id = req.headers["svix-id"];
// //     const svix_timestamp = req.headers["svix-timestamp"];
// //     const svix_signature = req.headers["svix-signature"];

// //     // Ensure Svix headers are present
// //     if (!svix_id || !svix_timestamp || !svix_signature) {
// //       return res.status(400).json({ error: "Missing Svix headers" });
// //     }

// //     // Create a new Webhook instance with your secret
// //     const webhook = new Webhook(WEBHOOK_SECRET);

// //     // Verify the incoming webhook payload
// //     const evt = webhook.verify(payload, {
// //       "svix-id": svix_id,
// //       "svix-timestamp": svix_timestamp,
// //       "svix-signature": svix_signature,
// //     });

// //     // Handle specific webhook events (e.g., user.created)
// //     switch (evt.type) {
// //       case "user.created":
// //         await handleUserCreated(evt.data);
// //         break;
// //       case "user.updated":
// //         await handleUserUpdated(evt.data);
// //         break;
// //       default:
// //         console.log(`Unhandled webhook event type: ${evt.type}`);
// //     }

// //     // Respond with success status
// //     return res.status(200).json({ success: true });
// //   } catch (error) {
// //     console.error("Error handling webhook:", error.message);
// //     return res.status(500).json({ error: "Internal server error" });
// //   }
// // }

// // // Function to handle 'user.created' event
// // async function handleUserCreated(data) {
// //   try {
// //     const { google_id, username, skinType, goals, concerns } = data;

// //     // Upsert user data into Prisma database
// //     const user = await prisma.user.upsert({
// //       where: { google_id },
// //       create: {
// //         google_id,
// //         username,
// //         skinType,
// //         goals,
// //         concerns,
// //       },
// //       update: {
// //         username,
// //         skinType,
// //         goals,
// //         concerns,
// //       },
// //     });

// //     console.log(`User created or updated: ${user.username}`);
// //   } catch (error) {
// //     console.error("Error handling 'user.created' event:", error.message);
// //     throw error;
// //   }
// // }

// // // Function to handle 'user.updated' event
// // async function handleUserUpdated(data) {
// //   try {
// //     const { google_id, username, skinType, goals, concerns } = data;

// //     // Update user data in Prisma database
// //     const user = await prisma.user.update({
// //       where: { google_id },
// //       data: {
// //         username,
// //         skinType,
// //         goals,
// //         concerns,
// //       },
// //     });

// //     console.log(`User updated: ${user.username}`);
// //   } catch (error) {
// //     console.error("Error handling 'user.updated' event:", error.message);
// //     throw error;
// //   }
// // }

// // // Export the handleWebhook function for use in other files
// // module.exports = { handleWebhook };




// const { Webhook } = require("svix");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// // Define webhook secret
//  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "whsec_SpapTYVu3co5YfsRlhnXocYKTiFYH14i";

// async function handleWebhook(req, res) {
//   try {
//     const payload = req.body;

//     // Extract Svix headers for verification
//     const svix_id = req.headers["svix-id"];
//     const svix_timestamp = req.headers["svix-timestamp"];
//     const svix_signature = req.headers["svix-signature"];

//     // Ensure Svix headers are present
//     if (!svix_id || !svix_timestamp || !svix_signature) {
//       return res.status(400).json({ error: "Missing Svix headers" });
//     }

//     // Create a new Webhook instance with your secret
//     const webhook = new Webhook(WEBHOOK_SECRET);

//     // Verify the incoming webhook payload
//     const evt = webhook.verify(payload, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });

//     // Handle specific webhook events (e.g., user.created)
//     switch (evt.type) {
//       case "user.created":
//         await handleUserCreated(evt.data);
//         break;
//       case "user.updated":
//         await handleUserUpdated(evt.data);
//         break;
//       default:
//         console.log(`Unhandled webhook event type: ${evt.type}`);
//     }

//     // Respond with success status
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error handling webhook:", error); // Log the full error object
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
// // // Function to handle incoming webhook requests
// // async function handleWebhook(req, res) {
// //   try {
// //     // Parse incoming request body as JSON (if svix expects JSON)
// //     const payload = req.body;

// //     // Extract Svix headers for verification
// //     const svix_id = req.headers["svix-id"];
// //     const svix_timestamp = req.headers["svix-timestamp"];
// //     const svix_signature = req.headers["svix-signature"];

// //     // Ensure Svix headers are present
// //     if (!svix_id || !svix_timestamp || !svix_signature) {
// //       return res.status(400).json({ error: "Missing Svix headers" });
// //     }

// //     // Create a new Webhook instance with your secret
// //     const webhook = new Webhook(WEBHOOK_SECRET);

// //     // Verify the incoming webhook payload
// //     const evt = webhook.verify(payload, {
// //       "svix-id": svix_id,
// //       "svix-timestamp": svix_timestamp,
// //       "svix-signature": svix_signature,
// //     });

// //     // Handle specific webhook events (e.g., user.created)
// //     switch (evt.type) {
// //       case "user.created":
// //         await handleUserCreated(evt.data);
// //         break;
// //       case "user.updated":
// //         await handleUserUpdated(evt.data);
// //         break;
// //       default:
// //         console.log(`Unhandled webhook event type: ${evt.type}`);
// //     }

// //     // Respond with success status
// //     return res.status(200).json({ success: true });
// //   } catch (error) {
// //     console.error("Error handling webhook:", error.message);
// //     return res.status(500).json({ error: "Internal server error" });
// //   }
// // }

// // Function to handle 'user.created' event
// async function handleUserCreated(data) {
//   try {
//     const { google_id, username, skinType, goals, concerns } = data;

//     // Upsert user data into Prisma database
//     const user = await prisma.user.upsert({
//       where: { google_id },
//       create: {
//         google_id,
//         username,
//         skinType,
//         goals,
//         concerns,
//       },
//       update: {
//         username,
//         skinType,
//         goals,
//         concerns,
//       },
//     });

//     console.log(`User created or updated: ${user.username}`);
//   } catch (error) {
//     console.error("Error handling 'user.created' event:", error.message);
//     throw error;
//   }
// }

// // Function to handle 'user.updated' event
// async function handleUserUpdated(data) {
//   try {
//     const { google_id, username, skinType, goals, concerns } = data;

//     // Update user data in Prisma database
//     const user = await prisma.user.update({
//       where: { google_id },
//       data: {
//         username,
//         skinType,
//         goals,
//         concerns,
//       },
//     });

//     console.log(`User updated: ${user.username}`);
//   } catch (error) {
//     console.error("Error handling 'user.updated' event:", error.message);
//     throw error;
//   }
// }

// // Export the handleWebhook function for use in other files
// module.exports = { handleWebhook };