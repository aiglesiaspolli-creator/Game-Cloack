// Configurações básicas do canvas e física
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRAVIDADE = 0.5;
const CHAO = 400;


// Aqui carregamos os vídeos e imagens principais do cenário e UI
const videoCenario = document.createElement('video');
videoCenario.src = 'img/anima cenário.mp4';
videoCenario.loop = true;
videoCenario.muted = true;
videoCenario.play();

const imgCoracao = new Image();
imgCoracao.src = 'img/coração.png';

const imgGameOver = new Image();
imgGameOver.src = 'img/game over.png';

const imgVictory = new Image();
imgVictory.src = 'img/victory.png';

const imgTiroHeroi = new Image();
imgTiroHeroi.src = 'heroi/tiro.png';

let multiplicadorDano = 1.0;
let jogoRodando = false;


// Função rápida para carregar várias imagens de uma vez
function carregarImagens(paths) {
    return paths.map(path => {
        const img = new Image();
        img.src = path;
        return img;
    });
}


// Sprites de todas as animações do herói
const spritesHeroi = {
    parado: carregarImagens(['heroi/parado1.png', 'heroi/parado2.png', 'heroi/parado3.png', 'heroi/parado4.png']),
    correndo: carregarImagens(['heroi/correndo1.png', 'heroi/correndo2.png', 'heroi/correndo3.png', 'heroi/correndo4.png']),
    atirando: carregarImagens(['heroi/atirando1.png', 'heroi/atirando2.png', 'heroi/atirando3.png']),
    esquiva: carregarImagens(['heroi/esquiva1.png', 'heroi/esquiva2.png', 'heroi/esquiva3.png', 'heroi/esquiva4.png']),
    dano: carregarImagens(['heroi/dano1.png', 'heroi/dano2.png']),
    morrendo: carregarImagens(['heroi/morrendo1.png', 'heroi/morrendo2.png', 'heroi/morrendo3.png']),
    vitoria: carregarImagens(['heroi/vitória1.png', 'heroi/vitória2.png', 'heroi/vitória3.png'])
};


// Animações do Boss 1
const spritesBoss1 = {
    movimento_frente: carregarImagens(['Boss1/frente1.png', 'Boss1/frente2.png']),
    movimento_tras: carregarImagens(['Boss1/trás1.png', 'Boss1/trás2.png']),
    ataq1: carregarImagens(['Boss1/disparo1.png', 'Boss1/disparo2.png']),
    ataq2: carregarImagens(['Boss1/foguete.png']),
    ataq3: carregarImagens(['Boss1/foguetecima1.png', 'Boss1/foguetecima2.png']),
    morte: carregarImagens(['Boss1/morte1.png', 'Boss1/morte2.png', 'Boss1/morte3.png']),
    destrocos: carregarImagens(['Boss1/destrocos1.png', 'Boss1/destrocos2.png', 'Boss1/destrocos3.png']),
    vitoria: carregarImagens(['Boss1/derrota1.png', 'Boss1/derrota2.png', 'Boss1/derrota3.png'])
};


// Animações do Boss 2
const spritesBoss2 = {
    movimento: carregarImagens(['Boss2/parado.png']),
    risada: carregarImagens(['Boss2/rindo1.png', 'Boss2/rindo2.png', 'Boss2/rindo3.png', 'Boss2/rindo4.png']),
    ataq1: carregarImagens(['Boss2/js.png']),
    ataq2: carregarImagens(['Boss2/css.png']),
    ataq3: carregarImagens(['Boss2/html.png']),
    morte: carregarImagens([
        'Boss2/explodiu1.png', 'Boss2/explodiu2.png', 'Boss2/explodiu3.png',
        'Boss2/explodiu4.png', 'Boss2/explodiu5.png', 'Boss2/explodiu6.png', 'Boss2/explodiu7.png'
    ]),
    vitoria: carregarImagens(['Boss2/vitoria.png'])
};


// Animações do Boss 3
const spritesBoss3 = {
    paradoD: carregarImagens(['Boss3/paradod1.png', 'Boss3/paradod2.png', 'Boss3/paradod3.png', 'Boss3/paradod4.png', 'Boss3/paradod5.png']),
    paradoE: carregarImagens(['Boss3/paradoe1.png', 'Boss3/paradoe2.png', 'Boss3/paradoe3.png', 'Boss3/paradoe4.png', 'Boss3/paradoe5.png']),
    correndoD: carregarImagens(['Boss3/correndod1.png', 'Boss3/correndod2.png', 'Boss3/correndod3.png', 'Boss3/correndod4.png', 'Boss3/correndod5.png']),
    correndoE: carregarImagens(['Boss3/correndoe1.png', 'Boss3/correndoe2.png', 'Boss3/correndoe3.png', 'Boss3/correndoe4.png', 'Boss3/correndoe5.png']),
    atirandoD: carregarImagens(['Boss3/atirandod1.png', 'Boss3/atirandod2.png']),
    atirandoE: carregarImagens(['Boss3/atirandoe1.png', 'Boss3/atirandoe2.png']),
    jogandoD: carregarImagens(['Boss3/jogandod1.png', 'Boss3/jogandod2.png']),
    jogandoE: carregarImagens(['Boss3/jogandoe1.png', 'Boss3/jogandoe2.png']),
    morte: carregarImagens(['Boss3/morrendo1.png', 'Boss3/morrendo2.png', 'Boss3/morrendo3.png', 'Boss3/morrendo4.png', 'Boss3/morrendo5.png']),
    vitoria: carregarImagens(['Boss3/vitoria1.png', 'Boss3/vitoria2.png', 'Boss3/vitoria3.png', 'Boss3/vitoria4.png'])
};


