import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC92gZkTBn5gu3gTGFzDor7nHKIsAIel4A",
  authDomain: "nutrikids-ca9e4.firebaseapp.com",
  databaseURL: "https://nutrikids-ca9e4-default-rtdb.firebaseio.com",
  projectId: "nutrikids-ca9e4",
  storageBucket: "nutrikids-ca9e4.appspot.com",
  messagingSenderId: "1086157863563",
  appId: "1:1086157863563:web:5ec7f578904ba48ebab28e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const cardapiosRef = collection(db, "cardapio");

let todosCardapios = [];

async function carregarCardapios() {
  const querySnapshot = await getDocs(cardapiosRef);
  todosCardapios = [];
  querySnapshot.forEach(docSnap => {
    todosCardapios.push({ id: docSnap.id, ...docSnap.data() });
  });

  const hoje = new Date();
  const [ano, mes, dia] = hoje.toISOString().split("T")[0].split("-");
  document.getElementById("dataBusca").value = `${ano}-${mes}-${dia}`;
  buscarCardapio(`${dia}/${mes}/${ano}`);
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

window.buscarCardapio = function (dataManual = null) {
  let dataInput = dataManual;
  if (!dataManual) {
    const valorInput = document.getElementById("dataBusca").value;
    if (!valorInput) return;
    const [ano, mes, dia] = valorInput.split("-");
    dataInput = `${dia}/${mes}/${ano}`;
  }
  const filtrado = todosCardapios.filter(item => item.data === dataInput);
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
