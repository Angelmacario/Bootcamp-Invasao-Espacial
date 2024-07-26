// Referência de Variáveis

const botaoIniciar = document.getElementById("iniciar");
const cenario = document.getElementById("cenario");
const nave = document.getElementById("nave");
const vida = document.getElementById("vida");
const pontos = document.getElementById("pontos");

//add audio
const audioJogo = new Audio("missaoespaco.mp3")

//largura e altura dos elementos
//NÃO VAMOS MEXER NOS VALORES NO CONST
const larguraCenario =  cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;

const larguraNave =  nave.offsetWidth;
const alturaNave = nave.offsetHeight;

const velocidadeNave = 15;
const velocidadeTiro = 20;
const velocidadeNaveInimiga = 5;

//ESSAS MUDAM DE VALORES NO DECORRER DO JOGO
let estaAtirando = false;
let vidaAtual = 100;
let tiroAtual = 0;
let pontosAtual = 0;

let checaMoveNaveInimigas;
let checaNaveInimigas;
let checaMoveTiros;
let checaMoveNave;
let checaColisao;
let checaTiros;

let posicaoHorizontal = larguraCenario / 2 - 50;
let posicaoVertical = larguraCenario - alturaNave;
let direcaoHorizontal = 0;
let direcaoVertical = 0;

//MENSAGENS NO CONSOLE DO NAVEGADOR:

// console.log('Bem vindo')
// console.error('Esse é um erro')
// console.warn('Alerta')
// console.info('Você fez Download')

//Funções para eventos 
//a ho
const teclaPressionada = (tecla) => {
    if (tecla.key === 'ArrowRight'){
        direcaoHorizontal = 1;
    } else if(tecla.key === 'ArrowLeft'){
        direcaoHorizontal = -1;  
    } else if(tecla.key === 'ArrowUp'){
        direcaoVertical = -1;
    } else if(tecla.key === 'ArrowDown'){
        direcaoVertical = 1;
    }
    
};


const teclaSolta = (tecla) => {
    if(tecla.key === 'ArrowRight' || tecla.key === 'ArrowLeft'){
        direcaoHorizontal = 0;
    }else if(tecla.key === 'ArrowUp' || tecla.key === 'ArrowDown'){
        direcaoVertical = 0;
    }
};

//FUNÇÃO DA MOVIMENTAÇÃO DA NAVE
const moveNave = () => {
    posicaoHorizontal += direcaoHorizontal * velocidadeNave;
    posicaoVertical += direcaoVertical * velocidadeNave;

    if(posicaoHorizontal < 0){
        posicaoHorizontal = 0
    }else if(posicaoHorizontal + larguraNave > larguraCenario){
        posicaoHorizontal = larguraCenario - larguraNave
    }

    if(posicaoVertical < 0){
        posicaoVertical = 0
    }else if(posicaoVertical + alturaNave > alturaCenario){
        posicaoVertical = alturaCenario - alturaNave
    } 

    //aplicando css no javascript
    nave.style.left = posicaoHorizontal + "px";
    nave.style.top = posicaoVertical + "px";
} 

const atirar = () =>{
    const delayTiro = Date.now(); //hora e milisegundos
    const atrasoTiro = delayTiro - tiroAtual;

    if(estaAtirando == true && atrasoTiro >= 100){
        tiroAtual = Date.now();
        criarTiros(posicaoHorizontal - 45, posicaoVertical - 10)
    }
//verifica se a tecla espaço está pressionada ou liberada
document.addEventListener("keydown", (tecla) => {
    if (tecla.key === " ") {
        estaAtirando = true;
    }
});

//O evento "keyup" é disparado sempre que uma tecla é liberada.
//(tecla) => {...}: Esta arrow function também recebe um argumento tecla, representando o evento de tecla disparado.
//if (tecla.key === " ") { estaAtirando = false; }: Verifica-se novamente se a tecla liberada é um espaço. 
//Se for, a variável estaAtirando é definida como false. Isso indica que o jogador liberou a tecla espaço, terminando o atiro.
document.addEventListener("keyup", (tecla) => {
    if (tecla.key === " "){
        estaAtirando = false;
    }
})

}


// let create
// elemento pai
// elementos.
//criar a bala de tiro
const criarTiros = (posicaoLeftTiro, posicaoTopTiro) => {
    const tiro = document.createElement("div");
    tiro.className = "tiro";
    tiro.style.position = "absolute";
    tiro.style.width = "10px";
    tiro.style.height = "10px";
    tiro.style.background = "red";
    tiro.style.left = posicaoLeftTiro + "px";
    tiro.style.top = posicaoTopTiro + "px";
    cenario.appendChild(tiro); //adiciona o elemento "tiro" ao elemento cenário 
    audioTiros(); //chama a função para adicionar o áudio
}

const audioTiros = () => {
    const audioDoTiro = document.createElement("audio"); //cria elementos
    audioDoTiro.className = "audiotiro";
    audioDoTiro.setAttribute ("src", "tiro.mp3");
    audioDoTiro.play();
    cenario.appendChild(audioDoTiro);
    audioDoTiro.addEventListener("ended", () => {
        audioDoTiro.remove();
    })
}