// Imagens dos projéteis boss
const imgsProjeteisBoss = {
    canhao: carregarImagens(['Boss1/tiro.png']),
    misseisreto: carregarImagens(['Boss1/misseisreto.png']),
    misseisceu: carregarImagens(['Boss1/misseisceu.png']),
    js: carregarImagens(['Boss2/js.png']),
    css: carregarImagens(['Boss2/css.png']),
    html: carregarImagens(['Boss2/html.png']),
    pythona: carregarImagens(['Boss3/pythona.png']),
    pythony: carregarImagens(['Boss3/pythony.png'])
};


// Atributos do herói (posição, vida, estado atual)
const heroi = {
    x: 100,
    y: CHAO - 100,
    width: 70,
    height: 100,
    velocidadeX: 4,
    velocidadeY: 0,
    noChao: false,
    vida: 6,
    vidaMaxima: 6,
    barraVidaExtra: 0,
    estado: 'parado',
    frameAtual: 0,
    timerAnimacao: 0,
    viradoEsquerda: false,
    esquivando: false,
    morto: false,
    timerTiro: 0
};

let bossSpritesAtuais = spritesBoss1;
let faseSelecionada = 1;


// Atributos do boss (posição, vida, padrões de ataque)
const boss = {
    xBase: 800,
    x: 800,
    y: CHAO - 350,
    width: 350,
    height: 350,
    vida: 500,
    vidaMaxima: 500,
    estado: 'movimento',
    timerAtaque: 0,
    timerMovimento: 0,
    frameAtual: 0,
    timerAnimacao: 0,
    velX: 0,
    risadasContador: 0,
    contadorAtaque2: 0,
    timerRemoverHTML: 0,
    lado: 'D'
};

const projeteisHeroi = [];
const projeteisBoss = [];

const teclas = {
    esquerda: false,
    direita: false,
    esquiva: false
};


// Captura as teclas pressionadas pelo jogador
window.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'A') teclas.esquerda = true;
    if (e.key === 'd' || e.key === 'D') teclas.direita = true;
    if (e.key === 'w' || e.key === 'W') {
        if (heroi.noChao && !heroi.morto && !heroi.esquivando) {
            heroi.velocidadeY = -10;
            heroi.noChao = false;
        }
    }
    if (e.key === ' ') {
        teclas.esquiva = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'a' || e.key === 'A') teclas.esquerda = false;
    if (e.key === 'd' || e.key === 'D') teclas.direita = false;
    if (e.key === ' ') teclas.esquiva = false;
});


// Configura a dificuldade e a fase escolhida ao clicar em iniciar
document.getElementById('btnStart').addEventListener('click', () => {
    const dificuldade = document.querySelector('input[name="dificuldade"]:checked').value;
    faseSelecionada = parseInt(document.querySelector('input[name="fase"]:checked').value);

    if (dificuldade === 'facil') {
        heroi.vida = 5;
        heroi.vidaMaxima = 6;
        multiplicadorDano = 1.25;
    } else if (dificuldade === 'medio') {
        heroi.vida = 3;
        heroi.vidaMaxima = 4;
        multiplicadorDano = 1.0;
    } else if (dificuldade === 'dificil') {
        heroi.vida = 1;
        heroi.vidaMaxima = 2;
        multiplicadorDano = 0.75;
    }

    if (faseSelecionada === 2) {
        bossSpritesAtuais = spritesBoss2;
        boss.vida = 1000;
        boss.vidaMaxima = 1000;
        boss.y = CHAO - 300;
        boss.width = 300;
        boss.height = 300;
    } else if (faseSelecionada === 3) {
        bossSpritesAtuais = spritesBoss3;
        boss.vida = 1000;
        boss.vidaMaxima = 1000;
        boss.width = 150;
        boss.height = 150;
        boss.y = CHAO - 150;
        boss.lado = 'D';
    } else {
        bossSpritesAtuais = spritesBoss1;
        boss.vida = 1000;
        boss.vidaMaxima = 1000;
        boss.y = CHAO - 330;
        boss.width = 350;
        boss.height = 350;
    }

    document.getElementById('selectionMenu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';

    videoCenario.play();

    jogoRodando = true;
    gameLoop();
});


// Faz o herói atirar ao clicar com o mouse
canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        if (heroi.vida > 0 && boss.vida > 0 && !heroi.esquivando && !heroi.morto) {
            heroi.estado = 'atirando';
            heroi.frameAtual = 0;
            heroi.timerTiro = 15;

            projeteisHeroi.push({
                x: heroi.viradoEsquerda ? heroi.x - 10 : heroi.x + heroi.width,
                y: heroi.y + heroi.height / 2 - 5,
                width: 40,
                height: 20,
                color: 'yellow',
                velocidade: heroi.viradoEsquerda ? -8 : 8
            });
        }
    }
});

