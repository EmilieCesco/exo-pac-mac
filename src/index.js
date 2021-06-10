import PacMan from "./Pacman";
import Ghost from "./Ghost"

const root = document.getElementById('root');

// General constants
export const widthFloor = 700;
export const heightFloor = 700;
export const sizePacman = 50;
export const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
export const angleDirection = {
  ArrowUp: -90,
  ArrowDown: 90,
  ArrowLeft: 180,
  ArrowRight: 0,
};

let intervalGhostId = null;


const animMouth = " @keyframes eat {\
  0% {\
    clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\
  }\
  25% {\
    clip-path: polygon(100% 60%, 44% 48%, 100% 40%);\
  }\
  50% {\
    clip-path: polygon(100% 50%, 44% 48%, 100% 50%);\
  }\
  75% {\
    clip-path: polygon(100% 59%, 44% 48%, 100% 35%);\
  }\
  100% {\
    clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\
  }\
}\
";
var s = document.createElement( 'style' );
s.innerHTML = animMouth;
root.appendChild(s);

// create elements
const screen = document.createElement('div');
screen.setAttribute('id', 'screen');
screen.style.display = 'flex';
screen.style.justifyContent = 'center';
screen.style.alignItems = 'center';
screen.style.width = '100%';
screen.style.height = '95vh';

const gameFloor = document.createElement('div');
gameFloor.setAttribute('id', 'gameFloor');
gameFloor.style.width = `${widthFloor}px`;
gameFloor.style.height = `${heightFloor}px`;
gameFloor.style.border = 'blue 1px solid';
gameFloor.style.position = 'relative';
gameFloor.style.backgroundColor = "black";

// Obstacles
const wallsInfos = [
  {width: 650, height: 30, left: 15, top:20},
  {width: 650, height: 30, left: 15, top:650},
  {width: 30, height: 300, left: 15, top:20},
  {width: 30, height: 250, left: 15, top:430},
  {width: 30, height: 300, left: 650, top:20},
  {width: 30, height: 250, left: 650, top:430},
  {width: 70, height: 180, left: 130, top: 260},
  {width: 70, height: 180, left: 480, top: 260},
  {width: 100, height: 70, left: 120, top: 520},
  {width: 100, height: 70, left: 460, top: 520},
  {width: 100, height: 20, left: 290, top: 570},
  {width: 100, height: 70, left: 120, top: 110},
  {width: 100, height: 70, left: 460, top: 110},
  {width: 100, height: 20, left: 290, top: 110},
  {width: 10, height: 178, left: 270, top: 260},
  {width: 10, height: 178, left: 400, top: 260},
];

// Food 
export const foodWidth = 10;
export const foodHeight = 10;
const foodColor =  "#f3f1d6";
const foodsPosition = [
  {top: 70, left: 80, id: 1},
  {top: 110, left: 80, id: 2},
  {top: 150, left: 80, id: 3},
  {top: 190, left: 80, id: 4},
  {top: 230, left: 80, id: 5},
  {top: 270, left: 80, id: 6},
  {top: 310, left: 80, id: 7},
  {top: 350, left: 80, id: 8},
  {top: 390, left: 80, id: 9},
  {top: 430, left: 80, id: 10},
  {top: 470, left: 80, id: 11},
  {top: 510, left: 80, id: 12},
  {top: 550, left: 80, id: 13},
  {top: 590, left: 80, id: 14},
  {top: 615, left: 80, id: 15},

  {top: 615, left: 120, id: 16},
  {top: 615, left: 160, id: 17},
  {top: 615, left: 200, id: 18},
  {top: 615, left: 240, id: 19},
  {top: 615, left: 280, id: 20},
  {top: 615, left: 320, id: 21},
  {top: 615, left: 360, id: 22},
  {top: 615, left: 400, id: 23},
  {top: 615, left: 440, id: 24},
  {top: 615, left: 480, id: 25},
  {top: 615, left: 520, id: 26},
  {top: 615, left: 560, id: 27},

  {top: 615, left: 610, id: 28},
  {top: 590, left: 610, id: 29},
  {top: 550, left: 610, id: 30},
  {top: 510, left: 610, id: 31},
  {top: 470, left: 610, id: 32},
  {top: 430, left: 610, id: 33},
  {top: 390, left: 610, id: 34},
  {top: 350, left: 610, id: 35},
  {top: 310, left: 610, id: 36},
  {top: 270, left: 610, id: 37},
  {top: 230, left: 610, id: 38},
  {top: 190, left: 610, id: 39},
  {top: 150, left: 610, id: 40},
  {top: 110, left: 610, id: 41},
  {top: 70, left: 610, id: 42},

  {top: 70, left: 120, id: 43},
  {top: 70, left: 160, id: 44},
  {top: 70, left: 200, id: 45},
  {top: 70, left: 240, id: 46},
  {top: 70, left: 280, id: 47},
  {top: 70, left: 320, id: 48},
  {top: 70, left: 360, id: 49},
  {top: 70, left: 400, id: 50},
  {top: 70, left: 440, id: 51},
  {top: 70, left: 480, id: 52},
  {top: 70, left: 520, id: 53},
  {top: 70, left: 560, id: 54},

  {top: 215, left: 120, id: 55},
  {top: 215, left: 160, id: 56},
  {top: 215, left: 200, id: 57},
  {top: 215, left: 240, id: 58},
  {top: 215, left: 280, id: 59},
  {top: 215, left: 320, id: 60},
  {top: 215, left: 360, id: 61},
  {top: 215, left: 400, id: 62},
  {top: 215, left: 440, id: 63},
  {top: 215, left: 480, id: 64},
  {top: 215, left: 520, id: 65},
  {top: 215, left: 560, id: 66},

  {top: 475, left: 120, id: 67},
  {top: 475, left: 160, id: 68},
  {top: 475, left: 200, id: 69},
  {top: 475, left: 240, id: 70},
  {top: 475, left: 280, id: 71},
  {top: 475, left: 320, id: 72},
  {top: 475, left: 360, id: 73},
  {top: 475, left: 400, id: 74},
  {top: 475, left: 440, id: 75},
  {top: 475, left: 480, id: 76},
  {top: 475, left: 520, id: 77},
  {top: 475, left: 560, id: 78},

  {top: 430, left: 440, id: 79},
  {top: 390, left: 440, id: 80},
  {top: 350, left: 440, id: 81},
  {top: 310, left: 440, id: 82},
  {top: 270, left: 440, id: 83},
  
  {top: 430, left: 230, id: 84},
  {top: 390, left: 230, id: 85},
  {top: 350, left: 230, id: 86},
  {top: 310, left: 230, id: 87},
  {top: 270, left: 230, id: 88},
];



