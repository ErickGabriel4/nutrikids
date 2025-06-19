let todosCardapios = [];

    document.addEventListener("DOMContentLoaded", () => {
      const hoje = new Date();
      const hojeInput = hoje.toISOString().split("T")[0]; // formato YYYY-MM-DD
      document.getElementById("dataBusca").value = hojeInput;

      const [ano, mes, dia] = hojeInput.split("-");
      const hojeFormatado = `${dia}/${mes}/${ano}`;

      fetch("assets/cardapio.json")
        .then(res => res.json())
        .then(data => {
          todosCardapios = data;
          buscarCardapio(hojeFormatado);
        })
        .catch(err => console.error("Erro ao carregar cardápios:", err));
    });

    function buscarCardapio(dataManual = null) {
      let dataInput = dataManual;
      if (!dataManual) {
        const valorInput = document.getElementById("dataBusca").value;
        if (!valorInput) return;
        const [ano, mes, dia] = valorInput.split("-");
        dataInput = `${dia}/${mes}/${ano}`;
      }

      const filtrado = todosCardapios.filter(item => item.data === dataInput);
      mostrarCardapios(filtrado);
    }

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