canvas.addEventListener('contextmenu', (e) => e.preventDefault());


// Controla o comportamento do boss (movimento, ataques e morte)
function atualizarBoss() {
    boss.timerAnimacao++;

    let spritesAtuais = bossSpritesAtuais.movimento || bossSpritesAtuais.paradoD || bossSpritesAtuais.paradoE || [];
    let velocidadeAnimacaoBoss = faseSelecionada === 3 ? 40 : 50;

    // Verifica se a vida do boss acabou para iniciar a morte
    if (boss.vida <= 0) {
        if (boss.estado !== 'morte' && boss.estado !== 'destrocos' && boss.estado !== 'saindo_da_tela' && boss.estado !== 'derrotado_final') {
            boss.estado = 'morte';
            boss.frameAtual = 0;
            boss.timerAnimacao = 0;
        }

        // Controla as fases da animação de morte
        if (boss.estado === 'morte') {
            spritesAtuais = bossSpritesAtuais.morte;
            let velMorte = faseSelecionada === 2 ? 12 : velocidadeAnimacaoBoss;
            if (boss.timerAnimacao > velMorte) {
                boss.timerAnimacao = 0;
                boss.frameAtual++;

                if (faseSelecionada === 2 && boss.frameAtual === 5) {
                    boss.estado = 'saindo_da_tela';
                } else if (boss.frameAtual >= spritesAtuais.length) {
                    if (faseSelecionada === 1) {
                        boss.estado = 'destrocos';
                        boss.frameAtual = 0;
                    } else if (faseSelecionada === 3) {
                        // Na fase 3, ele morre e fica fixo no último frame (morrendo5.png)
                        boss.frameAtual = spritesAtuais.length - 1;
                    } else {
                        // Nas outras fases, ele some ou é removido
                        boss.estado = 'derrotado_final';
                        boss.frameAtual = 0;
                        boss.x = -1000;
                    }
                }
            }
        }
        else if (boss.estado === 'saindo_da_tela') {
            // Boss 2 cai da tela
            boss.y += 10; 
            if (boss.y > canvas.height + boss.height) {
                boss.estado = 'derrotado_final';
            }
        }
        else if (boss.estado === 'destrocos') {
            // Boss 1 vira destroços no chão
            spritesAtuais = bossSpritesAtuais.destrocos || [];
            if (spritesAtuais.length > 0) {
                if (boss.timerAnimacao > velocidadeAnimacaoBoss) {
                    boss.timerAnimacao = 0;
                    boss.frameAtual++;
                    if (boss.frameAtual >= spritesAtuais.length) {
                        boss.frameAtual = spritesAtuais.length - 1;
                    }
                }
            } else {
                boss.estado = 'derrotado_final';
            }
        }
        return;
    }

    // Se o herói morrer, o boss entra em pose de vitória
    if (heroi.vida <= 0 && heroi.estado === 'morrendo' && heroi.frameAtual >= spritesHeroi.morrendo.length - 1) {
        if (boss.estado !== 'vitoria') {
            boss.estado = 'vitoria';
            boss.frameAtual = 0;
            boss.timerAnimacao = 0;
        }
        spritesAtuais = bossSpritesAtuais.vitoria;
        if (boss.timerAnimacao > velocidadeAnimacaoBoss) {
            boss.timerAnimacao = 0;
            boss.frameAtual++;
            if (boss.frameAtual >= spritesAtuais.length) {
                boss.frameAtual = spritesAtuais.length - 1;
            }
        }
        return;
    }

    // Movimentação normal do Boss quando está "vivo"
    if (boss.estado === 'movimento') {
        boss.timerMovimento++;
        
        let pausarAtaque = false;
        if (faseSelecionada === 3) {
            pausarAtaque = projeteisBoss.some(p => p.tipo === 'pythony');
        }

        if (!pausarAtaque) {
            boss.timerAtaque++;
        }

        if (faseSelecionada === 2) {
            // Boss 2 flutuar
            boss.y = (CHAO - 300) + Math.sin(boss.timerMovimento * 0.02) * 50;
            spritesAtuais = bossSpritesAtuais.movimento;
        } else if (faseSelecionada === 3) {
            // Boss 3 vira para o lado que está andando
            boss.lado = boss.x > canvas.width / 2 ? 'D' : 'E';
            spritesAtuais = bossSpritesAtuais['parado' + boss.lado];
        } else {
            let novoX = boss.xBase + Math.sin(boss.timerMovimento * 0.008) * 60;
            boss.velX = novoX - boss.x;
            boss.x = novoX;
            spritesAtuais = boss.velX < 0 ? bossSpritesAtuais.movimento_frente : bossSpritesAtuais.movimento_tras;
        }

        // Troca os frames da animação de andar/parado
        if (boss.timerAnimacao > velocidadeAnimacaoBoss) {
            boss.timerAnimacao = 0;
            boss.frameAtual++;
            if (boss.frameAtual >= spritesAtuais.length) {
                boss.frameAtual = 0;
            }
        }

        //  Intervalo
        if (boss.timerAtaque > (faseSelecionada === 3 ? 100 : 120)) {
            boss.timerAtaque = 0;
            const ataqueSorteado = Math.floor(Math.random() * 3) + 1;
            
            if (faseSelecionada === 2) {
                // Boss 2 anima risada
                boss.estado = 'risada';
                boss.ataqueAlvo = 'ataq' + ataqueSorteado;
                boss.risadasContador = 0;

                if (ataqueSorteado === 2) {
                    boss.contadorAtaque2++;
                    if (boss.contadorAtaque2 === 2) {
                        boss.timerRemoverHTML = 20; 
                    }
                }
            } else {
                //Mapeamento do boss 3
                if (faseSelecionada === 3) {
                    boss.lado = boss.x > canvas.width / 2 ? 'D' : 'E';
                }
                boss.estado = 'ataq' + ataqueSorteado;
                boss.frameAtual = 0;
            }
        }
    } else if (boss.estado === 'risada') {
        // Animação da risada do VV
        spritesAtuais = bossSpritesAtuais.risada;
        if (boss.timerAnimacao > 10) {
            boss.timerAnimacao = 0;
            boss.frameAtual++;
            if (boss.frameAtual >= spritesAtuais.length) {
                boss.frameAtual = 0;
                boss.risadasContador++;
                if (boss.risadasContador >= 3) {
                    boss.estado = boss.ataqueAlvo;
                    boss.frameAtual = 0;
                }
            }
        }
    } else {
        // Execução dos ataques sorteados
        boss.timerAtaque++;
        
        if (faseSelecionada === 2) {
            spritesAtuais = bossSpritesAtuais.movimento;
            boss.timerMovimento++;
            boss.y = (CHAO - 300) + Math.sin(boss.timerMovimento * 0.02) * 50;
        } else if (faseSelecionada === 3) {
            const mapeamento = { ataq1: 'correndo', ataq2: 'atirando', ataq3: 'jogando' };
            let nome = mapeamento[boss.estado] || 'parado';
            spritesAtuais = bossSpritesAtuais[nome + boss.lado] || bossSpritesAtuais.paradoD;
        } else {
            spritesAtuais = bossSpritesAtuais[boss.estado] || bossSpritesAtuais.movimento;
        }

        if (boss.timerAnimacao > (faseSelecionada === 2 ? 20 : velocidadeAnimacaoBoss)) {

            boss.timerAnimacao = 0;
            boss.frameAtual++;
            if (boss.frameAtual >= spritesAtuais.length) {
                if (faseSelecionada === 3 && (boss.estado === 'ataq2' || boss.estado === 'ataq3')) {
                    boss.frameAtual = spritesAtuais.length - 1;
                } else {
                    boss.frameAtual = 0;
                }
            }
        }

        if (boss.estado === 'ataq1') {
            if (faseSelecionada === 1) {
                if (boss.timerAtaque === 15) {
                    projeteisBoss.push({ x: boss.x, y: CHAO - 60, width: 50, height: 50, color: 'black', tipo: 'canhao', velocidade: -3 });
                } else if (boss.timerAtaque === 120) {
                    projeteisBoss.push({ x: boss.x, y: CHAO - 160, width: 50, height: 50, color: 'black', tipo: 'canhao', velocidade: -3 });
                } else if (boss.timerAtaque === 200) {
                    projeteisBoss.push({ x: boss.x, y: CHAO - 60, width: 50, height: 50, color: 'black', tipo: 'canhao', velocidade: -3 });
                }
                if (boss.timerAtaque > 220) retornarMovimento();
            } else if (faseSelecionada === 3) {
                let indoParaEsquerda = boss.lado === 'D';
                boss.x += indoParaEsquerda ? -8 : 8;
                if (indoParaEsquerda && boss.x < 50) retornarMovimento();
                else if (!indoParaEsquerda && boss.x > canvas.width - boss.width - 50) retornarMovimento();
            } else {
                if (boss.timerAtaque === 15) {
                    projeteisBoss.push({ x: boss.x, y: CHAO - 40, width: 50, height: 50, tipo: 'js', velocidade: -5 });
                } else if (boss.timerAtaque === 120) {
                    projeteisBoss.push({ x: boss.x, y: CHAO - 160, width: 50, height: 50, tipo: 'js', velocidade: -5 });
                } else if (boss.timerAtaque === 200) {
                    projeteisBoss.push({ x: boss.x, y: CHAO - 40, width: 50, height: 50, tipo: 'js', velocidade: -5 });
                }
                if (boss.timerAtaque > 220) retornarMovimento();
            }
        }
        else if (boss.estado === 'ataq2') {
            if (faseSelecionada === 1) {
                if (boss.timerAtaque === 15) {
                    projeteisBoss.push({
                        x: boss.x, y: boss.y + 100,
                        width: 50, height: 50, color: 'magenta', tipo: 'misseisreto', teleguiado: true,
                        velocidade: -2, velY: 0, frameAtual: 0, timerAnimacao: 0
                    });
                }
                if (boss.timerAtaque > 120) retornarMovimento();
            } else if (faseSelecionada === 3) {
                if (boss.timerAtaque === 30 || boss.timerAtaque === 120 || boss.timerAtaque === 210) {
                    boss.frameAtual = 0;
                    let paraEsquerda = boss.lado === 'D';
                    projeteisBoss.push({
                        x: boss.x + (paraEsquerda ? 0 : boss.width), y: boss.y + boss.height / 2 + 30,
                        width: 30, height: 30, tipo: 'pythona',
                        velocidade: paraEsquerda ? -3 : 3, velY: 0
                    });
                }
                if (boss.timerAtaque > 280) retornarMovimento();
            } else {
                if (boss.timerAtaque >= 30 && boss.timerAtaque <= 150) {
                    if (boss.timerAtaque % 25 === 0) {
                        let dropX = Math.random() * (canvas.width - 100);
                        projeteisBoss.push({
                            x: dropX, y: -50,
                            width: 25, height: 50, tipo: 'css', teleguiado: false,
                            velocidade: 0, velY: 5, frameAtual: 0, timerAnimacao: 0
                        });
                    }
                } else if (boss.timerAtaque > 180) {
                    retornarMovimento();
                }
            }
        }
        else if (boss.estado === 'ataq3') {
            if (faseSelecionada === 1) {
                if (boss.timerAtaque >= 30 && boss.timerAtaque <= 120) {
                    if (boss.timerAtaque % 15 === 0) {
                        let dropX = Math.random() * (canvas.width - 20);
                        projeteisBoss.push({
                            x: dropX, y: 0,
                            width: 50, height: 50, color: 'orange', tipo: 'misseisceu', teleguiado: false,
                            velocidade: 0, velY: 4, frameAtual: 0, timerAnimacao: 0
                        });
                    }
                } else if (boss.timerAtaque > 150) {
                    retornarMovimento();
                }
            } else if (faseSelecionada === 3) {
                if (boss.timerAtaque === 30) {
                    boss.frameAtual = 0;
                    let paraEsquerda = boss.lado === 'D';
                    projeteisBoss.push({
                        x: boss.x + (paraEsquerda ? 0 : boss.width), y: boss.y,
                        width: 30, height: 30, tipo: 'pythony',
                        velocidade: paraEsquerda ? -5 : 5, velY: -5, bounce: true,
                        maxQuiques: 10, quiquesAtual: 0
                    });
                }

                if (boss.timerAtaque > 80) {
                    retornarMovimento();
                }
            } else {
                if (boss.timerAtaque === 30) {
                    const htmlCount = projeteisBoss.filter(p => p.tipo === 'html').length;
                    if (htmlCount < 2) {
                        projeteisBoss.push({
                            x: boss.x, y: heroi.y + heroi.height / 2 - 45,
                            width: 90, height: 90, tipo: 'html',
                            velocidade: -10, 
                            velY: 0, 
                            fase: 'indo', 
                            timerVida: 600
                        });
                    }
                }
                if (boss.timerAtaque > 300) retornarMovimento();
            }
        }
    }
}


