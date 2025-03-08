// Função para calcular o modificador de atributo
function calcularModificador(valor) {
    return Math.floor((valor - 10) / 2);
}

// Função para formatar o modificador como string
function formatarModificador(valor) {
    const mod = calcularModificador(valor);
    return mod >= 0 ? `+${mod}` : `${mod}`;
}

// Função para gerar a cor do card baseada na classe
function getClassColor(classe) {
    if (!classe) return 'secondary'; // Retorna uma cor padrão se a classe for undefined ou null

    const cores = {
        'guerreiro': 'danger',
        'mago': 'primary',
        'ladino': 'success',
        'default': 'secondary'
    };
    return cores[classe.toLowerCase()] || cores.default;
}

// Função para rolar um d20
function rolarD20() {
    return Math.floor(Math.random() * 20) + 1;
}

// Função para criar o container de toasts se não existir
function criarToastContainer() {
    let container = document.querySelector('.dice-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'dice-toast-container';
        document.body.appendChild(container);
    }
    return container;
}

// Função para mostrar o resultado da rolagem
function mostrarRolagem(atributo, valor, modificador) {
    const container = criarToastContainer();
    const d20Result = rolarD20();
    const total = d20Result + modificador;
    
    const toast = document.createElement('div');
    toast.className = 'dice-toast';
    toast.innerHTML = `
        <div class="dice-icon">
            <i class="fas fa-dice-d20"></i>
        </div>
        <div class="dice-content">
            <div class="dice-title">
                Teste de ${atributo}
                <small class="dice-details">Valor: ${valor}</small>
            </div>
            <div class="dice-result">
                <span class="dice-total">${total}</span>
                <span class="dice-details">
                    = ${d20Result} (d20) 
                    <span class="dice-modifier">${modificador >= 0 ? '+' + modificador : modificador}</span>
                </span>
            </div>
        </div>
    `;

    container.appendChild(toast);
    
    // Trigger reflow para iniciar a animação
    void toast.offsetWidth;
    
    // Adiciona a classe show para animar a entrada
    toast.classList.add('show');
    
    // Anima o ícone do dado
    const diceIcon = toast.querySelector('.dice-icon i');
    diceIcon.classList.add('rolling');
    
    // Remove o toast após 4 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Função para carregar e exibir os personagens
function loadCharacters() {
    const characters = JSON.parse(localStorage.getItem('characters') || '[]');
    console.log('Personagens carregados:', characters); // Debug

    const charactersList = document.getElementById('charactersList');
    const noCharactersMessage = document.getElementById('noCharactersMessage');

    if (!charactersList || !noCharactersMessage) {
        console.error('Elementos da DOM não encontrados');
        return;
    }

    if (characters.length === 0) {
        noCharactersMessage.style.display = 'block';
        charactersList.innerHTML = '';
        return;
    }

    noCharactersMessage.style.display = 'none';
    charactersList.innerHTML = characters.map((char, index) => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 border-${getClassColor(char.classe)}">
                <div class="card-header bg-${getClassColor(char.classe)} text-white">
                    <h5 class="card-title mb-0">${char.nome || 'Sem nome'}</h5>
                </div>
                <div class="card-body">
                    <div class="character-info mb-3">
                        <p class="mb-1">
                            <i class="fas fa-user-circle"></i> ${char.raca || 'Raça desconhecida'} 
                            <span class="badge bg-${getClassColor(char.classe)}">${char.classe || 'Sem classe'}</span>
                        </p>
                        <p class="mb-1"><i class="fas fa-star"></i> Nível ${char.nivel || 1}</p>
                    </div>
                    
                    <div class="attributes-grid">
                        <div class="attribute" data-attribute="Força" data-value="${char.atributos?.forca || 10}" data-mod="${calcularModificador(char.atributos?.forca || 10)}">
                            <span class="attribute-label">FOR</span>
                            <span class="attribute-value">${char.atributos?.forca || 10} (${formatarModificador(char.atributos?.forca || 10)})</span>
                        </div>
                        <div class="attribute" data-attribute="Destreza" data-value="${char.atributos?.destreza || 10}" data-mod="${calcularModificador(char.atributos?.destreza || 10)}">
                            <span class="attribute-label">DES</span>
                            <span class="attribute-value">${char.atributos?.destreza || 10} (${formatarModificador(char.atributos?.destreza || 10)})</span>
                        </div>
                        <div class="attribute" data-attribute="Constituição" data-value="${char.atributos?.constituicao || 10}" data-mod="${calcularModificador(char.atributos?.constituicao || 10)}">
                            <span class="attribute-label">CON</span>
                            <span class="attribute-value">${char.atributos?.constituicao || 10} (${formatarModificador(char.atributos?.constituicao || 10)})</span>
                        </div>
                        <div class="attribute" data-attribute="Inteligência" data-value="${char.atributos?.inteligencia || 10}" data-mod="${calcularModificador(char.atributos?.inteligencia || 10)}">
                            <span class="attribute-label">INT</span>
                            <span class="attribute-value">${char.atributos?.inteligencia || 10} (${formatarModificador(char.atributos?.inteligencia || 10)})</span>
                        </div>
                        <div class="attribute" data-attribute="Sabedoria" data-value="${char.atributos?.sabedoria || 10}" data-mod="${calcularModificador(char.atributos?.sabedoria || 10)}">
                            <span class="attribute-label">SAB</span>
                            <span class="attribute-value">${char.atributos?.sabedoria || 10} (${formatarModificador(char.atributos?.sabedoria || 10)})</span>
                        </div>
                        <div class="attribute" data-attribute="Carisma" data-value="${char.atributos?.carisma || 10}" data-mod="${calcularModificador(char.atributos?.carisma || 10)}">
                            <span class="attribute-label">CAR</span>
                            <span class="attribute-value">${char.atributos?.carisma || 10} (${formatarModificador(char.atributos?.carisma || 10)})</span>
                        </div>
                    </div>

                    <div class="combat-info mt-3">
                        <p class="mb-1">
                            <i class="fas fa-heart text-danger"></i> HP: ${char.combate?.pontosVida || 0}
                            <i class="fas fa-fire-alt text-primary ms-2"></i> MP: ${char.combate?.pontosMana || 0}
                        </p>
                        <p class="mb-1">
                            <i class="fas fa-shield-alt text-secondary"></i> DEF: ${char.combate?.defesa || 0}
                            <i class="fas fa-bolt text-warning ms-2"></i> INI: ${char.combate?.iniciativa || 0}
                        </p>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-sm btn-danger" onclick="deleteCharacter(${index})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="viewCharacterDetails(${index})">
                        <i class="fas fa-eye"></i> Detalhes
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Adiciona event listeners para os atributos
    document.querySelectorAll('.attribute').forEach(attribute => {
        attribute.addEventListener('click', function() {
            const atributo = this.dataset.attribute;
            const valor = parseInt(this.dataset.value);
            const modificador = parseInt(this.dataset.mod);
            mostrarRolagem(atributo, valor, modificador);
        });
    });
}

// Função para excluir um personagem
window.deleteCharacter = function(index) {
    if (confirm('Tem certeza que deseja excluir este personagem?')) {
        const characters = JSON.parse(localStorage.getItem('characters') || '[]');
        characters.splice(index, 1);
        localStorage.setItem('characters', JSON.stringify(characters));
        loadCharacters();
    }
};

// Função para visualizar detalhes do personagem
window.viewCharacterDetails = function(index) {
    const characters = JSON.parse(localStorage.getItem('characters') || '[]');
    const char = characters[index];
    
    if (!char) {
        console.error('Personagem não encontrado');
        return;
    }

    const modalHtml = `
        <div class="modal fade" id="characterModal${index}" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-${getClassColor(char.classe)} text-white">
                        <h5 class="modal-title">${char.nome || 'Sem nome'}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editCharacterForm${index}" class="character-edit-form">
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <div class="card h-100">
                                        <div class="card-header bg-dark text-white">
                                            <h6 class="mb-0"><i class="fas fa-user-circle"></i> Informações Básicas</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="mb-3">
                                                <label class="form-label">Nome:</label>
                                                <input type="text" class="form-control" name="nome" value="${char.nome}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Raça:</label>
                                                <select class="form-select" name="raca" required>
                                                    <option value="humano" ${char.raca === 'humano' ? 'selected' : ''}>Humano</option>
                                                    <option value="elfo" ${char.raca === 'elfo' ? 'selected' : ''}>Elfo</option>
                                                    <option value="anao" ${char.raca === 'anao' ? 'selected' : ''}>Anão</option>
                                                    <option value="orc" ${char.raca === 'orc' ? 'selected' : ''}>Orc</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Classe:</label>
                                                <select class="form-select" name="classe" required>
                                                    <option value="guerreiro" ${char.classe === 'guerreiro' ? 'selected' : ''}>Guerreiro</option>
                                                    <option value="mago" ${char.classe === 'mago' ? 'selected' : ''}>Mago</option>
                                                    <option value="ladino" ${char.classe === 'ladino' ? 'selected' : ''}>Ladino</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Idade:</label>
                                                <input type="number" class="form-control" name="idade" value="${char.idade}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Gênero:</label>
                                                <input type="text" class="form-control" name="genero" value="${char.genero}">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Altura (cm):</label>
                                                <input type="number" class="form-control" name="altura" value="${char.altura}">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Peso (kg):</label>
                                                <input type="number" class="form-control" name="peso" value="${char.peso}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card h-100">
                                        <div class="card-header bg-dark text-white">
                                            <h6 class="mb-0"><i class="fas fa-dice-d20"></i> Atributos</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="mb-3">
                                                <label class="form-label">Força:</label>
                                                <input type="number" class="form-control" name="forca" value="${char.atributos.forca}" min="1" max="20" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Destreza:</label>
                                                <input type="number" class="form-control" name="destreza" value="${char.atributos.destreza}" min="1" max="20" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Constituição:</label>
                                                <input type="number" class="form-control" name="constituicao" value="${char.atributos.constituicao}" min="1" max="20" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Inteligência:</label>
                                                <input type="number" class="form-control" name="inteligencia" value="${char.atributos.inteligencia}" min="1" max="20" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Sabedoria:</label>
                                                <input type="number" class="form-control" name="sabedoria" value="${char.atributos.sabedoria}" min="1" max="20" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Carisma:</label>
                                                <input type="number" class="form-control" name="carisma" value="${char.atributos.carisma}" min="1" max="20" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-header bg-dark text-white">
                                            <h6 class="mb-0"><i class="fas fa-shield-alt"></i> Combate</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Pontos de Vida:</label>
                                                        <input type="number" class="form-control" name="pontosVida" value="${char.combate.pontosVida}" required>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Pontos de Mana:</label>
                                                        <input type="number" class="form-control" name="pontosMana" value="${char.combate.pontosMana}" required>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Defesa:</label>
                                                        <input type="number" class="form-control" name="defesa" value="${char.combate.defesa}" required>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Iniciativa:</label>
                                                        <input type="number" class="form-control" name="iniciativa" value="${char.combate.iniciativa}" required>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-header bg-dark text-white">
                                            <h6 class="mb-0"><i class="fas fa-book"></i> História</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="mb-3">
                                                <label class="form-label">Background:</label>
                                                <textarea class="form-control" name="background" rows="3">${char.historia.background}</textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Alinhamento:</label>
                                                <select class="form-select" name="alinhamento">
                                                    <option value="bom" ${char.historia.alinhamento === 'bom' ? 'selected' : ''}>Bom</option>
                                                    <option value="neutro" ${char.historia.alinhamento === 'neutro' ? 'selected' : ''}>Neutro</option>
                                                    <option value="maligno" ${char.historia.alinhamento === 'maligno' ? 'selected' : ''}>Maligno</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Motivação:</label>
                                                <textarea class="form-control" name="motivacao" rows="2">${char.historia.motivacao}</textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Fraquezas:</label>
                                                <textarea class="form-control" name="fraquezas" rows="2">${char.historia.fraquezas}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveCharacterEdit(${index})">Salvar Alterações</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Adiciona o modal ao body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostra o modal
    const modal = new bootstrap.Modal(document.getElementById(`characterModal${index}`));
    modal.show();
    
    // Remove o modal do DOM quando for fechado
    document.getElementById(`characterModal${index}`).addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
};

// Função para salvar as edições do personagem
window.saveCharacterEdit = function(index) {
    const form = document.getElementById(`editCharacterForm${index}`);
    const characters = JSON.parse(localStorage.getItem('characters') || '[]');
    
    // Atualiza os dados do personagem
    characters[index] = {
        ...characters[index],
        nome: form.nome.value,
        raca: form.raca.value,
        classe: form.classe.value.toLowerCase(),
        idade: parseInt(form.idade.value),
        genero: form.genero.value,
        altura: parseInt(form.altura.value),
        peso: parseInt(form.peso.value),
        atributos: {
            forca: parseInt(form.forca.value),
            destreza: parseInt(form.destreza.value),
            constituicao: parseInt(form.constituicao.value),
            inteligencia: parseInt(form.inteligencia.value),
            sabedoria: parseInt(form.sabedoria.value),
            carisma: parseInt(form.carisma.value)
        },
        combate: {
            pontosVida: parseInt(form.pontosVida.value),
            pontosMana: parseInt(form.pontosMana.value),
            defesa: parseInt(form.defesa.value),
            iniciativa: parseInt(form.iniciativa.value)
        },
        historia: {
            background: form.background.value,
            alinhamento: form.alinhamento.value,
            motivacao: form.motivacao.value,
            fraquezas: form.fraquezas.value
        }
    };

    // Salva no localStorage
    localStorage.setItem('characters', JSON.stringify(characters));

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById(`characterModal${index}`));
    modal.hide();

    // Mostra mensagem de sucesso
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        <strong>Sucesso!</strong> Personagem atualizado com sucesso.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.querySelector('.main-container').insertAdjacentElement('afterbegin', alertDiv);

    // Recarrega a lista de personagens
    loadCharacters();

    // Remove a mensagem após 3 segundos
    setTimeout(() => alertDiv.remove(), 3000);
};

// Carrega os personagens quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, iniciando carregamento dos personagens');
    loadCharacters();
}); 