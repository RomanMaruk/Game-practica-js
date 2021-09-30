
const game = document.querySelector('#game'),
      start = document.querySelector('#start'),
      imgSound = document.querySelector('#sound img'),
      audio = document.querySelector('#audio'),
      player = document.querySelector('#player'),
      lifes = document.querySelector('#lifes'),
      widthWindow = document.querySelector('body').clientWidth,
      enemyType2 = document.querySelector('.enemy.type-2');

// console 

// start game
start.addEventListener('click', () => {
    startGame()
});


// on or off sound
imgSound.addEventListener('click', () => {

    if(!imgSound.classList.contains('soundOn')){
        imgSound.classList.add('soundOn')
        audio.play();
        imgSound.src = 'images/sound_on.png'
    } else{
        imgSound.classList.remove('soundOn')
        audio.pause();
        imgSound.src = 'images/mute_sound.png'
    }
});

// after click btn 'Start'
function startGame() {
    start.style.display = 'none';
    game.style.display = 'block';

    createEnemy();
    playerControl()
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

function createEnemy(){
    let enemyCreated = document.createElement('div');

    // let enemyClass = ['enemy type-1', 'enemy type-2'];
    // let randomEnemmy = Math.random() * enemyClass.length;

    enemyCreated.className = 'enemy type-1';
    enemyCreated.style.top = Math.random() * 600 + 'px'
    game.append(enemyCreated);
    moveEnemy(enemyCreated);
}

function moveEnemy(en) {
    let idTimer = setInterval(() => {
        en.style.left = en.offsetLeft - 10 + 'px';
        if(en.offsetLeft < -100) {
            en.remove();
            createEnemy();
            clearInterval(idTimer);
        }
    }, 70);
}

// Work whith bullet

function bulletCreate() {
    let bulletNew = document.createElement('div');
        bulletNew.className = 'bullet';

    bulletNew.style.top = player.offsetTop + 138 + 'px';
    bulletNew.style.left = player.offsetLeft + player.clientWidth - 25 + 'px' //becouse bullet corect start
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
            bullet.remove();
            enemy.remove();
            createEnemy();
    }

}






// btnPlayOne.onclick = function('audio/1.mp3') {
//     source.src = 'audio/1.mp3';
//     player.load();
//     player.play();
// }

// btnPlayTwo.onclick = function() {
//     source.src = 'audio/Stay.mp3';
//     player.load();
//     player.play();
// }

