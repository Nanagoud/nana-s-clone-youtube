import {initializeApp, getApps, getApp, App, cert} from "firebase-admin/app";
import { getFirestore} from "firebase-admin/firestore";


const sericeKey = require('./service_key.json');

let app: App
if(getApps().length === 0) {
    app = initializeApp({
        credential: cert(sericeKey)
    }) 
} else {
    app = getApp()
}

const adminDb = getFirestore(app);
export {app as adminApp, adminDb}