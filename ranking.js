// Inport Ranking
import { db } from "./firebase.js";

import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// 10 Jogadores com maior ponto
const listaRanking = document.getElementById("listaRanking");

const rankingRef = collection(db, "ranking");

const consulta = query(
  rankingRef,
  orderBy("pontos", "desc"),
  limit(10)
);

// Fazer ele aparecer na tela
onSnapshot(consulta, function(resultado) {

  listaRanking.innerHTML = "";

  resultado.forEach(function(documento) {

    const jogador = documento.data();

    const item = document.createElement("li");

    item.textContent = jogador.nome + " — " + jogador.pontos + " pontos";

    listaRanking.appendChild(item);

  });

});


