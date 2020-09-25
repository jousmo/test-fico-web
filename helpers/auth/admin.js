import * as firebaseAdmin from "firebase-admin"

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      private_key: process.env.NEXT_PUBLIC_FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.NEXT_PUBLIC_FB_CLIENT_EMAIL,
      project_id: process.env.NEXT_PUBLIC_FB_PROJECT_ID
    }),
    databaseURL: process.env.NEXT_PUBLIC_FB_DATABASE_URL
  })
}

export { firebaseAdmin }
