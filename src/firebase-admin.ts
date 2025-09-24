import {initializeApp, getApps, getApp, App, cert} from "firebase-admin/app";
import { getFirestore} from "firebase-admin/firestore";


  const serviceKeyString = Buffer.from(
    process.env.FIREBASE_SERVICE_KEY as string,
    "base64"
  ).toString("utf8");
  const serviceKey = JSON.parse(serviceKeyString);

let app: App
if(getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey)
    }) 
} else {
    app = getApp()
}

const adminDb = getFirestore(app);
export {app as adminApp, adminDb}