//move tiros
const moveTiros = () => {
    const tiros = document.querySelectorAll(".tiro"); //retorna os elementos e parametros de elemento// lista 
    for (let i = 0; i <tiros.length; i++) {
        if (tiros[i]){      // se for verdadeiro, execute o comando abaixo
        let posicaoTopTiro = tiros[i].offsetTop; // vai falar a posição que eu estou/tenho
        posicaoTopTiro -= velocidadeTiro; //estou subitraindo pq quero que ele suba
        tiros[i].style.top = posicaoTopTiro + "px"; //estou mudando a posição do tiro
        if (posicaoTopTiro < -10 ){
            tiros[i].remove(); //remove os tiros quando sai do cenario
           } 
        }
    }
}

//cria naves Inimigas
const naveInimigas = () => {
    const inimigo = document.createElement("div");
    inimigo.className = "inimigo";
    inimigo.style.position = "absolute";
    inimigo.setAttribute("data-vida",5);
    inimigo.style.width = "100px";
    inimigo.style.height = "100px";
    inimigo.style.backgroundImage = "url(enemy.gif)"
    inimigo.style.backgroundPosition = "center";
    inimigo.style.backgroundRepeat = "no-repeat";
    inimigo.style.backgroundSize = "contain";
    inimigo.style.left = Math.floor(Math.random() * (larguraCenario - larguraNave)) + "px"; // vai virar um numero 
    inimigo.style.top = "-100px"
    cenario.appendChild(inimigo);
}

//move tiros
const moveNaveInimiga = () => {
    const naveInimigas = document.querySelectorAll(".inimigo"); //retorna os elementos e parametros de elemento// lista 
    for (let i = 0; i < naveInimigas.length; i++) {
        if  (naveInimigas[i]){      // se for verdadeiro, execute o comando abaixo
        let posicaoTopNaveInimiga = naveInimigas[i].offsetTop; // vai falar a posição que eu estou/tenho (direita e esquerda)
        let posicaoLeftNaveInimiga = naveInimigas[i].offsetLeft; // vai falar a posição que eu estou/tenho
        posicaoTopNaveInimiga += velocidadeNaveInimiga; //estou subitraindo pq quero que ele suba
        naveInimigas[i].style.top = posicaoTopNaveInimiga + "px"; //estou mudando a posição do tiro
        if (posicaoTopNaveInimiga > alturaCenario){
            vidaAtual -= 5;
            vida.textContent = `Vida: ${vidaAtual}`; // juntar uma string + variavel
            explosaoNaveInimigaDestruida(posicaoLeftNaveInimiga);
            if (vidaAtual <= 0 ){ //vida <= 0 zera o jogo e perco
                gameOver();
            }
         naveInimigas[i].remove(); //remove os naveInimigas quando sai do cenario
           } 
        }
    }
}


const colisao = () => {
    const todasNavesInimigas = document.querySelectorAll(".inimigo"); //estou trazendo
    const todosTiros = document.querySelectorAll(".tiro");
    todasNavesInimigas.forEach((naveInimigas) => { //está buscando as inf que quero
        todosTiros.forEach((tiro) => {
            const colisaoNaveInimiga = naveInimigas.getBoundingClientRect(); //posicao
            const colisaoTiro = tiro.getBoundingClientRect();
            const posicaoNaveInimigaLeft = naveInimigas.offsetLeft; //referencia do elemento
            const posicaoNaveInimigaTop = naveInimigas.offsetTop;
            let vidaAtualNaveInimiga = parseInt(naveInimigas.getAttribute("data-vida")); //quanto de vida tem a nave inimiga

            if(colisaoNaveInimiga.left < colisaoTiro.right && // verificando se a nave foi atingida
                colisaoNaveInimiga.right > colisaoTiro.left &&
                colisaoNaveInimiga.top <colisaoTiro.bottom &&
                colisaoNaveInimiga.bottom > colisaoTiro.top ){
                    vidaAtualNaveInimiga -= 1;
                    tiro.remove(); 

                    if(vidaAtualNaveInimiga === 0){
                      pontosAtual += 10;
                      pontos.textContent = `Pontos: ${pontosAtual}`; // juntar uma string + variavel
                      naveInimigas.remove();
                      naveInimigaDestruida(posicaoNaveInimigaLeft, posicaoNaveInimigaTop)
                    }else {
                        naveInimigas.setAttribute("data-vida", vidaAtualNaveInimiga)
                    }
            }
        })
    })
}