// Reinicia o estado do boss para movimento padrão
function retornarMovimento() {
    boss.estado = 'movimento';
    boss.timerAtaque = 0;
    boss.frameAtual = 0;
    if (faseSelecionada === 3) {
        boss.lado = boss.x > canvas.width / 2 ? 'D' : 'E';
    }
}

// Aqui checamos se dois retângulos se encostam (colisão)
function detectarColisao(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}

// Cria uma "caixa" menor para a colisão ser mais justa
function getHitbox(obj, percW = 0.8, percH = 0.8) {
    const newWidth = obj.width * percW;
    const newHeight = obj.height * percH;
    const offsetX = (obj.width - newWidth) / 2;
    const offsetY = (obj.height - newHeight) / 2;
    return {
        x: obj.x + offsetX,
        y: obj.y + offsetY,
        width: newWidth,
        height: newHeight
    };
}

// Tira vida do herói e ativa animação de dano ou morte
function danoHeroi() {
    if (heroi.vida > 0 && heroi.estado !== 'dano' && !heroi.morto && boss.vida > 0) {
        heroi.vida--;
        if (heroi.vida <= 0) {
            heroi.morto = true;
            heroi.estado = 'morrendo';
            heroi.frameAtual = 0;
        } else {
            heroi.estado = 'dano';
            heroi.frameAtual = 0;
            heroi.timerTiro = 20;
        }
    }
}

