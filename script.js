// Data: Questions, Problems, and Solutions
const questions = [
    {
        problem: "Interop Woes: Switching networks multiple times, risky bridges, and wrapped assets causing headaches!",
        options: ["Use more bridges", "Real World Connectivity: Seamless integration with off-chain APIs directly in your smart contract", "Just switch wallets"],
        answer: 1,
        explanation: "Rialo enables direct connections to the real world, no need for bridges that weaken security."
    },
    {
        problem: "Wallets as Bottlenecks: Fragmented wallet UX, constant transaction signing!",
        options: ["Add more wallets", "Real World Usability: Bring familiar experiences like 2FA and social logins, with blockchain in the background", "Sign manually every time"],
        answer: 1,
        explanation: "Rialo makes usability easy, like Web2 apps, without wallet bottlenecks."
    },
    {
        problem: "Unpredictable Costs: Fees spike suddenly, sandwich attacks, oracle glitches causing losses!",
        options: ["Pay higher fees", "Real World Reactivity: Fast on-chain reactions without off-chain monitoring and gas wars", "Wait for the market to calm"],
        answer: 1,
        explanation: "Rialo provides quick and reliable reactivity, avoiding unexpected costs."
    },
    {
        problem: "Abandoning Your Social Identity: Have to start from scratch in crypto, leaving behind followers on TikTok/X!",
        options: ["Create a new Web3 account", "Real World Identity: Use email, SMS, or social accounts as your Web3 passport", "Import followers manually"],
        answer: 1,
        explanation: "Rialo brings your social identity directly into Web3, no need to start over."
    },
    {
        problem: "Reads Hurt: Data slow to reach users, apps glitch due to high latency!",
        options: ["Add more expensive indexers", "Real World Speed: Sub-second end-to-end latency for users and builders", "Refresh the page repeatedly"],
        answer: 1,
        explanation: "Rialo delivers real speed, fast data without slow layers."
    },
    {
        problem: "Drowning in Integrations: Devs waste time on third-party integrations, not business logic!",
        options: ["Hire more devs", "Real World Programmability: Ergonomics like Future/Promise, event-driven in smart contracts", "Use more libraries"],
        answer: 1,
        explanation: "Rialo makes programming easy and expressive, focus on core logic."
    },
    {
        problem: "The Oracle Tax: Oracles are expensive, failed transactions cause bad debt!",
        options: ["Pay more for oracles", "Real World Data: Pull live data via HTTPS one-liner in smart contract", "Monitor manually"],
        answer: 1,
        explanation: "Rialo integrates real-world data directly, without expensive oracles."
    },
    {
        problem: "Bridges the Necessary Evil: Bridges weaken Layer One security!",
        options: ["Use secure bridges", "Real World Scalability: Infinite scalability without needing bridges", "Avoid cross-chain"],
        answer: 1,
        explanation: "Rialo is globally scalable, without risky bridges."
    },
    {
        problem: "Endless Monitoring: Constant state monitoring, transactions lost in congestion!",
        options: ["Add monitoring servers", "Real World Reactivity: Automatic and reliable reactive transactions", "Pay high tips"],
        answer: 1,
        explanation: "Rialo eliminates expensive monitoring loops, instant reactions."
    },
    {
        problem: "The Most Expensive Piece of Paper: No 2FA, irreversible wallet hacks!",
        options: ["Use stronger passwords", "Real World Usability: 2FA, scheduled transactions, like Web2 security", "Backup seed phrase"],
        answer: 1,
        explanation: "Rialo brings familiar security like 2FA to Web3."
    }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const mainGame = document.getElementById('main-game');
const endScreen = document.getElementById('end-screen');

const playerNameInput = document.getElementById('player-name-input');
const startGameBtn = document.getElementById('start-game-btn');
const playAgainBtn = document.getElementById('play-again-btn');

const playerNameDisplay = document.getElementById('player-name-display');
const playerHealthText = document.getElementById('player-health-text');
const monsterHealthText = document.getElementById('monster-health-text');
const playerHealthBar = document.getElementById('player-health-bar');
const monsterHealthBar = document.getElementById('monster-health-bar');

const statsContainer = document.getElementById('stats-container');

const problemText = document.getElementById('problem-text');
const optionButtons = document.querySelectorAll('.option-btn');
const feedbackText = document.getElementById('feedback-text');
const explanationText = document.getElementById('explanation-text');
const nextQuestionBtn = document.getElementById('next-question-btn');
const endMessage = document.getElementById('end-message');

// Game State
let playerName = "Hero";
let playerHealth = 5;
let monsterHealth = 5;
const MAX_HEALTH = 5;
let currentQuestionIndex = 0;
let shuffledQuestions = [];

// Functions
function startGame() {
    playerName = playerNameInput.value.trim() || "Hero";
    playerNameDisplay.textContent = `${playerName} the Rialo Hero`;
    playerHealth = MAX_HEALTH;
    monsterHealth = MAX_HEALTH;
    currentQuestionIndex = 0;
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    mainGame.classList.remove('hidden');
    
    // Hapus gambar monster kalah jika ada dari game sebelumnya
    const existingImage = endScreen.querySelector('.monster-lose-image');
    if (existingImage) {
        existingImage.remove();
    }
    // Kembalikan style endScreen ke semula
    endScreen.style.position = '';

    updateStats();
    displayQuestion();
}

function updateStats() {
    playerHealthText.textContent = `${playerHealth}/${MAX_HEALTH}`;
    monsterHealthText.textContent = `${monsterHealth}/${MAX_HEALTH}`;
    playerHealthBar.style.width = `${(playerHealth / MAX_HEALTH) * 100}%`;
    monsterHealthBar.style.width = `${(monsterHealth / MAX_HEALTH) * 100}%`;
}

function displayQuestion() {
    feedbackText.textContent = '';
    explanationText.textContent = '';
    feedbackText.className = '';
    nextQuestionBtn.classList.add('hidden');
    optionButtons.forEach(btn => btn.disabled = false);

    const rawQuestion = shuffledQuestions[currentQuestionIndex];
    const question = shuffleOptionsAndAnswer(rawQuestion);

    window.currentQuestion = question;

    problemText.textContent = `Monster: "${question.problem}"`;
    optionButtons.forEach((button, index) => {
        button.textContent = question.options[index];
        button.dataset.choice = index;
    });
}

function checkAnswer(choice) {
    optionButtons.forEach(btn => btn.disabled = true);
    nextQuestionBtn.classList.remove('hidden');

    const question = window.currentQuestion;
    if (choice === question.answer) {
        monsterHealth = Math.max(0, monsterHealth - 1);
        feedbackText.textContent = "Correct! The monster's health decreases.";
        feedbackText.classList.add('correct');
    } else {
        playerHealth = Math.max(0, playerHealth - 1);
        feedbackText.textContent = "Wrong! Your health decreases.";
        feedbackText.classList.add('wrong');
    }
    explanationText.textContent = `Rialo's power: ${question.explanation}`;
    updateStats();

    if (playerHealth <= 0 || monsterHealth <= 0) {
        setTimeout(endGame, 1200);
    }
}

function nextRound() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endGame();
    } else {
        displayQuestion();
    }
}

