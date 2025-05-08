// This is Gabe writing this, Just adding that the music and sfx are done in this js file.
// Thank you Lucas for being a good sport.

let failed = false; // Variable to track if the player has failed
let currentAspect = 0;

const aspectTypes = [
    ["Knight", "Ninja", "Wizard", "Monk"], // Classes
    ["LOW", "AVERAGE", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Strength
    ["LOW", "AVERAGE", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Speed
    ["LOW", "AVERAGE", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Intelligence
    ["Super Strength", "Invisibility", "Teleportation", "Healing"], // Abilities
    ["Basic Sword", "Speed Potion", "Long Sword", "Jordans", "Thinking Hat", "JS textbook"] // Items
];

class Person {
    constructor() {
        this.class = ''
        this.strength = ''
        this.speed = ''
        this.intelligence = ''
        this.ability = ''
        this.item = ''
    }
}

const chiikawa = new Person();
chiikawa.class = "Ninja"; 
chiikawa.strength = "LOW";
chiikawa.speed = "AVERAGE";
chiikawa.intelligence = "LOW";
chiikawa.ability = "Teleportation";
chiikawa.item = "Basic Sword";

// BOSS 2
const ethan = new Person();
ethan.class = "Knight"; 
ethan.strength = "EPIC";
ethan.speed = "EPIC";
ethan.intelligence = "AVERAGE";
ethan.ability = "Teleportation";
ethan.item = "Jordans";

// //BOSS 3
const christopher = new Person();
christopher.class = "Wizard"; 
christopher.strength = "UNIVERSAL";
christopher.speed = "EPIC";
christopher.intelligence = "UNIVERSAL";
christopher.ability = "Super Strength";
christopher.item = "Thinking Hat";

const classColors = {

};

const aspectColors = {
    "Knight": "red",
    "Ninja": "blue",
    "Monk": "orange",
    "Wizard": "purple",

    "LOW": "grey",
    "AVERAGE": "white",
    "HIGH": "yellow",
    "EPIC": "purple",
    "DIVINE": "gold",
    "UNIVERSAL": "pink"
};

const aspectLabels = ["CLASS", "STRENGTH", "SPEED", "INTELLIGENCE", "ABILITY", "ITEM"];

let hero = new Person();
let villain = new Person();

let selectedAspects = [];

function cycleAspect() {
    const moonButton = document.querySelector('.moon-button');
    // Gabe adding stuff to make the moon spin (accessing the image inside of the button) 
    moonButton.children[0].src = 'Art/moon_animation.gif';

    let cycleCount = 0;
    const displayElement = document.getElementById('aspect-name');

    const interval = setInterval(() => {
        const click = new Audio('Music/ClickSFX.mp3');
        click.play();
        const aspectsArray = aspectTypes[currentAspect];
        const randomAspect = aspectsArray[Math.floor(Math.random() * aspectsArray.length)];

        displayElement.innerHTML = `${aspectLabels[currentAspect]}: <span style="color: ${aspectColors[randomAspect]}">${randomAspect}</span>`;
        cycleCount++;

        if (moonButton) {
            moonButton.disabled = true;
            moonButton.style.opacity = "0.5"; //  show it's disabled
        }

        if (cycleCount >= 20) {
            switch (randomAspect) {
                case "LOW":
                    new Audio('Music/BadSFX.mp3').play();
                    break;
                case "AVERAGE":
                    new Audio('Music/BadSFX.mp3').play();
                    break;
                case "HIGH":
                    new Audio('Music/OkaySFX.mp3').play();
                    break;
                case "EPIC":
                    new Audio('Music/OkaySFX.mp3').play();
                    break;
                case "DIVINE":
                    new Audio('Music/GoodSFX.mp3').play();
                    break;
                case "UNIVERSAL":
                    new Audio('Music/GoodSFX.mp3').play();
                    break;
            }
            clearInterval(interval);
            selectedAspects.push(randomAspect);
            currentAspect++;

            moonButton.disabled = false;
            moonButton.style.opacity = "1"; // show it's clickable again
            moonButton.children[0].src = 'Art/moon_basic.png'; // reset the image

            if (currentAspect >= aspectTypes.length) {
                // Stop menu music, play battle music
                musicMenu.pause();
                musicBattle.play();
                moonButton.remove()

                hero.class = selectedAspects[0];
                hero.strength = selectedAspects[1];
                hero.speed = selectedAspects[2];
                hero.intelligence = selectedAspects[3];
                hero.ability = selectedAspects[4];
                hero.item = selectedAspects[5];
                
                document.body.style.backdropFilter = "blur(10px)";
                document.body.style.borderRadius = "15px";
                document.body.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                
                displayElement.innerHTML = 
                // I use span here to color the text and not interfere with the HTML structure
                `
                <strong>CHARACTER ASPECTS:</strong><br>
                CLASS: <span style="color: ${aspectColors[selectedAspects[0]] }">${selectedAspects[0]}</span><br>
                STRENGTH: <span style="color: ${aspectColors[selectedAspects[1]] }">${selectedAspects[1]}</span><br>
                SPEED: <span style="color: ${aspectColors[selectedAspects[2]]}">${selectedAspects[2]}</span><br>
                INTELLIGENCE: <span style="color: ${aspectColors[selectedAspects[3]]}">${selectedAspects[3]}</span><br>
                ABILITY: ${selectedAspects[4]}<br>
                ITEM: ${selectedAspects[5]}`;

                const classImage = document.getElementById('class-image');
                classImage.src = `Art/${selectedAspects[0].toLowerCase()}-image.png`;
                classImage.style.display = "block";

                document.querySelector('.nextPage1').style.display = 'inline-block';
            }
        }
    }, 100);
}



//reutrns true if hero wins
//returns false if villain wins
function bossFight(hero, villain) {
    let heroValue = calcualteFightValue(hero);
    let villainValue = calcualteFightValue(villain);

    return heroValue > villainValue;
}
//Just make 2 more of these for the next boss fights
function startBossFight() { 
    musicBattle.play();
    const resultDisplay = document.getElementById('battle-result');

    const heroObjString = localStorage.getItem('hero');
    const villainObjString = localStorage.getItem('villain');

    hero = JSON.parse(heroObjString);
    villain = JSON.parse(villainObjString);


    const didWin = bossFight(hero, villain);

    if (didWin) {
        resultDisplay.innerHTML = "<strong>You beat chiikawa.</strong>";
        document.querySelector('.nextPage2').style.display = 'inline-block';
    } else {
        failed = true; 
        fail.play();
        musicBattle.pause();
        resultDisplay.innerHTML = "<strong>You were defeated by chiikawa. HAHA! LOSER!</strong>";
    }

}

function startBossFight2() { 
    const resultDisplay = document.getElementById('battle-result');

    const heroObjString = localStorage.getItem('hero');
    const villainObjString = localStorage.getItem('villain2');

    hero = JSON.parse(heroObjString);
    villain = JSON.parse(villainObjString);


    const didWin = bossFight(hero, villain);

    if (didWin) {
        resultDisplay.innerHTML = "<strong>You beat ethan.</strong>";
        document.querySelector('.nextPage2').style.display = 'inline-block';
    } else {
        fail.play();
        if (!musicBattle.paused) {
            musicBattle.pause();
        }
        failed = true; 
        musicBattle.pause();
        resultDisplay.innerHTML = "You were defeated by Mr. ethan. <strong>-10 million participation points.</strong>";
    }

}

function startBossFight3() { 
    const resultDisplay = document.getElementById('battle-result');

    const heroObjString = localStorage.getItem('hero');
    const villainObjString = localStorage.getItem('villain3');

    hero = JSON.parse(heroObjString);
    villain = JSON.parse(villainObjString);


    const didWin = bossFight(hero, villain);

    if (didWin) {
        resultDisplay.innerHTML = "<strong>You beat Christopher.</strong>";
        document.querySelector('.nextPage2').style.display = 'inline-block';
    } else {
        failed = true; 
        fail.play();
        musicBattle.pause();
        resultDisplay.innerHTML = "<strong>You were defeated by Christopher. You cannot defeat the JS master.</strong>";
    }

}

function calcualteFightValue(person) {
    let fightSum = 0;

    let strength = 1;
    let speed = 1;
    let intelligence = 1;

    strength += findAspectValue(aspectTypes[1], person.strength);
    speed += findAspectValue(aspectTypes[2], person.speed);
    intelligence += findAspectValue(aspectTypes[3], person.intelligence);

    switch (person.ability) {
        case "Super Strength":
            strength += strength * 1.5;
            break;

        case "Invisibility":
        case "Teleportation":
            speed += speed * 1.5;
            intelligence += intelligence * 1.2;
            break;

        case "Invisibility":
            intelligence += intelligence * 1.5;
            break;
    }

    switch (person.item) {
        case "Basic Sword":
            strength += strength * 1.5;
            break;

        case "Speed Potion":
            speed += speed * 2;
            break;

        case "Long Sword":
            strength += strength * 2;
            break;

        case "Jordans":
            speed += speed * 3;
            break;

        case "Thinking Hat":
            intelligence += intelligence * 3;
            break;

        case "JS textbook":
            intelligence += intelligence * 4;
            break;
    }

    switch(person.class) {
        case "Knight":
            strength += strength * 2;
            break;

        case "Ninja":
            speed += speed * 2;
            break;

        case "Wizard":
            intelligence += intelligence * 2;
            break;

        case "Monk":
            strength += strength * 1.5;
            intelligence += intelligence * 1.5;
            break;
    }

    return strength + speed + intelligence;
}

function findAspectValue(aspects, value) {
    const index = aspects.indexOf(value); // index will be 1

    if (index >= 0) {
        return index;
    } else {
        return 0;
    }
}


const fail = new Audio('Music/Death.mp3');
const musicMenu = new Audio('Music/Menu.mp3');
const musicBattle = new Audio('Music/Battle.mp3');
musicMenu.loop = true;
musicBattle.loop = true;
if (document.querySelector('.moon-button')) { // If moon button exists, add event listener
    document.querySelector('.moon-button').addEventListener('click', () => {
        musicMenu.play();
    });
}
if (document.querySelector('.fight-button')) { // If fight button exists, add event listener
    document.querySelector('.fight-button').addEventListener('click', () => {
        if (!failed) {
            musicBattle.play();
        }
    });
}


function nextPage1() {
    localStorage.setItem('hero', JSON.stringify(hero));
    localStorage.setItem('villain', JSON.stringify(chiikawa));

    window.location.href = 'boss1.html';
    console.log("hero");
    musicBattle.play();
}

function nextPage2() {
    localStorage.setItem('hero', JSON.stringify(hero));
    localStorage.setItem('villain2', JSON.stringify(ethan));

    window.location.href = 'boss2.html';
}

function nextPage3() {
    localStorage.setItem('hero', JSON.stringify(hero));
    localStorage.setItem('villain3', JSON.stringify(christopher));

    window.location.href = 'boss3.html';
}

function nextPage4() {
    localStorage.setItem('hero', JSON.stringify(hero));
    localStorage.setItem('villain3', JSON.stringify(christopher));

    window.location.href = 'win.html';
}

function startGame() {
    window.location.href = 'character.html';
    
}

function restartGame() {
    window.location.href = 'index.html'
}