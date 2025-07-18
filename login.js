const btnLogin = document.getElementById('btnLogin');
const btnSair = document.getElementById('btnSair');

btnLogin.onclick = function () { login.showModal(); };
btnSair.onclick = function () { 
    login.close(); 

    let msgErro = document.querySelector('.erro');
    if (msgErro) msgErro.remove();
};

const login = document.getElementById('login');
const formLogin = document.querySelector("#login form");

let usuarioMaster = [
    {nome: 'master', email: 'master@email.com', senha: 'master'},
    {nome: 'Christian', email: 'christian@email.com', senha: '1234'},
    {nome: 'Ryann', email: 'ryann@email.com', senha: '4321'}
];

formLogin.addEventListener('submit', evento => {
    evento.preventDefault(); // Impede o envio do formulário

    let msgErro = document.querySelector('.erro');
    if (msgErro) msgErro.remove();

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    let loginSucesso = false;

    usuarioMaster.forEach(usuario => {
        if (email === usuario.email && senha === usuario.senha) {
            sessionStorage.setItem('usuarioLogado', true);
            sessionStorage.setItem('nomeUsuario', usuario.nome);

            loginSucesso = true;

            window.location.href = "./usuario/index.html";
        }
    });

    if (!loginSucesso) {
        let erro = document.createElement('p');
        erro.classList.add("erro");
        erro.innerText = "Login ou senha inválidos!";
        login.insertBefore(erro, login.firstChild);
        formLogin.reset();
    }
});

//Tabela de Playlist Mês

let dados = JSON.parse(localStorage.getItem('dados')) || [];

let musica = document.getElementById('nomeMusica');
let artistaBand = document.getElementById('nomeArtisBand');
let albumSin = document.getElementById('nomeAlbumSin');
let ano = document.getElementById('anoMusica');
let editar = -1;

document.getElementById("formPlayMes").addEventListener('submit', e =>{
    e.preventDefault();

    const PlayMes = {
        musica: musica.value,
        artistaBand: artistaBand.value,
        albumSin: albumSin.value,
        ano: ano.value
    };

    if (editar === -1) {
        dados.push(PlayMes);
    } else {
        dados[editar] = PlayMes;
        editar = -1;
    }

    localStorage.setItem('dados', JSON.stringify(dados));

    window.location.href = "./index.html";

    const btnSalvar = document.getElementById('btnSalvar');
    btnSalvar.innerText = "Cadastrar";
    btnSalvar.style.backgroundColor = "";
});

function atualizarTabela() {
    const tbody = document.querySelector("#tabelaPlayList tbody");
    dados.forEach( (PlayMes, chave) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${favPlayList.musica}</td>
            <td>${favPlayList.artistaBand}</td>
            <td>${favPlayList.albumSin}</td>
            <td>${favPlayList.ano}</td>
            <td>
                <a href="#" onclick="removerMusica(${chave})" style="color: #e37171;">Excluir</a>
                <a href="#" onclick="editarMusica(${chave})" style="color: #4CAF50;">Editar</a>
            </td>
        `;
        tbody.appendChild(linha);
    });
}

function removerMusica(id) {
    dados.splice(id, 1);
    localStorage.setItem('dados', JSON.stringify(dados));
    window.location.reload();
}


function editarMusica(id) {
    const PlayMes = dados[id];
    genero.value = PlayMes.musica;
    musica.value = PlayMes.artistaBand;
    artista.value = PlayMes.albumSin;
    tempo.value = PlayMes.ano;

    editar = id;
    const btnSalvar = document.getElementById('btnSalvar');
    btnSalvar.innerText = "Salvar";
    btnSalvar.style.backgroundColor = "#4CAF50";
}
