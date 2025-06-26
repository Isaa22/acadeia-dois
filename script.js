document.addEventListener('DOMContentLoaded', function() {
    // ========== SCROLL SUAVE ========== //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Botões "Começar Agora" e "Gerar Meu Treino"
    const buttons = [
        document.querySelector('header .cta-button'),
        document.getElementById('start-generator')
    ];
    
    buttons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    // ========== GERADOR DE TREINOS ========== //
    const formTreino = document.getElementById('form-treino');
    if (formTreino) {
        formTreino.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const idade = document.getElementById('idade').value;
            const objetivo = document.getElementById('objetivo').value;
            const nivel = document.getElementById('nivel').value;
            
            const treino = gerarTreino(objetivo, nivel);
            exibirTreino(nome, idade, objetivo, nivel, treino);
        });
    }
});

// ========== FUNÇÕES PRINCIPAIS ========== //
function gerarTreino(objetivo, nivel) {
    const treino = { segunda: [], terca: [], quarta: [], quinta: [], sexta: [] };
    const exercicios = {
        musculacao: {
            iniciante: {
                superiores: [
                    { nome: "Supino reto", series: "3x10", descricao: "Com barra ou halteres" },
                    { nome: "Remada sentada", series: "3x10", descricao: "No aparelho de remada" },
                    { nome: "Rosca direta", series: "3x12", descricao: "Barra reta" }
                ],
                inferiores: [
                    { nome: "Agachamento livre", series: "3x10", descricao: "Pés na largura dos ombros" },
                    { nome: "Leg press", series: "3x12", descricao: "Amplitude completa" }
                ],
                cardio: [
                    { nome: "Esteira", series: "20min", descricao: "Intensidade moderada" }
                ]
            },
            intermediario: {
                superiores: [
                    { nome: "Supino inclinado", series: "4x8", descricao: "30° de inclinação" },
                    { nome: "Barra fixa", series: "3xmax", descricao: "Apoio se necessário" }
                ],
                inferiores: [
                    { nome: "Agachamento frontal", series: "4x8", descricao: "Barra na clavícula" }
                ],
                cardio: [
                    { nome: "Esteira", series: "15min", descricao: "HIIT" }
                ]
            },
            avancado: {
                superiores: [
                    { nome: "Supino declinado", series: "4x6", descricao: "Barra com peso" }
                ],
                inferiores: [
                    { nome: "Agachamento hack", series: "4x6", descricao: "Máquina ou barra" }
                ],
                cardio: [
                    { nome: "Esteira", series: "20min", descricao: "HIIT avançado" }
                ]
            }
        },
        emagrecimento: {
            iniciante: {
                fullbody: [
                    { nome: "Agachamento", series: "3x12", descricao: "Pés paralelos" },
                    { nome: "Flexão de braço", series: "3x10", descricao: "Joelhos no chão" }
                ],
                cardio: [
                    { nome: "Esteira", series: "30min", descricao: "Ritmo moderado" }
                ]
            },
            intermediario: {
                fullbody: [
                    { nome: "Burpee", series: "3x10", descricao: "Com flexão e salto" }
                ],
                cardio: [
                    { nome: "Esteira", series: "20min", descricao: "HIIT (1min/1min)" }
                ]
            },
            avancado: {
                fullbody: [
                    { nome: "Burpee com salto", series: "4x12", descricao: "Salto vertical" }
                ],
                cardio: [
                    { nome: "Esteira", series: "30min", descricao: "HIIT avançado" }
                ]
            }
        },
        "ganho-massa": {
            iniciante: {
                peito: [
                    { nome: "Supino reto", series: "4x10", descricao: "Barra ou halteres" }
                ],
                costas: [
                    { nome: "Barra fixa", series: "3xmax", descricao: "Apoio se necessário" }
                ],
                pernas: [
                    { nome: "Agachamento livre", series: "4x10", descricao: "Pés na largura dos ombros" }
                ]
            },
            intermediario: {
                peito: [
                    { nome: "Supino reto", series: "4x8", descricao: "Barra com peso" }
                ],
                costas: [
                    { nome: "Barra fixa com peso", series: "4x6", descricao: "Cinto de lastro" }
                ]
            },
            avancado: {
                peito: [
                    { nome: "Supino reto", series: "5x5", descricao: "Carga máxima" }
                ],
                costas: [
                    { nome: "Barra fixa lastrada", series: "4x5", descricao: "Peso adicional" }
                ]
            }
        }
    };

    // Lógica para montar o treino
    if (objetivo === "musculacao") {
        treino.segunda = exercicios.musculacao[nivel].superiores;
        treino.terca = exercicios.musculacao[nivel].inferiores;
        treino.quarta = exercicios.musculacao[nivel].cardio;
        treino.quinta = exercicios.musculacao[nivel].superiores;
        treino.sexta = exercicios.musculacao[nivel].inferiores;
    } 
    else if (objetivo === "emagrecimento") {
        treino.segunda = exercicios.emagrecimento[nivel].fullbody;
        treino.terca = exercicios.emagrecimento[nivel].cardio;
        treino.quarta = exercicios.emagrecimento[nivel].fullbody;
        treino.quinta = exercicios.emagrecimento[nivel].cardio;
        treino.sexta = exercicios.emagrecimento[nivel].fullbody;
    } 
    else if (objetivo === "ganho-massa") {
        treino.segunda = exercicios["ganho-massa"][nivel].peito;
        treino.terca = exercicios["ganho-massa"][nivel].costas;
        treino.quarta = exercicios["ganho-massa"][nivel].pernas;
        treino.quinta = exercicios["ganho-massa"][nivel].peito;
        treino.sexta = exercicios["ganho-massa"][nivel].costas;
    }

    return treino;
}

function exibirTreino(nome, idade, objetivo, nivel, treino) {
    const resultadoDiv = document.getElementById('resultado-treino');
    if (!resultadoDiv) return;

    let html = `
        <div class="treino-header">
            <h2>Treino Gerado para ${nome}</h2>
            <p>Idade: ${idade} | Objetivo: ${objetivo} | Nível: ${nivel}</p>
        </div>
    `;

    for (const dia in treino) {
        if (treino[dia].length === 0) continue;
        html += `
            <div class="dia-treino">
                <h3>${dia.charAt(0).toUpperCase() + dia.slice(1)}-feira</h3>
                <ul>
                    ${treino[dia].map(exercicio => `
                        <li>
                            <strong>${exercicio.nome}</strong> (${exercicio.series})<br>
                            <small>${exercicio.descricao}</small>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    resultadoDiv.innerHTML = html;
    resultadoDiv.style.display = 'block';
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
}
