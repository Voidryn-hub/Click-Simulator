// Imports
import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import { auth } from "./firebase.js";

// Funcao Login
const botaoLogin = document.getElementById("loginGoogle");

const provedorGoogle = new GoogleAuthProvider();

botaoLogin.addEventListener("click", async function() {
  try {
    const resultado = await signInWithPopup(auth, provedorGoogle);

    alert("Bem-vindo, " + resultado.user.displayName);

  } catch (erro) {
    console.log(erro);
    alert("Erro ao entrar com Google!");
  }
});