// Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// API Key
const firebaseConfig = {
  apiKey: "AIzaSyBQ-BT8tbvUzCP0KJm4ytni_4_MN-dpwQo",
  authDomain: "meu-app-c3b07.firebaseapp.com",
  projectId: "meu-app-c3b07",
  storageBucket: "meu-app-c3b07.firebasestorage.app",
  messagingSenderId: "763123346552",
  appId: "1:763123346552:web:3f687c07b3b2248f10518d",
  measurementId: "G-4WPMXTWVX9"
};

// Inicializacao
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportaçao
export { auth, db };