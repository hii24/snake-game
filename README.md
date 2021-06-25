# 🐍 snake-game

Classic Snake. HTML5 Canvas, vanilla JS, no build tools — just open `index.html` in a browser.

```
┌────────────────────────┐
│                        │
│         ●●●●●          │
│             ●          │
│             ●          │
│                        │
│      🍎                │
│                        │
└────────────────────────┘
       Score: 12
```

## Play it

```bash
git clone https://github.com/hii24/snake-game.git
cd snake-game
open index.html
```

## Controls

- **Arrow keys** — move
- **Space** — pause / restart after game over

## Files

```
snake-game/
├── index.html   # canvas + score
├── style.css    # dark theme
└── game.js      # game loop, collision, food spawn (~150 lines)
```

Built in a weekend to feel old-school — no React, no build, just a single index.html.

MIT License · 2021 Serhii Valko
