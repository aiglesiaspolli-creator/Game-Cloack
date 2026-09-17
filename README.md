# 🔫 Cloak
> Jogo 2D em Pixel Art Ambientado em um Universo Industrial Distópico e sua Landing Page Oficial

O **Cloak** é um jogo 2D em pixel art ambientado em uma era industrial distópica. Na história, a humanidade desmoronou sob o peso do avanço tecnológico acelerado e da tirania artificial. O jogador controla um rebelde mascarado que, utilizando uma capa que o torna invisível aos radares e um revólver de chumbo e pólvora, enfrenta chefões tiranos para restaurar a liberdade.

O repositório contém a aplicação web completa, integrando a landing page de apresentação, a galeria de assets e sprites, a seção da equipe e a área de execução do próprio jogo.

---

## 📌 Destaques e Funcionalidades

- **Experiência Visual Imersiva:**
  - Backgrounds animados em vídeo (`anima fabrica.mp4` e `anima trem.mp4`).
  - Interface com estética industrial e fontes customizadas (*League Gothic* e *Poppins*).
- **Showcase de Assets e Lore:**
  - Apresentação completa do enredo e história do universo do jogo.
  - Sliders dinâmicos exibindo animações do protagonista (parado, atirando, correndo, dano, esquiva e morte) e dos chefões (Bosses 1, 2 e 3).
- **Seção "About" Interativa:**
  - Cartões de perfil da equipe com efeito visual de "lock screen" para desbloqueio de dados.
- **Ambiente de Jogo (`game.html`):**
  - Módulo dedicado à execução e gameplay do jogo 2D.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica, suporte a mídias (vídeos HTML5) e integração das páginas (`home.html`, `game.html`, `about.html`).
- **CSS3:** Estilização responsiva, layout em Grid e Flexbox, animações e efeitos visuais (`home.css`, `about.css`).
- **JavaScript (ES6):** Manipulação do DOM, controle de sliders/galerias dinâmicas e lógica de interatividade dos cards (`home.js`, `about.js`).

---

## 📂 Estrutura do Repositório

```text
├── Boss1/               # Sprites e animações do primeiro chefão
├── Boss2/               # Sprites e animações do segundo chefão
├── Boss3/               # Sprites e animações do terceiro chefão
├── heroi/               # Sprites e animações do personagem principal
├── img/                 # Vídeos de fundo e artes de cenário
├── about.css            # Estilização da página de desenvolvedores
├── about.html           # Página com perfil da equipe e lock screen
├── about.js             # Lógica de desbloqueio dos cards de desenvolvedores
├── game.html            # Interface de execução do jogo
├── home.css             # Estilização visual da landing page
├── home.html            # Landing page principal (lore, galeria e navegação)
├── home.js              # Scripts do slider e animações da home
└── README.md            # Documentação do repositório
