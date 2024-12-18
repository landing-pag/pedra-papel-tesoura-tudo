let elementos = [];
let elementoAtual = "pedra"; // Começa com pedra
let pontos = 0;

// Carrega o JSON
fetch("elementos.json")
  .then(response => response.json())
  .then(data => {
    elementos = data;
    atualizarElementoAtual();
    atualizarPontuacao();
  })
  .catch(error => console.error("Erro ao carregar o JSON:", error));

// Atualiza o texto do elemento atual na interface
function atualizarElementoAtual() {
  document.querySelector(".elemento-atual").textContent = elementoAtual.toUpperCase();
}


// Atualiza a pontuação na interface
function atualizarPontuacao() {
  document.getElementById("pontuacao").textContent = pontos;
}

// Mostra a tela de game over
function mostrarGameOver() {
  const telaGameOver = document.createElement("div");
  telaGameOver.className = "game-over";
  telaGameOver.innerHTML = `
    <div class="text-center">
      <h2 class="text-danger">Game Over!</h2>
      <p class="fs-5">Sua pontuação final: ${pontos}</p>
      <button class="btn btn-primary" id="reiniciar">Recomeçar</button>
    </div>
  `;
  document.body.appendChild(telaGameOver);

  // Desativa o input e botão
  document.getElementById("entrada").disabled = true;
  document.getElementById("enviar").disabled = true;

  // Adiciona evento para o botão de reiniciar
  document.getElementById("reiniciar").addEventListener("click", () => {
    telaGameOver.remove();
    reiniciarJogo();
  });
}

// Reinicia o jogo
function reiniciarJogo() {
  pontos = 0;
  elementoAtual = "pedra";
  atualizarElementoAtual();
  atualizarPontuacao();

  // Reativa o input e o botão
  document.getElementById("entrada").disabled = false;
  document.getElementById("enviar").disabled = false;

  // Limpa o campo de entrada
  document.getElementById("entrada").value = "";
}

// Adiciona evento ao botão de envio
document.getElementById("enviar").addEventListener("click", () => {
  const entradaJogador = document.getElementById("entrada").value.toLowerCase();
  jogarRodada(entradaJogador);
});

function jogarRodada(escolhaJogador) {
  const escolhaNormalizada = escolhaJogador.toLowerCase(); // Converte a entrada para minúsculas
  const jogador = elementos.find(e => e.nome === escolhaNormalizada);
  const atual = elementos.find(e => e.nome === elementoAtual);

  if (!jogador) {
    alert("Elemento inválido!<br>Corrija a acentuação e sem espaços");
    return;
  }

  if (jogador.força.includes(elementoAtual)) {
    pontos++;
    elementoAtual = escolhaNormalizada;
    atualizarElementoAtual();
    atualizarPontuacao();
  } else {
    mostrarGameOver();
  }

  // Limpa o campo de entrada
  document.getElementById("entrada").value = "";
}
