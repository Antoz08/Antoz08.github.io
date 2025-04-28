let score = 0; 
let gameInterval; 


const holes = document.querySelectorAll('.hole'); 
const scoreDisplay = document.getElementById('score'); // mostra il punteggio
const startButton = document.getElementById('start-button'); //  "Inizia"
const restartButton = document.getElementById('restart-button'); //  "Restart"

// buco casuale visualizzare la talpa
function randomHole() {
    holes.forEach(hole => hole.classList.remove('active')); // Rimuoverer talpe attive
    const randomIndex = Math.floor(Math.random() * holes.length); // buco casuale
    holes[randomIndex].classList.add('active'); // la classe "active"
}

// start the game
function startGame() {
    if (!gameInterval) { // verifica che il gioco non sia già in corso
        score = 0; // Resetta ounteggio
        scoreDisplay.textContent = score; // aggiorna il punteggio a schermo
        gameInterval = setInterval(randomHole, 1000); // fa apparire una talpa ogni secondo
          
        startButton.disabled = true; // disabilita il pulsante "Inizia" mentre il gioco è attivo
    }
}

// re sstart the game
function restartGame() {
    clearInterval(gameInterval); // Ferma gioco 
    gameInterval = null; // resetta la variabile intervallo
    startGame(); // riavvia il gioco
}


holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('active')) { 
            score++; 
            scoreDisplay.textContent = score; 
            hole.classList.remove('active'); 
        }
    });
});


startButton.addEventListener('click', startGame); // Bottone "Inizia"
restartButton.addEventListener('click', restartGame); // Bottone "Restart"


const maxTime = 40; // Tempo massimo in secondi
let timeLeft = maxTime; // Variabile per il conto alla rovescia

const timeDisplay = document.getElementById('time-left');
function startGame() {
    if (!gameInterval) {
        score = 0;
        scoreDisplay.textContent = score;
        timeLeft = maxTime; // Resetta il tempo
        timeDisplay.textContent = timeLeft; // Aggiorna il tempo a schermo

        gameInterval = setInterval(() => {
            randomHole(); // Fa apparire una talpa
            timeLeft--;
            timeDisplay.textContent = timeLeft; // Aggiorna il conto alla rovescia

            if (timeLeft <= 0) { // Se il tempo è finito
                clearInterval(gameInterval); // Ferma il gioco
                alert("Tempo scaduto! Punteggio finale: " + score);
                startButton.disabled = false; // Riabilita il pulsante "Inizia"
            }
        }, 1000); // Ogni secondo

        startButton.disabled = true; // Disabilita il pulsante "Inizia"
    }

}
// Crea l'elemento martello e aggiungilo al body
const hammer = document.createElement('div');
hammer.id = 'hammer';
document.body.appendChild(hammer);

// fa seguire il martello al movimento del mouse
document.addEventListener('mousemove', (e) => {
    hammer.style.left = `${e.pageX - 25}px`; // Centra il martello rispetto al cursore
    hammer.style.top = `${e.pageY - 25}px`;
});

document.addEventListener('click', () => {
    hammer.style.transform = 'rotate(20deg)'; // Ruota il martello per simulare il colpo
    setTimeout(() => {
        hammer.style.transform = 'rotate(0deg)'; // Torna alla posizione originale
    }, 100); // Dopo 100ms
});

// Fa seguire il martello al movimento del mouse
document.addEventListener('mousemove', (e) => {
    hammer.style.left = `${e.pageX - 25}px`; // Posiziona il martello
    hammer.style.top = `${e.pageY - 25}px`;

    // Verifica se il cursore si trova sopra una delle buche
    let isOverHole = false;
    holes.forEach(hole => {
        const rect = hole.getBoundingClientRect(); // Ottiene la posizione della buca
        if (
            e.pageX >= rect.left &&
            e.pageX <= rect.right &&
            e.pageY >= rect.top &&
            e.pageY <= rect.bottom
        ) {
            isOverHole = true; // Il cursore è sopra una buca
        }
    });

    // Mostra o nasconde il martello
    if (isOverHole) {
        hammer.style.visibility = 'visible'; // Mostra il martello
    } else {
        hammer.style.visibility = 'hidden'; // Nasconde il martello
    }
});