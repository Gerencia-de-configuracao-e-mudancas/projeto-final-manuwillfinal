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

    const characterForm = document.getElementById('characterForm');

    if (characterForm) {
        characterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Criar objeto com os dados do personagem
            const characterData = {
                // Informações Básicas
                name: document.getElementById('charName').value,
                race: document.getElementById('charRace').value,
                class: document.getElementById('charClass').value,
                age: document.getElementById('charAge').value,
                gender: document.getElementById('charGender').value,
                height: document.getElementById('charHeight').value,
                weight: document.getElementById('charWeight').value,

                // Atributos
                attributes: {
                    strength: document.getElementById('attrStr').value,
                    dexterity: document.getElementById('attrDex').value,
                    constitution: document.getElementById('attrCon').value,
                    intelligence: document.getElementById('attrInt').value,
                    wisdom: document.getElementById('attrWis').value,
                    charisma: document.getElementById('attrCha').value
                },

                // Combate
                combat: {
                    hp: document.getElementById('charHP').value,
                    mp: document.getElementById('charMP').value,
                    defense: document.getElementById('charDef').value,
                    initiative: document.getElementById('charInit').value
                },

                // História
                background: document.getElementById('charBackground').value,
                alignment: document.getElementById('charAlignment').value,
                motivation: document.getElementById('charMotivation').value,
                weaknesses: document.getElementById('charWeaknesses').value
            };

            // Salvar no localStorage
            const characters = JSON.parse(localStorage.getItem('characters') || '[]');
            characters.push(characterData);
            localStorage.setItem('characters', JSON.stringify(characters));

            // Redirecionar para a página inicial
            alert('Personagem criado com sucesso!');
            window.location.href = 'index.html';
        });
    }
});
