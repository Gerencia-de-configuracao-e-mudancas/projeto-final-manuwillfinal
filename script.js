document.addEventListener('DOMContentLoaded', function() {
    // Obtendo referência dos botões
    const createCharacterButton = document.getElementById('createCharBtn');
    const manualButton = document.getElementById('manualBtn');

    // Adicionando evento de clique para o botão de criar personagem
    createCharacterButton.addEventListener('click', function() {
        window.location.href = 'creation.html';
    });

    // Adicionando evento de clique para o botão do manual
    manualButton.addEventListener('click', function() {
        window.location.href = 'handbook.html';
    });
});
