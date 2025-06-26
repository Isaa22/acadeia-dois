document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const formTreino = document.getElementById('form-treino');
    const resultado = document.getElementById('resultado');
    const saudacao = document.getElementById('saudacao');
    const diasTreino = document.getElementById('dias-treino');
    const startGeneratorBtn = document.getElementById('start-generator');

    // Rolar até o gerador quando clicar no botão "Gerar Meu Treino"
    if (startGeneratorBtn) {
        startGeneratorBtn.addEventListener('click', function() {
            document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Dados de exercícios por objetivo e nível
    const exercicios = {
        'musculacao': {
            'iniciante': [
                { nome: "Agachamento Livre", series: "3x12", descricao: "Pés na largura dos ombros, descer como se fosse sentar" },
                { nome: "Supino Reto", series: "3x10", descricao: "Barra ou halteres, controle a descida" },
                { nome: "Remada Curvada", series: "3x12", descricao: "Costas retas, puxar a barra em direção ao umbigo" },
                { nome: "Desenvolvimento Militar", series: "3x10", descricao: "Empurrar o peso para cima sem arquear as costas" },
                { nome: "Rosca Direta", series: "3x12", descricao: "Cotovelos fixos, focar na contração do bíceps" }
            ],
            'intermediario': [
                { nome: "Agachamento com Barra", series: "4x8", descricao: "Barra nas costas, manter postura ereta" },
                { nome: "Supino Inclinado", series: "4x8", descricao: "Banco inclinado a 30-45 graus" },
                { nome: "Barra Fixa", series: "3x até a falha", descricao: "Puxar o corpo até o queixo passar a barra" },
                { nome: "Elevação Lateral", series: "3x12", descricao: "Braços levemente flexionados, elevar até a altura dos ombros" },
                { nome: "Tríceps Testa", series: "3x10", descricao: "Barra EZ ou halteres, manter cotovelos fixos" }
            ],
            'avancado': [
                { nome: "Agachamento Frontal", series: "4x6", descricao: "Barra na frente do corpo, cotovelos altos" },
                { nome: "Supino Declinado", series: "4x6", descricao: "Maior ênfase na parte inferior do peitoral" },
                { nome: "Remada Cavalinho", series: "4x8", descricao: "Tronco paralelo ao chão, puxar barra em direção ao peito" },
                { nome: "Desenvolvimento Arnold", series: "4x8", descricao: "Rotação durante o movimento para ativar todas as fibras" },
                { nome: "Rosca Martelo", series: "4x10", descricao: "Punhos neutros, trabalha bíceps e antebraço" }
            ]
        },
        'emagrecimento': {
            'iniciante': [
                { nome: "Pular Corda", series: "3x1min", descricao: "Manter ritmo constante, descanso de 30s entre séries" },
                { nome: "Burpee Simplificado", series: "3x10", descricao: "Sem o salto no final para iniciantes" },
                { nome: "Polichinelo", series: "3x30s", descricao: "Bom para aquecimento e queima calórica" },
                { nome: "Corrida Estacionária", series: "3x1min", descricao: "Elevar joelhos alternadamente" },
                { nome: "Abdominal Supra", series: "3x15", descricao: "Contrair abdômen ao subir" }
            ],
            'intermediario': [
                { nome: "Burpee Completo", series: "4x12", descricao: "Com salto no final para maior intensidade" },
                { nome: "Mountain Climber", series: "4x30s", descricao: "Manter core contraído durante todo o movimento" },
                { nome: "Agachamento com Salto", series: "4x15", descricao: "Explodir para cima no salto" },
                { nome: "Escalador Cruzado", series: "4x20", descricao: "Levar joelho em direção ao cotovelo oposto" },
                { nome: "Prancha com Toque no Ombro", series: "3x40s", descricao: "Manter quadril estável durante o movimento" }
            ],
            'avancado': [
                { nome: "Burpee com Flexão", series: "5x15", descricao: "Incluir uma flexão completa em cada repetição" },
                { nome: "Salto na Caixa", series: "5x10", descricao: "Altura da caixa conforme capacidade" },
                { nome: "Agachamento Pistol", series: "4x8 por perna", descricao: "Agachamento unilateral, exigente" },
                { nome: "Prancha Dinâmica", series: "4x1min", descricao: "Alternar entre prancha alta e baixa" },
                { nome: "Russian Twist com Peso", series: "4x20", descricao: "Giro de tronco com halter ou medicine ball" }
            ]
        },
        'ganho-massa': {
            'iniciante': [
                { nome: "Leg Press", series: "4x10", descricao: "Pés na largura dos ombros, empurrar com os calcanhares" },
                { nome: "Supino Máquina", series: "4x10", descricao: "Mais seguro para iniciantes que o supino livre" },
                { nome: "Puxada Alta", series: "4x10", descricao: "Puxar a barra em direção ao peito" },
                { nome: "Elevação de Gêmeos Sentado", series: "3x15", descricao: "Foco na panturrilha" },
                { nome: "Rosca Scott", series: "3x12", descricao: "Isolar o bíceps" }
            ],
            'intermediario': [
                { nome: "Agachamento Hack", series: "4x8", descricao: "Máquina específica para quadríceps" },
                { nome: "Supino com Halteres", series: "4x8", descricao: "Maior amplitude de movimento que a barra" },
                { nome: "Remada Baixa", series: "4x8", descricao: "Puxar o cabo em direção ao abdômen" },
                { nome: "Desenvolvimento com Halteres", series: "4x8", descricao: "Maior liberdade de movimento que a barra" },
                { nome: "Tríceps Corda", series: "4x10", descricao: "Puxada com corda para tríceps" }
            ],
            'avancado': [
                { nome: "Agachamento Búlgaro", series: "4x8 por perna", descricao: "Perna traseira elevada, foco no quadríceps" },
                { nome: "Supino Inclinado com Halteres", series: "4x6", descricao: "Banco inclinado a 30 graus" },
                { nome: "Remada Serrote", series: "4x8 por braço", descricao: "Isolar cada lado das costas" },
                { nome: "Elevação Frontal com Rotação", series: "4x8", descricao: "Rotacionar halteres durante a elevação" },
                { nome: "Rosca Concentrada", series: "4x10", descricao: "Cotovelo apoiado na coxa, máxima contração" }
            ]
        },
        'condicionamento': {
            'iniciante': [
                { nome: "Caminhada Rápida", series: "3x5min", descricao: "Manter ritmo acelerado, descanso de 1min" },
                { nome: "Bicicleta Ergométrica", series: "3x10min", descricao: "Resistência moderada" },
                { nome: "Natação Leve", series: "3x200m", descricao: "Estilo livre, ritmo confortável" },
                { nome: "Elíptico", series: "3x10min", descricao: "Manter postura ereta" },
                { nome: "Step Básico", series: "3x5min", descricao: "Altura baixa do step" }
            ],
            'intermediario': [
                { nome: "Corrida Contínua", series: "3x15min", descricao: "Ritmo moderado, descanso de 2min" },
                { nome: "HIIT Básico", series: "8x30s", descricao: "30s intenso, 1min descanso" },
                { nome: "Natação Intermediária", series: "5x100m", descricao: "Estilo livre, ritmo forte" },
                { nome: "Escada de Agilidade", series: "4x", descricao: "Diferentes padrões de passos" },
                { nome: "Circuito Funcional", series: "3 voltas", descricao: "5 exercícios, 40s cada" }
            ],
            'avancado': [
                { nome: "Corrida Intervalada", series: "10x400m", descricao: "Ritmo forte, descanso de 1min" },
                { nome: "HIIT Avançado", series: "15x20s", descricao: "20s máximo, 40s descanso" },
                { nome: "Natação Intensa", series: "10x50m", descricao: "Estilo livre, ritmo máximo" },
                { nome: "Circuito CrossFit", series: "5 voltas", descricao: "Exercícios variados, mínima pausa" },
                { nome: "Treino de Escalada", series: "4x5min", descricao: "Parede de escalada ou fingerboard" }
            ]
        }
    };

    // Dicas por objetivo
    const dicas = {
        'musculacao': {
            'iniciante': "Foque na execução correta dos movimentos antes de aumentar o peso. Descanse 60-90s entre séries.",
            'intermediario': "Varie os exercícios a cada 6-8 semanas para evitar platô. Descanse 45-60s entre séries.",
            'avancado': "Utilize técnicas avançadas como drop sets e supersets para intensificar. Descanse 30-45s entre séries."
        },
        'emagrecimento': {
            'iniciante': "Combine com dieta balanceada. Mantenha a frequência cardíaca elevada durante o treino.",
            'intermediario': "Aumente gradualmente a intensidade. Treinos HIIT são ótimos para queima de gordura.",
            'avancado': "Varie os estímulos para evitar adaptação. Circuitos com pouco descanso são eficientes."
        },
        'ganho-massa': {
            'iniciante': "Foque em exercícios compostos. Aumente a carga gradualmente a cada 2 semanas.",
            'intermediario': "Priorize a progressão de carga. Consuma proteína suficiente para recuperação.",
            'avancado': "Utilize sobrecarga progressiva e técnicas de intensidade. Descanse adequadamente entre treinos."
        },
        'condicionamento': {
            'iniciante': "Comece devagar e aumente gradualmente a duração e intensidade.",
            'intermediario': "Varie os tipos de exercício para desenvolver condicionamento geral.",
            'avancado': "Treinos intervalados de alta intensidade melhoram rapidamente o VO2 max."
        }
    };

    // Gerar treino quando o formulário for submetido
    formTreino.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const objetivo = document.getElementById('objetivo').value;
        const nivel = document.getElementById('nivel').value;
        
        // Gerar saudação personalizada
        saudacao.innerHTML = `
            <p>Olá, <strong>${nome}</strong>! Aqui está seu treino personalizado para <strong>${getObjetivoNome(objetivo)}</strong> (nível <strong>${getNivelNome(nivel)}</strong>).</p>
            <p><strong>Dica:</strong> ${dicas[objetivo][nivel]}</p>
        `;
        
        // Gerar dias de treino (simplificado - na prática, seria mais complexo)
        diasTreino.innerHTML = '';
        
        // Número de dias varia conforme objetivo
        const numDias = objetivo === 'emagrecimento' ? 5 : (objetivo === 'condicionamento' ? 6 : 4);
        
        for (let i = 1; i <= numDias; i++) {
            const diaDiv = document.createElement('div');
            diaDiv.className = 'workout-day';
            
            let diaTitulo = '';
            let exerciciosDia = [];
            
            // Distribuir exercícios conforme o dia e objetivo
            if (objetivo === 'musculacao' || objetivo === 'ganho-massa') {
                // Treino ABC ou ABCD para musculação
                if (numDias === 4) {
                    if (i === 1) {
                        diaTitulo = "Dia A: Peito e Tríceps";
                        exerciciosDia = exercicios[objetivo][nivel].filter((_, index) => [1, 4].includes(index));
                    } else if (i === 2) {
                        diaTitulo = "Dia B: Costas e Bíceps";
                        exerciciosDia = exercicios[objetivo][nivel].filter((_, index) => [2, 3].includes(index));
                    } else if (i === 3) {
                        diaTitulo = "Dia C: Pernas";
                        exerciciosDia = exercicios[objetivo][nivel].filter((_, index) => index === 0);
                    } else {
                        diaTitulo = "Dia D: Ombros e Abdômen";
                        exerciciosDia = exercicios[objetivo][nivel].filter((_, index) => index === 3)
                            .concat({ nome: "Abdominal Supra", series: "3x15", descricao: "Contrair abdômen ao subir" });
                    }
                }
            } else if (objetivo === 'emagrecimento') {
                diaTitulo = `Dia ${i}: Treino ${i % 2 === 1 ? 'Cardio' : 'Funcional'}`;
                exerciciosDia = exercicios[objetivo][nivel].slice(0, 5);
            } else { // condicionamento
                diaTitulo = `Dia ${i}: ${['Corrida', 'HIIT', 'Natação', 'Circuito', 'Bicicleta', 'Escalada'][i-1]}`;
                exerciciosDia = exercicios[objetivo][nivel].slice(0, 3);
            }
            
            diaDiv.innerHTML = `<h4>${diaTitulo}</h4><ul class="exercise-list"></ul>`;
            
            const listaExercicios = diaDiv.querySelector('.exercise-list');
            
            exerciciosDia.forEach(exercicio => {
                const item = document.createElement('li');
                item.className = 'exercise-item';
                item.innerHTML = `
                    <div class="exercise-name">${exercicio.nome}</div>
                    <div class="exercise-details">${exercicio.series} - ${exercicio.descricao}</div>
                `;
                listaExercicios.appendChild(item);
            });
            
            diasTreino.appendChild(diaDiv);
        }
        
        // Mostrar resultado
        resultado.classList.remove('hidden');
        
        // Rolar até o resultado
        resultado.scrollIntoView({ behavior: 'smooth' });
    });

    // Funções auxiliares para traduzir valores
    function getObjetivoNome(objetivo) {
        const objetivos = {
            'musculacao': 'Musculação',
            'emagrecimento': 'Emagrecimento',
            'ganho-massa': 'Ganho de Massa',
            'condicionamento': 'Condicionamento'
        };
        return objetivos[objetivo] || objetivo;
    }

    function getNivelNome(nivel) {
        const niveis = {
            'iniciante': 'Iniciante',
            'intermediario': 'Intermediário',
            'avancado': 'Avançado'
        };
        return niveis[nivel] || nivel;
    }
});
