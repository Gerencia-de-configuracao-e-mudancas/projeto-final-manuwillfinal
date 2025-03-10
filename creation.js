// Classe para gerenciar a criação de personagem
class CharacterCreation { 
    constructor() { // construtor da classe
        this.initializeEventListeners();
    }

    initializeEventListeners() { // inicializa os eventos do formulário
        const form = document.getElementById('characterForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    handleFormSubmit(e) { // manipula o evento de submit do formulário
        e.preventDefault(); // previne o comportamento padrão do formulário (recarregar a página)
        
        const character = { // cria um objeto personagem
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

    saveCharacter(character) { // salva o personagem no localStorage
        let characters = JSON.parse(localStorage.getItem('characters') || '[]');
        characters.push(character);
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    showSuccessMessage(message) { // mostra uma mensagem de sucesso
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