//Destruição da nave inimiga
const naveInimigaDestruida = (posicaoLeftNaveInimiga, posicaoTopNaveInimiga) => {
    const naveInimigaDestruida = document.createElement("div");
    naveInimigaDestruida.className = "naveinimigadestruida";
    naveInimigaDestruida.style.position = "absolute";
    naveInimigaDestruida.style.width = "100px";
    naveInimigaDestruida.style.height = "100px";
    naveInimigaDestruida.style.backgroundImage = "url(eliminado.gif)"
    naveInimigaDestruida.style.backgroundPosition = "center";
    naveInimigaDestruida.style.backgroundRepeat = "no-repeat";
    naveInimigaDestruida.style.backgroundSize = "contain";
    naveInimigaDestruida.style.left = posicaoLeftNaveInimiga + "px"; // vai virar um numero 
    naveInimigaDestruida.style.top = posicaoTopNaveInimiga + "-100px"
    cenario.appendChild(naveInimigaDestruida);
    audioExplosoes();
    setTimeout(() => {cenario.removeChild(naveInimigaDestruida);}, 1000);
}

//Explosão da nave inimiga
const explosaoNaveInimigaDestruida = (posicaoLeftNaveInimiga, posicaoTopNaveInimiga) => {
    const explosaoNaveInimiga = document.createElement("div");
    explosaoNaveInimiga.className = "explosaoNaveInimiga";
    explosaoNaveInimiga.style.position = "absolute";
    explosaoNaveInimiga.style.width = "100px";
    explosaoNaveInimiga.style.height = "100px";
    explosaoNaveInimiga.style.backgroundImage = "url(explosao.gif)"
    explosaoNaveInimiga.style.backgroundPosition = "center";
    explosaoNaveInimiga.style.backgroundRepeat = "no-repeat";
    explosaoNaveInimiga.style.backgroundSize = "contain";
    explosaoNaveInimiga.style.left = posicaoLeftNaveInimiga + "px"; // vai virar um numero 
    explosaoNaveInimiga.style.top = (alturaCenario - 100) + "px"
    cenario.appendChild(explosaoNaveInimiga); // vincula ao elemento do HTML
    audioExplosoes();
    setTimeout(() => {cenario.removeChild(explosaoNaveInimiga);}, 1000);
}

//Audio da Explosão
const audioExplosoes = () => {
    const audioExplosaoNaveInimiga = document.createElement("audio");
    audioExplosaoNaveInimiga.className = "audioExplosoes";
    audioExplosaoNaveInimiga.setAttribute("src", "destruido.mp3");
    audioExplosaoNaveInimiga.play();
    cenario.appendChild(audioExplosaoNaveInimiga);
    audioExplosaoNaveInimiga.addEventListener("ended", () => {
        audioExplosaoNaveInimiga.remove();
    })
}

const iniciarJogo = () => {
    document.addEventListener("keydown", teclaPressionada);
    document.addEventListener("keyup", teclaSolta);
    checaMoveNave = setInterval(moveNave, 50); //ativa o evento
    checaMoveTiros = setInterval(moveTiros, 50);
    checaMoveNaveInimigas = setInterval(moveNaveInimiga, 50);
    checaColisao = setInterval(colisao, 10);
    checaNaveInimigas = setInterval(naveInimigas, 2000); // qnt de naves inimigas
    checaTiros = setInterval(atirar, 10);
    botaoIniciar.style.display = "none";
    cenario.style.animation = "animarCenario 10s infinite linear";
    audioJogo.loop = true;
    // audioJogo.play();
}

const gameOver = () => {
    document.removeEventListener("keydown", teclaPressionada);
    document.removeEventListener("keyup", teclaSolta);
    clearInterval(checaMoveNave);
    clearInterval(checaMoveTiros);
    clearInterval(checaMoveNaveInimigas);
    clearInterval(checaColisao);
    clearInterval(checaNaveInimigas);
    clearInterval(checaTiros);
    const perdeu = document.createElement("div");
    perdeu.style.position = "absolute";
    perdeu.innerHTML = "Fim de Jogo"; //criei a frase "Fim de Jogo" internamente no HTML
    perdeu.style.backgroundColor = "black"; // aqui estilizei o perdeu
    perdeu.style.color = "red";
    perdeu.style.left = "50%";// para centralizar a frase
    perdeu.style.top = "50%"; // para centralizar a frase
    perdeu.style.padding = "10px 20px"; // preenchimento ao redor do componente
    perdeu.style.borderRadius = "5px"; // para deixar a bordinha arrendondada
    perdeu.style.transform = "translate(-50%, -50%)"; 
    cenario.appendChild(perdeu);
    cenario.removeChild(nave);

    const naveInimigas = document.querySelectorAll(".inimigo"); //estou trazendo todos os inimigos (nos) e varri os inimigos
    naveInimigas.forEach((inimigo) => {
        inimigo.remove();//posicao
    })

    const todosTiros = document.querySelectorAll(".tiro");
    todosTiros.forEach((tiro) => {
        cenario.removeChild(tiro); //posicao
    })

    audioJogo.loop = false;
    audioJogo.pause();
}






// elementList = document.querySelectorAll("#cenario")
// console.log(elementList)
// console.log(cenario)

// function teclaPressionada(tecla) {}

//NOMES DAS TECLAS NO CONSOLE
// window.addEventListener('keydown', (tecla)=> {
//     console.log(tecla.key)
//     console.log(tecla.keyCode)
// })

//condicionais


