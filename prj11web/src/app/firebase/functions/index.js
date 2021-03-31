// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const functions = require("firebase-functions");

const admin  = require("firebase-admin");
const { user } = require("firebase-functions/lib/providers/auth");
admin.initializeApp();

exports.getAuthUsers = functions.https.onCall((data, context) => {
    return admin.auth().listUsers(100);
});

exports.getUserById = functions.https.onCall((data, context) => {
   return admin.auth().getUser(data.uid);
});

exports.getUserByEmail = functions.https.onCall((data, context) => {
   return admin.auth().getUserByEmail(data.email);
});

exports.addProviderRole = functions.https.onCall((data, context)=>{
   let uid;
   return admin.auth().getUserByEmail(data.email).then(user => {
      uid = user.uid;
      return admin.auth().setCustomUserClaims(user.uid, {provider: true});
   }).then(() => {
      return admin.auth().getUser(uid);
   }).then((userRecord) => {
      return admin.auth().getUser(uid);
   }).catch(err => {
       return err;
   })
});

exports.addAdminRole = functions.https.onCall((data, context)=>{
   let uid;
   return admin.auth().getUserByEmail(data.email).then(user => {
      uid = user.uid;
      return admin.auth().setCustomUserClaims(user.uid, {admin: true});
   }).catch(err => {
       return err;
   })
});

exports.getUserClaims = functions.https.onCall((data, context)=>{
   return admin.auth().getUserByEmail(data.email).then(user => {
      console.log(user);
      return admin.auth().getUser(user.uid);
   });
});
