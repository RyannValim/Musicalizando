const menu = document.querySelectorAll('nav a'); // Seleciona o menu inteiro.

// Faz com que cada item do menu, ao ser clicado, seja direcionado para o seu conteúdo.
menu.forEach(link =>{
    link.addEventListener('click', event =>{
        event.preventDefault();
        
        const href = link.getAttribute('href');
        const alvo = document.querySelector(href);

        // Quando for clicado, cada link do menu será acessado com uma rolagem suave.
        if(alvo){
            window.scroll({
                top: alvo.offsetTop -20,
                behavior: 'smooth'
            });
        }
    });
});

// Garante que toda vez que um item do menu for acionado, o eixo Y terá a rolagem feita de modo que encaixe no centro da tela o menu acionado e esconda o que estava acima/abaixo.
window.addEventListener('scroll', () =>{
    if(window.scrollY > 100) {
        menu.forEach(link =>{
            link.classList.add('shrink');
        });
    } else {
        menu.forEach(link =>{
            link.classList.remove('shrink');
        });
    }
});