// initializing game elements
const pacMan = new PacMan(350, 50, wallsInfos, foodsPosition);

// Create Ghost
function generateGhosts() {
  const ghost1 = new Ghost(350, 350, wallsInfos, pacMan);
  gameFloor.appendChild(ghost1.getGhost());
  intervalGhostId = setInterval(() => {
    gameFloor.appendChild(new Ghost(350, 350, wallsInfos, pacMan).getGhost());
  }, 10000);
}

// Create walls
const walls = wallsInfos.map((wall, i) => {
  const w = document.createElement('div');
  w.setAttribute('id', `wall-${i}`);
  w.style.width = `${wall.width}px`;
  w.style.height = `${wall.height}px`;
  w.style.border = '#3F51B5 7px double';
  w.style.boxSizing = 'border-box';
  w.style.borderRadius = '2px';
  w.style.backgroundColor = 'black';
  w.style.position = 'absolute';
  w.style.top = `${wall.top}px`;
  w.style.left = `${wall.left}px`;
  return w;
});

// Create Food
const foods = foodsPosition.map((p, i) => {
  const f = document.createElement('div');
  f.setAttribute('id', p.id);
  f.style.width = `${foodWidth}px`;
  f.style.height = `${foodHeight}px`;
  f.style.backgroundColor = foodColor;
  f.style.position = "absolute";
  f.style.top = `${p.top}px`;
  f.style.left = `${p.left}px`;
  return f;
});

export function GameOver() {
  const card = document.createElement('div');
  card.style.width = "300px";
  card.style.height = "300px";
  card.style.border = "solid 3px #3F51B5";
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.style.alignItems = "center";
  card.style.backgroundColor = "black";
  card.style.zIndex= 999;
  card.style.position = "absolute";
  card.style.left = `${widthFloor/2 - 150}px`;
  card.style.top = `${heightFloor/2 - 150}px`;
  const text = document.createElement('div');
  text.innerHTML = "Game Over";
  text.style.color = "red";
  text.style.fontWeight = "bold";
  text.style.fontSize = "40px";
  card.appendChild(text);
  gameFloor.appendChild(card);
}

function Victory() {
  const card = document.createElement('div');
  card.style.width = "300px";
  card.style.height = "300px";
  card.style.border = "solid 3px #3F51B5";
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.style.alignItems = "center";
  card.style.backgroundColor = "black";
  card.style.zIndex= 999;
  card.style.position = "absolute";
  card.style.left = `${widthFloor/2 - 150}px`;
  card.style.top = `${heightFloor/2 - 150}px`;
  const text = document.createElement('div');
  text.innerHTML = "You won!!";
  text.style.color = "red";
  text.style.fontWeight = "bold";
  text.style.fontSize = "40px";
  card.appendChild(text);
  gameFloor.appendChild(card);
}

// we inject the element on root
walls.forEach(wall => gameFloor.appendChild(wall));
foods.forEach(food => gameFloor.appendChild(food));
gameFloor.appendChild(pacMan.getPacMan());
screen.appendChild(gameFloor);
root.appendChild(screen);

// We create the ghosts
generateGhosts();
