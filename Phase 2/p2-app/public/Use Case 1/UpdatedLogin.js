// login.js

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// document.getElementById("loginForm").addEventListener("submit", async function(event) {
//   event.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   try {

//     const user = await prisma.user.findUnique({
//       where: {
//         email: email
//       }
//     });

//     if (user && user.password === password) {
//       if (user.role === "author") {
//         window.location.href = "submit.html";
//       } else if (user.role === "reviwer") {
//         window.location.href = "reviewPapers.html";
//       } else {
//         window.location.href = "conferenceSch.html";
//       }
//     }
//   } catch (error) {
//     console.error("User not found", error);
//   }
// });
