
const game = document.querySelector('#game'),
      start = document.querySelector('#start'),
      btnStart = document.querySelector('#start button'),
      imgSound = document.querySelector('#sound img'),
      audio = document.querySelector('#audio'),
      player = document.querySelector('#player'),
      lifes = document.querySelector('#lifes'),
      widthWindow = document.querySelector('body').clientWidth,
      heightApp = document.querySelector('#app').clientHeight,
      enemyType2 = document.querySelector('.enemy.type-2'),
      score = document.querySelector('#score span');

let countScore = 0;
let countLifes = 3;

// start game
btnStart.addEventListener('click', () => {
    startGame();
});


// Work whith lifes

function heartCreated() {
    
        lifes.innerHTML = "";
    let count = 0;
    while(count < countLifes){
        let span = document.createElement('span');
        lifes.append(span);

        count++;
    }
}

function die(){
    countLifes = countLifes - 1;
    if(countLifes <= 0) {
        alert('GAME OVER');
    }
    heartCreated();
}


// on or off sound
imgSound.addEventListener('click', () => {

    if(!imgSound.classList.contains('soundOn')){
        imgSound.classList.add('soundOn');
        audio.play();
        imgSound.src = 'images/sound_on.png';
    } else{
        imgSound.classList.remove('soundOn');
        audio.pause();
        imgSound.src = 'images/mute_sound.png';
    }
});

// after click btn 'Start'
function startGame() {
    start.style.display = 'none';
    game.style.display = 'block';

    createEnemy();
    playerControl();
    heartCreated();
}

// move playear


// Work whith Playear
function playerControl() {
    document.addEventListener('keydown', (e) => {
    if (e.keyCode === 87 && player.offsetTop > 0){
        player.style.top = player.offsetTop - 30 + 'px';
    } else if(e.keyCode === 83 && player.offsetTop < document.documentElement.clientHeight - 200) {
        player.style.top = player.offsetTop + 30 + 'px';
    }

    if(e.keyCode === 32){
        bulletCreate();
    }
    
    });
}

// work whith enemy

function createRandomEnemy() {
    let randomNum = Math.floor(Math.random() * 2)
    return randomNum;
}

function createEnemy(){
    let enemyCreated = document.createElement('div');

    const classEnemy = ['enemy type-1', 'enemy type-1'];
    

    enemyCreated.className = 'enemy type-1';
    enemyCreated.style.top = Math.random() * (heightApp - 100) + 'px';
    game.append(enemyCreated);
    moveEnemy(enemyCreated);
}

function moveEnemy(en) {
    let idTimer = setInterval(() => {
        en.style.left = en.offsetLeft - 10 + 'px';
        if(en.offsetLeft < -100) {
            die();
            en.remove();
            createEnemy();
            clearInterval(idTimer);
        }
    }, 50);
}

// Work whith bullet

function bulletCreate() {
    let bulletNew = document.createElement('div');
        bulletNew.className = 'bullet';

    bulletNew.style.top = player.offsetTop + 138 + 'px';
    bulletNew.style.left = player.offsetLeft + player.clientWidth - 25 + 'px'; //becouse bullet corect start
    game.append(bulletNew);
    shutingBullet(bulletNew);
}

function shutingBullet(bullet) {
    let idTimer = setInterval(() => {
        bullet.style.left = bullet.offsetLeft + 10 + 'px';

        if(bullet.offsetLeft > widthWindow) {
            bullet.remove();
            clearInterval(idTimer);
        }
        isBoom(bullet);
    }, 20);
}


// sector meeting bullet whith enemy

function isBoom(bullet) {
    let enemy = document.querySelector('.enemy');

    if (bullet.offsetTop > enemy.offsetTop
        && bullet.offsetTop < enemy.offsetTop + enemy.clientHeight
        && bullet.offsetLeft > enemy.offsetLeft) {
            boomCreate(bullet.offsetLeft, bullet.offsetTop);
            bullet.remove();
            enemy.remove();
            createEnemy();

            score.innerHTML = ++countScore
        }
}

function boomCreate(left, top) {
    let boom = document.createElement('div');
    boom.className = 'boom';
    boom.style.left = left - 100 + 'px';
    boom.style.top = top - 100 + 'px';
    game.append(boom);

    let idTimer = setInterval(() => {
        boom.remove();
        clearInterval(idTimer)
    }, 600);
}


