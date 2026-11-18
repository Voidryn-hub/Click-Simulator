// Import Ferramentas
import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// Buscar pontos no banco de dados
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

//
const click = document.getElementById("click");
const textPonts = document.getElementById("ponts");

let pontos = 0;

//
onAuthStateChanged(auth, async function(usuario) {
  if (usuario) {
    const referencia = doc(db, "users", usuario.uid);
    const resultado = await getDoc(referencia);

    if (resultado.exists()) {
      pontos = resultado.data().pontos;
      textPonts.textContent = "Pontos: " + pontos;
    }
  }
});

// Save ponts
click.addEventListener("click", async function() {

  const usuario = auth.currentUser;

  if (!usuario) {
    alert("Entre com Google primeiro!");
    return;
  }

  pontos = pontos + 1;

  textPonts.textContent = "Pontos: " + pontos;

  try {
    const referencia = doc(db, "users", usuario.uid);
    const referenciaRanking = doc(db, "ranking", usuario.uid);

    await setDoc(referencia, {
      pontos: pontos
    });

    const nomeCompleto = usuario.displayName || "Jogador";

    const primeiroNome = nomeCompleto
      .replace(/[0-9._-]/g, " ")
      .trim()
      .split(/\s+/)[ 0 ];

    await setDoc(referenciaRanking, {
      nome: primeiroNome || "Jogador",
      pontos: pontos
    });
  } catch (erro) {
    console.log(erro);
    alert("Não foi possível salvar os pontos!");
  }

});