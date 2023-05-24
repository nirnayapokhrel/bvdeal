import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDCKSgdybt_ibKRUgCEKYjnvDqCOMieFVk",
  authDomain: "bvdeal.firebaseapp.com",
  projectId: "bvdeal",
  storageBucket: "bvdeal.appspot.com",
  messagingSenderId: "358953099184",
  appId: "1:358953099184:web:eaad28272603acd4670075",
  measurementId: "G-S346Z0G8WV"
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }

    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BFrHuSpoFT-FIMJMSGV6jPQ6KZLg1uZ2n-lwQHlDvQ2AfSotFijRzGeAAIPvLNcfHRGA-oRehXjxBfWyQI8lWBk",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