// Função principal que atualiza tudo no jogo a cada instante
function atualizar() {
    if (!heroi.morto && boss.vida > 0) {
        if (teclas.esquiva && heroi.noChao && heroi.estado !== 'atirando' && heroi.estado !== 'dano' && heroi.estado !== 'esquiva_saindo') {
            if (heroi.estado !== 'esquiva') {
                heroi.frameAtual = 0;
                heroi.timerAnimacao = 0;
                heroi.estado = 'esquiva';
            }
        } else if (!teclas.esquiva && heroi.estado === 'esquiva') {
            heroi.estado = 'esquiva_saindo';
            heroi.frameAtual = 3;
            heroi.timerAnimacao = 0;
        }

        heroi.esquivando = (heroi.estado === 'esquiva' || heroi.estado === 'esquiva_saindo');

        let velAtual = heroi.esquivando ? 8 : heroi.velocidadeX;

        // Movimento do herói
        if (teclas.esquerda && heroi.x > 0) {
            heroi.x -= velAtual;
            heroi.viradoEsquerda = true;
            if (!heroi.esquivando && heroi.estado !== 'atirando' && heroi.estado !== 'dano') {
                heroi.estado = 'correndo';
            }
        } else if (teclas.direita && heroi.x + heroi.width < canvas.width) {
            heroi.x += velAtual;
            heroi.viradoEsquerda = false;
            if (!heroi.esquivando && heroi.estado !== 'atirando' && heroi.estado !== 'dano') {
                heroi.estado = 'correndo';
            }
        } else {
            if (!heroi.esquivando && heroi.estado !== 'atirando' && heroi.estado !== 'dano') {
                heroi.estado = 'parado';
            }
        }

        if (heroi.timerTiro > 0) {
            heroi.timerTiro--;
            if (heroi.timerTiro <= 0) {
                if (heroi.estado === 'dano' || heroi.estado === 'atirando') {
                    heroi.estado = 'parado';
                }
            }
        }
    }

    // Aplica gravidade
    heroi.velocidadeY += GRAVIDADE;
    heroi.y += heroi.velocidadeY;

    if (heroi.y + heroi.height >= CHAO) {
        heroi.y = CHAO - heroi.height;
        heroi.velocidadeY = 0;
        heroi.noChao = true;
    }

    // Move os tiros do herói e checa se acertou o boss
    for (let i = projeteisHeroi.length - 1; i >= 0; i--) {
        let p = projeteisHeroi[i];
        p.x += p.velocidade;
        if (detectarColisao(getHitbox(p, 0.8, 0.8), getHitbox(boss, 0.7, 0.8)) && boss.vida > 0) {
            let danoBase = 5;
            let danoFinal = danoBase * multiplicadorDano;
            boss.vida -= danoFinal;
            
            heroi.barraVidaExtra += 2;
            if (heroi.barraVidaExtra >= 100) {
                heroi.vida = Math.min(heroi.vida + 1, heroi.vidaMaxima);
                heroi.barraVidaExtra = 0;
            }

            projeteisHeroi.splice(i, 1);
            continue;
        }
        if (p.x > canvas.width || p.x < 0) projeteisHeroi.splice(i, 1);
    }


    if (detectarColisao(getHitbox(heroi, 0.6, 0.8), getHitbox(boss, 0.7, 0.8)) && boss.vida > 0 && !heroi.esquivando) {
        danoHeroi();
    }

    // Move os tiros do boss e checa se acertou o herói
    for (let i = projeteisBoss.length - 1; i >= 0; i--) {
        let p = projeteisBoss[i];

        if (p.bounce) {
            let quicou = false;
            if (p.x <= 0) {
                p.velocidade = Math.abs(p.velocidade);
                p.x = 0;
                quicou = true;
            } else if (p.x + p.width >= canvas.width) {
                p.velocidade = -Math.abs(p.velocidade);
                p.x = canvas.width - p.width;
                quicou = true;
            }

            if (p.y <= 0) {
                p.velY = Math.abs(p.velY);
                p.y = 0;
                quicou = true;
            } else if (p.y + p.height >= CHAO) {
                p.velY = -Math.abs(p.velY);
                p.y = CHAO - p.height;
                quicou = true;
            }
            
            if (quicou && p.maxQuiques !== undefined) {
                p.quiquesAtual++;
                if (p.quiquesAtual >= p.maxQuiques) {
                    projeteisBoss.splice(i, 1);
                    continue;
                }
            }
        }

        if (p.timerAnimacao !== undefined) {
            p.timerAnimacao++;
            if (p.timerAnimacao > 5) {
                p.timerAnimacao = 0;
                p.frameAtual++;
            }
        }

        if (p.tipo === 'misseisreto' && p.teleguiado) {
            if (p.x > heroi.x && !heroi.esquivando) {
                let dx = (heroi.x + heroi.width / 2) - (p.x + p.width / 2);
                let dy = (heroi.y + heroi.height / 2) - (p.y + p.height / 2);
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 0) {
                    p.velocidade += (dx / dist) * 0.15;
                    p.velY += (dy / dist) * 0.15;
                    let currentVel = Math.sqrt(p.velocidade * p.velocidade + p.velY * p.velY);
                    if (currentVel > 5) {
                        p.velocidade = (p.velocidade / currentVel) * 5;
                        p.velY = (p.velY / currentVel) * 5;
                    }
                }
            }
        }

        if (p.tipo === 'html') {
            if (p.fase === 'indo') {
                if (p.x < 300) {
                    p.fase = 'voltando';
                }
            } else if (p.fase === 'voltando') {
                p.velocidade = 10;
                p.velY = 0;
            }

            if (p.timerVida !== undefined) {
                p.timerVida--;
                if (p.timerVida <= 0) {
                    projeteisBoss.splice(i, 1);
                    continue;
                }
            }
        }

        p.x += p.velocidade;
        if (p.velY) p.y += p.velY;

        if (p.bounce) {
            if (p.x <= 0 || p.x + p.width >= canvas.width) p.velocidade *= -1;
            if (p.y <= 0 || p.y + p.height >= CHAO) p.velY *= -1;
        }

        let hitboxHeroi = getHitbox(heroi, 0.6, 0.8);
        if (heroi.esquivando) {
            hitboxHeroi.y += 50;
            hitboxHeroi.height -= 50;
        }

        if (!heroi.morto && detectarColisao(getHitbox(p, 0.7, 0.7), hitboxHeroi)) {
            danoHeroi();
            if (!p.bounce) projeteisBoss.splice(i, 1);
            continue;
        }
        if (p.x < -200 || p.x > canvas.width + 200 || p.y < -200 || p.y > canvas.height + 200) {
            projeteisBoss.splice(i, 1);
        }
    }

    atualizarBoss();
    atualizarAnimacaoHeroi();

    if (boss.timerRemoverHTML > 0) {
        boss.timerRemoverHTML--;
        if (boss.timerRemoverHTML === 0) {
            for (let i = projeteisBoss.length - 1; i >= 0; i--) {
                if (projeteisBoss[i].tipo === 'html') {
                    projeteisBoss.splice(i, 1);
                }
            }
        }
    }
}

