
// Import Ferramentas
import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// Buscar pontos no banco de dados
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

// Elementos da página
const click = document.getElementById("click");
const textPonts = document.getElementById("ponts");

let pontos = 0;

// Carregar pontos do ranking
onAuthStateChanged(auth, async function(usuario) {
  if (usuario) {
    const referenciaRanking = doc(db, "ranking", usuario.uid);
    const resultado = await getDoc(referenciaRanking);

    if (resultado.exists()) {
      pontos = resultado.data().pontos || 0;
      textPonts.textContent = "Pontos: " + pontos;
    }
  }
});

// Salvar pontos
click.addEventListener("click", async function() {

  const usuario = auth.currentUser;

  if (!usuario) {
    alert("Entre com Google primeiro!");
    return;
  }

  pontos = pontos + 1;

  textPonts.textContent = "Pontos: " + pontos;

  try {
    const referenciaRanking = doc(db, "ranking", usuario.uid);
    const dadosRanking = await getDoc(referenciaRanking);

    const nomeCompleto = usuario.displayName || "Jogador";

    const primeiroNome = nomeCompleto
      .replace(/[0-9._-]/g, " ")
      .trim()
      .split(/\s+/)[ 0 ];

    if (dadosRanking.exists()) {

      await setDoc(referenciaRanking, {
        pontos: pontos
      }, { merge: true });

    } else {

      await setDoc(referenciaRanking, {
        nome: primeiroNome || "Jogador",
        pontos: pontos
      });

    }

  } catch (erro) {
    console.log(erro);
    alert("Não foi possível salvar os pontos!");
  }

});
