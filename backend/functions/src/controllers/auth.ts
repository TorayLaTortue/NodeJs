// import { getAuth, User, sendEmailVerification, EmailAuthProvider, reauthenticateWithCredential, updateEmail, sendPasswordResetEmail } from "firebase/auth";

// export const auth = getAuth();

// export function sendVerificationEmail(user) {
//   sendEmailVerification(user)
//     .then(() => {
//       console.log("Email verification sent!");
//     })
//     .catch((error) => {
//       console.error("Error sending email verification:", error);
//     });
// }

// // Function to re-authenticate user
// export async function reauthenticateUser(user: User) {
//   const credential = EmailAuthProvider.credential(user.email, "currentPassword");

//   try {
//     await reauthenticateWithCredential(user, credential);
//     console.log("User re-authenticated.");
//   } catch (error) {
//     console.error("Error re-authenticating user:", error);
//   }
// }

// // Function to update user email
// export function updateUserEmail(newEmail: string, user: User) {
//   updateEmail(user, newEmail)
//     .then(() => {
//       console.log("User email updated.");
//       sendVerificationEmail(user);
//     })
//     .catch((error) => {
//       console.error("Error updating email:", error);
//     });
// }

// // Function to send password reset email
// export function sendPasswordReset(user: User) {
//   sendPasswordResetEmail(auth, user.email)
//     .then(() => {
//       console.log("Password reset email sent!");
//     })
//     .catch((error) => {
//       console.error("Error sending password reset email:", error);
//     });
// }