// Gerencia a troca de frames das animações do herói
function atualizarAnimacaoHeroi() {
    heroi.timerAnimacao++;

    if (boss.vida <= 0 && heroi.estado !== 'vitoria') {
        heroi.estado = 'vitoria';
        heroi.frameAtual = 0;
        heroi.timerAnimacao = 0;
    }

    let spritesAtuais = spritesHeroi[heroi.estado];
    if (heroi.estado === 'esquiva_saindo') {
        spritesAtuais = spritesHeroi['esquiva'];
    }

    let velocidadeAnimacao = 25;
    if (heroi.estado === 'esquiva' || heroi.estado === 'esquiva_saindo') velocidadeAnimacao = 6;
    if (heroi.estado === 'correndo') velocidadeAnimacao = 18;

    if (heroi.timerAnimacao > velocidadeAnimacao) {
        heroi.timerAnimacao = 0;
        heroi.frameAtual++;

        if (heroi.estado === 'morrendo') {
            if (heroi.frameAtual >= spritesAtuais.length) {
                heroi.frameAtual = spritesAtuais.length - 1;
            }
        } else if (heroi.estado === 'vitoria') {
            if (heroi.frameAtual >= spritesAtuais.length) {
                heroi.frameAtual = spritesAtuais.length - 1;
            }
        } else if (heroi.estado === 'esquiva') {
            if (heroi.frameAtual > 1) {
                heroi.frameAtual = 1;
            }
        } else if (heroi.estado === 'esquiva_saindo') {
            if (heroi.frameAtual > 3) {
                heroi.estado = 'parado';
                heroi.frameAtual = 0;
                heroi.esquivando = false;
            }
        } else {
            if (heroi.frameAtual >= spritesAtuais.length) {
                heroi.frameAtual = 0;
            }
        }
    }
}

