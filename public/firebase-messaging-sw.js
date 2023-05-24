import { firebaseConfigData } from "../src/utils/staticCredential";

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDCKSgdybt_ibKRUgCEKYjnvDqCOMieFVk",
  authDomain: "bvdeal.firebaseapp.com",
  projectId: "bvdeal",
  storageBucket: "bvdeal.appspot.com",
  messagingSenderId: "358953099184",
  appId: "1:358953099184:web:eaad28272603acd4670075",
  measurementId: "G-S346Z0G8WV"
}

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
