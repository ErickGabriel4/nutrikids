import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getFirestore, collection, getDocs
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC92gZkTBn5gu3gTGFzDor7nHKIsAIel4A",
  authDomain: "nutrikids-ca9e4.firebaseapp.com",
  projectId: "nutrikids-ca9e4",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const cardapiosRef = collection(db, "cardapio");

let todosCardapios = [];

async function carregarCardapios() {
  const querySnapshot = await getDocs(cardapiosRef);
  todosCardapios = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const hoje = new Date();
  const [ano, mes, dia] = hoje.toISOString().split("T")[0].split("-");
  document.getElementById("dataBusca").value = `${ano}-${mes}-${dia}`;
  buscarCardapio(`${dia}/${mes}/${ano}`);
}

window.addEventListener("DOMContentLoaded", carregarCardapios);

window.buscarCardapio = function (dataManual = null) {
  let dataInput = dataManual;
  if (!dataManual) {
    const valorInput = document.getElementById("dataBusca").value;
    if (!valorInput) return;
    const [ano, mes, dia] = valorInput.split("-");
    dataInput = `${dia}/${mes}/${ano}`;
  }
  const filtrado = todosCardapios.filter(c => c.data === dataInput);
  mostrarCardapios(filtrado);
};

function mostrarCardapios(cardapios) {
  const container = document.getElementById("cardapio-container");
  container.innerHTML = "";
  if (cardapios.length === 0) {
    container.innerHTML = "<p>Nenhum cardápio encontrado para esta data.</p>";
    return;
  }
  cardapios.forEach(dia => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${dia.data}</h3>
      <p><strong>Café da manhã:</strong> ${dia.cafe}</p>
      <p><strong>Almoço:</strong> ${dia.almoco}</p>
      <p><strong>Lanche:</strong> ${dia.lanche}</p>
    `;
    container.appendChild(card);
  });
}