// Desenha tudo na tela (Cenário, Personagens, Tiros)
function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (videoCenario.readyState >= 2) {
        ctx.drawImage(videoCenario, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#222';
        ctx.fillRect(0, CHAO, canvas.width, canvas.height - CHAO);
    }

    let spritesAtuais = spritesHeroi[heroi.estado];
    if (heroi.estado === 'esquiva_saindo') spritesAtuais = spritesHeroi['esquiva'];

    let imgHeroi = spritesAtuais[heroi.frameAtual];

    ctx.save();
    if (heroi.viradoEsquerda) {
        ctx.translate(heroi.x + heroi.width, heroi.y);
        ctx.scale(-1, 1);
        if (imgHeroi && imgHeroi.complete && imgHeroi.naturalWidth > 0) {
            ctx.drawImage(imgHeroi, 0, 0, heroi.width, heroi.height);
        } else {
            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, heroi.width, heroi.height);
        }
    } else {
        if (imgHeroi && imgHeroi.complete && imgHeroi.naturalWidth > 0) {
            ctx.drawImage(imgHeroi, heroi.x, heroi.y, heroi.width, heroi.height);
        } else {
            ctx.fillStyle = 'blue';
            ctx.fillRect(heroi.x, heroi.y, heroi.width, heroi.height);
        }
    }
    ctx.restore();

    let sprBoss;
    if (boss.estado === 'movimento') {
        if (faseSelecionada === 1) sprBoss = (boss.velX < 0 ? bossSpritesAtuais.movimento_frente : bossSpritesAtuais.movimento_tras);
        else if (faseSelecionada === 3) {
            sprBoss = bossSpritesAtuais['parado' + boss.lado];
        } else sprBoss = bossSpritesAtuais.movimento;
    }
    else if (boss.estado === 'risada') sprBoss = bossSpritesAtuais.risada;
    else if (boss.estado === 'ataq1' || boss.estado === 'ataq2' || boss.estado === 'ataq3') {
        if (faseSelecionada === 2) sprBoss = bossSpritesAtuais.movimento;
        else if (faseSelecionada === 3) {
            const mapeamento = { ataq1: 'correndo', ataq2: 'atirando', ataq3: 'jogando' };
            let nome = mapeamento[boss.estado] || 'parado';
            sprBoss = bossSpritesAtuais[nome + boss.lado] || bossSpritesAtuais.paradoD;
        } else sprBoss = bossSpritesAtuais[boss.estado];
    }
    else if (boss.estado === 'morte' || boss.estado === 'saindo_da_tela') sprBoss = bossSpritesAtuais.morte;
    else if (boss.estado === 'destrocos') sprBoss = bossSpritesAtuais.destrocos;
    else if (boss.estado === 'vitoria') sprBoss = bossSpritesAtuais.vitoria;
    else if (boss.estado === 'derrotado_final') sprBoss = null;
    else sprBoss = bossSpritesAtuais.movimento;

    if (sprBoss) {
        let imgBoss = sprBoss[boss.frameAtual];
        if (imgBoss && imgBoss.complete && imgBoss.naturalWidth > 0) {
            ctx.drawImage(imgBoss, boss.x, boss.y, boss.width, boss.height);
        }
    }

    projeteisHeroi.forEach(p => {
        if (imgTiroHeroi && imgTiroHeroi.complete && imgTiroHeroi.naturalWidth > 0) {
            ctx.save();
            if (p.velocidade < 0) {
                ctx.translate(p.x + p.width, p.y);
                ctx.scale(-1, 1);
                ctx.drawImage(imgTiroHeroi, 0, 0, p.width, p.height);
            } else {
                ctx.drawImage(imgTiroHeroi, p.x, p.y, p.width, p.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.width, p.height);
        }
    });

    projeteisBoss.forEach(p => {
        if ((p.tipo === 'canhao' || p.tipo === 'misseisreto' || p.tipo === 'misseisceu' || p.tipo === 'js' || p.tipo === 'css' || p.tipo === 'html' || p.tipo === 'pythona' || p.tipo === 'pythony') && imgsProjeteisBoss[p.tipo] && imgsProjeteisBoss[p.tipo].length > 0) {
            let imagens = imgsProjeteisBoss[p.tipo];
            let idx = (p.frameAtual || 0) % imagens.length;
            let img = imagens[idx];
            if (img && img.complete && img.naturalWidth > 0) {
                ctx.drawImage(img, p.x, p.y, p.width, p.height);
                return;
            }
        }

        ctx.fillStyle = p.color || 'cyan';
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });

    desenharInterface();
}

