import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc
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
  atualizarTabelaCardapios();
}

window.addEventListener("DOMContentLoaded", () => {
  carregarCardapios();
  document.getElementById("formCardapio").addEventListener("submit", salvarCardapio);
});

async function salvarCardapio(e) {
  e.preventDefault();
  const dataInput = document.getElementById("data").value;
  const [ano, mes, dia] = dataInput.split("-");
  const dataFormatada = `${dia}/${mes}/${ano}`;

  const novo = {
    data: dataFormatada,
    cafe: document.getElementById("cafe").value,
    almoco: document.getElementById("almoco").value,
    lanche: document.getElementById("lanche").value
  };

  const existente = todosCardapios.find(c => c.data === dataFormatada);
  if (existente) {
    await setDoc(doc(db, "cardapio", existente.id), novo);
  } else {
    await addDoc(cardapiosRef, novo);
  }

  alert("Cardápio salvo com sucesso!");
  e.target.reset();
  setTimeout(carregarCardapios, 500);
}

function atualizarTabelaCardapios() {
  const corpo = document.getElementById("tabelaCardapios");
  corpo.innerHTML = "";
  todosCardapios.forEach((cardapio) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cardapio.data}</td>
      <td>${cardapio.cafe}</td>
      <td>${cardapio.almoco}</td>
      <td>${cardapio.lanche}</td>
      <td><button onclick="excluirCardapio('${cardapio.id}')">Excluir</button></td>
    `;
    corpo.appendChild(tr);
  });
}

window.excluirCardapio = async function (id) {
  if (confirm("Deseja realmente excluir este cardápio?")) {
    await deleteDoc(doc(db, "cardapio", id));
    setTimeout(carregarCardapios, 500);
  }
};
