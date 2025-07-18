// Gerenciamento de feedback
const btnFeed = document.getElementById('btnFeed'); 
const btnEnviarFdbck = document.getElementById('btnEnviarFdbck');
const btnSairFdbck = document.getElementById('btnSairFdbck');
const formFeedback = document.getElementById('formFeedback');
const feedbackMensagem = document.getElementById('feedbackMensagem');

btnFeed.onclick = function () {
    document.getElementById('feed').showModal();
};

let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

btnEnviarFdbck.onclick = (e) => {
    e.preventDefault();

    const msgErro = document.querySelector('.erro');
    if (msgErro) msgErro.remove();

    const newsletter = document.getElementById('newsletterCheckbox').checked;
    const gostou = document.querySelector('input[name="gostouPlaylist"]:checked')?.value || 'não informado';
    const sugestao = document.getElementById('melhorias').value;

    const novoFeedback = { newsletter, gostou, sugestao };

    feedbacks.push(novoFeedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    feedbackMensagem.textContent = 'Obrigado pelo seu feedback!';
    feedbackMensagem.style.display = 'block';
    formFeedback.reset();
};

btnSairFdbck.onclick = function () {
    document.getElementById('feed').close();
};

// Gerenciamento de músicas favoritas
let dadosFavoritas = JSON.parse(localStorage.getItem('dadosFavoritas')) || [];
let editarFavoritas = -1;

document.getElementById("formFavoritas").addEventListener('submit', (e) => {
    e.preventDefault();

    const genero = document.getElementById('gen').value;
    const musica = document.getElementById('nomeMusica').value;
    const artista = document.getElementById('nomeArtista').value;
    const tempo = document.getElementById('tempoMusica').value;
    const link = document.getElementById('linkMusica').value;

    const favPlayList = { genero, musica, artista, tempo, link };

    if (editarFavoritas === -1) {
        dadosFavoritas.push(favPlayList);
    } else {
        dadosFavoritas[editarFavoritas] = favPlayList;
        editarFavoritas = -1;
    }

    localStorage.setItem('dadosFavoritas', JSON.stringify(dadosFavoritas));
    window.location.href = "./index.html";
});

function atualizarTabelaFavoritas() {
    const tbody = document.querySelector("#tabelaPlayList tbody");
    tbody.innerHTML = '';

    dadosFavoritas.forEach((favPlayList, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${favPlayList.musica}</td>
            <td>${favPlayList.artista}</td>
            <td>${favPlayList.genero}</td>
            <td>${favPlayList.tempo}</td>
            <td>
                <a href="#" onclick="abrirMusica('${favPlayList.link}')">Ouvir</a>
                <a href="#" onclick="removerMusica(${index})" style="color: #e37171;">Excluir</a>
                <a href="#" onclick="editarMusica(${index})" style="color: #4CAF50;">Editar</a>
            </td>
        `;
        tbody.appendChild(linha);
    });
}

function abrirMusica(link) {
    if (link) {
        window.open(link, '_blank');
    } else {
        alert("Link não disponível para esta música.");
    }
}

function removerMusica(id) {
    dadosFavoritas.splice(id, 1);
    localStorage.setItem('dadosFavoritas', JSON.stringify(dadosFavoritas));
    atualizarTabelaFavoritas();
}

function editarMusica(id) {
    const favPlayList = dadosFavoritas[id];
    document.getElementById('gen').value = favPlayList.genero;
    document.getElementById('nomeMusica').value = favPlayList.musica;
    document.getElementById('nomeArtista').value = favPlayList.artista;
    document.getElementById('tempoMusica').value = favPlayList.tempo;
    document.getElementById('linkMusica').value = favPlayList.link;

    editarFavoritas = id;
    const btnSalvar = document.getElementById('btnSalvar');
    btnSalvar.innerText = "Salvar";
    btnSalvar.style.backgroundColor = "#4CAF50";
}

window.onload = atualizarTabelaFavoritas;

// Gerenciamento de artistas favoritos
let dadosArtistas = JSON.parse(localStorage.getItem('dadosArtistas')) || [];
let editarArtistas = -1;

document.getElementById("formFavArts").addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nomeArt').value;
    const nascimento = document.getElementById('anoNascimento').value;
    const musicaMaisFamosa = document.getElementById('nomeMusicaFamosa').value;

    const artistaFav = { nome, nascimento, musicaMaisFamosa };

    if (editarArtistas === -1) {
        dadosArtistas.push(artistaFav);
    } else {
        dadosArtistas[editarArtistas] = artistaFav;
        editarArtistas = -1;
    }

    localStorage.setItem('dadosArtistas', JSON.stringify(dadosArtistas));
    window.location.href = "./index.html";
});

function atualizarTabelaArtistas() {
    const tbody = document.querySelector("#tabelaArtista tbody");
    tbody.innerHTML = '';

    dadosArtistas.forEach((artistaFav, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${artistaFav.nome}</td>
            <td>${artistaFav.nascimento}</td>
            <td>${artistaFav.musicaMaisFamosa}</td>
            <td>
                <a href="#" onclick="removerArtista(${index})" style="color: #e37171;">Excluir</a>
                <a href="#" onclick="editarArtista(${index})" style="color: #4CAF50;">Editar</a>
            </td>
        `;
        tbody.appendChild(linha);
    });
}

function removerArtista(id) {
    dadosArtistas.splice(id, 1);
    localStorage.setItem('dadosArtistas', JSON.stringify(dadosArtistas));
    atualizarTabelaArtistas();
}

function editarArtista(id) {
    const artistaFav = dadosArtistas[id];
    document.getElementById('nomeArt').value = artistaFav.nome;
    document.getElementById('anoNascimento').value = artistaFav.nascimento;
    document.getElementById('nomeMusicaFamosa').value = artistaFav.musicaMaisFamosa;

    editarArtistas = id;
    const btnSalvarArtista = document.getElementById('btnSalvarArtista');
    btnSalvarArtista.innerText = "Salvar";
    btnSalvarArtista.style.backgroundColor = "#4CAF50";
}

// Inicialização da tabela de artistas ao carregar a página
window.onload = function () {
    atualizarTabelaFavoritas();
    atualizarTabelaArtistas();
};