// Desenha a vida, barras de progresso e as telas de fim de jogo
function desenharInterface() {
    const tempo = Date.now();
    for (let i = 0; i < heroi.vida; i++) {
        let offsetY = Math.sin((tempo / 300) + i) * 5;
        if (imgCoracao.complete && imgCoracao.naturalWidth > 0) {
            ctx.drawImage(imgCoracao, 20 + (i * 50), 20 + offsetY, 75, 50);
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(20 + (i * 50), 20 + offsetY, 100, 100);
        }
    }

    if (boss.vida > 0) {
        const larguraBarra = 600;
        const vidaAtual = (boss.vida / boss.vidaMaxima) * larguraBarra;
        ctx.fillStyle = '#3a3838ff';
        ctx.fillRect(canvas.width - 650, 20, larguraBarra, 30);
        ctx.fillStyle = '#ffd104ff';
        ctx.fillRect(canvas.width - 650, 20, vidaAtual, 30);
    }

    // Barra de Vida Extra (Azul)
    const larguraBarraExtra = 230;
    const progressoExtra = (heroi.barraVidaExtra / 100) * larguraBarraExtra;
    ctx.fillStyle = '#3a3838ff';
    ctx.fillRect(20, 80, larguraBarraExtra, 10);
    ctx.fillStyle = '#00f2ffff';
    ctx.fillRect(20, 80, progressoExtra, 10);

    if (heroi.vida <= 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (imgGameOver.complete && imgGameOver.naturalWidth > 0) {
            let escala = 0.5; 
            let imgW = imgGameOver.naturalWidth * escala;
            let imgH = imgGameOver.naturalHeight * escala;
            ctx.drawImage(imgGameOver, canvas.width / 2 - imgW / 2, canvas.height / 2 - imgH / 2, imgW, imgH);
        } else {
            ctx.fillStyle = 'white';
            ctx.font = '40px Arial';
            ctx.fillText('GAME OVER', canvas.width / 2 - 110, canvas.height / 2);
        }
    } else if (boss.vida <= 0) {
        if (imgVictory.complete && imgVictory.naturalWidth > 0) {
            let proporcao = imgVictory.naturalHeight / imgVictory.naturalWidth;
            let imgW = 400;
            let imgH = imgW * proporcao;
            ctx.drawImage(imgVictory, canvas.width / 2 - imgW / 2, 80, imgW, imgH);
        } else {
            ctx.fillStyle = 'white';
            ctx.font = '40px Arial';
            ctx.fillText('VITÓRIA!', canvas.width / 2 - 80, canvas.height / 2);
        }
    }
}

// Loop infinito que mantém o jogo rodando a 60fps
function gameLoop() {
    if (jogoRodando) {
        atualizar();
        desenhar();
    }
    requestAnimationFrame(gameLoop);
}


videoCenario.pause();
desenhar()