function endGame() {
    mainGame.classList.add('hidden');
    endScreen.classList.remove('hidden');

  if (monsterHealth <= 0) {
    endMessage.textContent = `Congratulations, ${playerName}! You defeated the Monster of Web3 Problems. Rialo is the solution!`;
    
    // Cek apakah gambar sudah ada agar tidak ditambahkan berulang kali
    if (!document.querySelector('.monster-lose-image')) {
        // 1. Buat elemen <img> baru
        const loseImage = document.createElement('img');
        loseImage.src = 'img/monster_lose.jpg';
        loseImage.className = 'monster-lose-image';

        // 2. Atur style agar gambar menjadi background
        loseImage.style.position = 'absolute';
        loseImage.style.top = '0';
        loseImage.style.left = '0';
        loseImage.style.width = '100%';
        loseImage.style.height = '100%';
        loseImage.style.objectFit = 'cover';
        loseImage.style.zIndex = '0'; // << PERUBAHAN DI SINI
        loseImage.style.opacity = '0.7'; 
        
        // 3. Atur style parent (end-screen) agar posisi absolut bekerja
        endScreen.style.overflow = 'hidden';

        // 4. Tambahkan gambar ke dalam div end-screen
        endScreen.prepend(loseImage);

        // Pastikan teks dan tombol berada di atas gambar
        endMessage.style.position = 'relative';
        endMessage.style.zIndex = '1';
        playAgainBtn.style.position = 'relative';
        playAgainBtn.style.zIndex = '1';
    }
} else {
    endMessage.textContent = `Oh no, ${playerName}! You were defeated. Try again and master the power of Rialo!`;
}
}

function shuffleOptionsAndAnswer(question) {
    const options = [...question.options];
    const correctAnswerText = question.options[question.answer];
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    const newAnswerIndex = options.indexOf(correctAnswerText);
    return {
        ...question,
        options,
        answer: newAnswerIndex
    };
}

// Event Listeners
startGameBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', () => {
    endScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});
optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        checkAnswer(parseInt(button.dataset.choice));
    });
});
nextQuestionBtn.addEventListener('click', nextRound);