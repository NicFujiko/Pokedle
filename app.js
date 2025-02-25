let tentativas = 1;

let pokemonsIniciais = [
    { nome: "Bulbasaur", geracao: 1, tipo: "Planta/Venenoso" },
    { nome: "Charmander", geracao: 1, tipo: "Fogo" },
    { nome: "Squirtle", geracao: 1, tipo: "Água" },
    
    { nome: "Chikorita", geracao: 2, tipo: "Planta" },
    { nome: "Cyndaquil", geracao: 2, tipo: "Fogo" },
    { nome: "Totodile", geracao: 2, tipo: "Água" },
    
    { nome: "Treecko", geracao: 3, tipo: "Planta" },
    { nome: "Torchic", geracao: 3, tipo: "Fogo" },
    { nome: "Mudkip", geracao: 3, tipo: "Água" },
    
    { nome: "Turtwig", geracao: 4, tipo: "Planta" },
    { nome: "Chimchar", geracao: 4, tipo: "Fogo" },
    { nome: "Piplup", geracao: 4, tipo: "Água" },
    
    { nome: "Snivy", geracao: 5, tipo: "Planta" },
    { nome: "Tepig", geracao: 5, tipo: "Fogo" },
    { nome: "Oshawott", geracao: 5, tipo: "Água" },
    
    { nome: "Chespin", geracao: 6, tipo: "Planta" },
    { nome: "Fennekin", geracao: 6, tipo: "Fogo" },
    { nome: "Froakie", geracao: 6, tipo: "Água" },
    
    { nome: "Rowlet", geracao: 7, tipo: "Planta/Voador" },
    { nome: "Litten", geracao: 7, tipo: "Fogo" },
    { nome: "Popplio", geracao: 7, tipo: "Água" },
    
    { nome: "Grookey", geracao: 8, tipo: "Planta" },
    { nome: "Scorbunny", geracao: 8, tipo: "Fogo" },
    { nome: "Sobble", geracao: 8, tipo: "Água" },

    { nome: "Sprigatito", geracao: 9, tipo: "Planta" },
    { nome: "Fuecoco", geracao: 9, tipo: "Fogo" },
    { nome: "Quaxly", geracao: 9, tipo: "Água" }
];


// Sorteia um Pokémon aleatório dentre os informados na lista.
function escolherPokemonAleatorio() {
    let indiceAleatorio = Math.floor(Math.random() * pokemonsIniciais.length);
    return pokemonsIniciais[indiceAleatorio];
}


// Define que a variável "pokemonSecreto" seja o Pokémon aleatorizado anteriormente e exibe no console
let pokemonSecreto = escolherPokemonAleatorio();


// Exibe o título do jogo
function exibirTextoNaTela(tag, texto){
     let campo = document.querySelector(tag);
     campo.innerHTML = texto;
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Quem é esse Pokémon?');
    exibirTextoNaTela('p', 'Chute um Pokémon inicial:');
}

exibirMensagemInicial();


// Permite chutar ao pressioner Enter
document.querySelector('#inputChute').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        verificarChute();
    }
});


function verificarChute(){
    // Aloca o valor do chute, sem espaços no começo ou no final
    let chute = document.querySelector('#inputChute').value.trim();
    // Permite verificar o chute mesmo independente se o texto ter letras maiusculas ou minúsculas
    let pokemonChutado = pokemonsIniciais.find(p => p.nome.toLowerCase() === chute.toLowerCase());


    if (pokemonChutado) {

        // Verifica se o chute está correto
        if (pokemonChutado.nome === pokemonSecreto.nome) {
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativa = `Você descobriu o Pokémon com ${tentativas} ${palavraTentativa}.`;
            exibirTextoNaTela('h1', 'Acertou!');
            exibirTextoNaTela('p', mensagemTentativa);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } 
        else {

            // Verifica se é do mesmo tipo
            if (pokemonChutado.tipo === pokemonSecreto.tipo) {
                mensagemTipo = 'O Pokémon escolhido é do mesmo tipo'
            } 
            else {
                mensagemTipo = 'O Pokémon escolhido é de um tipo diferente';
            }

            // Verifica se é da mesma geração
            if (pokemonChutado.geracao === pokemonSecreto.geracao) {
                mensagemGeracao =  'e da mesma geração.';
            } 
            else {
                mensagemGeracao = 'e de uma geração diferente.';
            }

            // Exibe a mensagem
            exibirTextoNaTela('p', mensagemTipo + '<br>' + mensagemGeracao);
        }
    } 
    
    // Caso o texto tenha sido escrito errado
    else {
        exibirTextoNaTela('p', 'Pokémon não encontrado. Tente novamente.');
    }
        limparCampo();
        tentativas++
}

// Limpa o input depois do usuário ter feito um chute
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

// Reinicia o jogo
function reiniciarJogo() {
    tentativas = 1;
    exibirMensagemInicial();

    // Escolhe um novo Pokémon secreto
    let pokemonSecreto = escolherPokemonAleatorio();

    // Limpa o input e a mensagem anterior
    document.querySelector('#inputChute').value = '';
    exibirMensagemInicial(); 
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}