// Classe para gerenciar a criação de personagem
class CharacterCreation {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const form = document.getElementById('characterForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const character = {
            nome: document.getElementById('charName').value,
            raca: document.getElementById('charRace').value,
            classe: document.getElementById('charClass').value.toLowerCase(),
            idade: parseInt(document.getElementById('charAge').value),
            genero: document.getElementById('charGender').value,
            altura: parseInt(document.getElementById('charHeight').value),
            peso: parseInt(document.getElementById('charWeight').value),
            nivel: 1,
            atributos: {
                forca: parseInt(document.getElementById('attrStr').value) || 10,
                destreza: parseInt(document.getElementById('attrDex').value) || 10,
                constituicao: parseInt(document.getElementById('attrCon').value) || 10,
                inteligencia: parseInt(document.getElementById('attrInt').value) || 10,
                sabedoria: parseInt(document.getElementById('attrWis').value) || 10,
                carisma: parseInt(document.getElementById('attrCha').value) || 10
            },
            combate: {
                pontosVida: parseInt(document.getElementById('charHP').value),
                pontosMana: parseInt(document.getElementById('charMP').value),
                defesa: parseInt(document.getElementById('charDef').value),
                iniciativa: parseInt(document.getElementById('charInit').value)
            },
            historia: {
                background: document.getElementById('charBackground').value,
                alinhamento: document.getElementById('charAlignment').value,
                motivacao: document.getElementById('charMotivation').value,
                fraquezas: document.getElementById('charWeaknesses').value
            },
            dataCriacao: new Date().toISOString()
        };

        this.saveCharacter(character);
        this.showSuccessMessage('Personagem criado com sucesso!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    saveCharacter(character) {
        let characters = JSON.parse(localStorage.getItem('characters') || '[]');
        characters.push(character);
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    showSuccessMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success mt-3';
        alertDiv.role = 'alert';
        alertDiv.textContent = message;

        const form = document.getElementById('characterForm');
        form.insertAdjacentElement('beforebegin', alertDiv);
    }
}

// Inicializa a criação de personagem quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CharacterCreation();
});

// Exporta a classe
export { CharacterCreation };

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