let currentAspect = 0;

const aspectTypes = [
    ["Knight", "Ninja", "Wizard", "Monk"], // Classes
    ["LOW", "AVERAGE", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Strength
    ["LOW", "AVERAGE", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Speed
    ["LOW", "AVERAGE", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Intelligence
    ["Super Strength", "Invisibility", "Teleportation", "Healing"], // Abilities
    ["Sword", "Potion", "Stick", "Bomb", "Compass", "Dirt", "Money", "Ice"] // Items
];

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
            console.log("cycling")
            clearInterval(interval);
            selectedAspects.push(randomAspect);
            currentAspect++;

            moonButton.disabled = false;
            moonButton.style.opacity = "1"; // show it's clickable again
            moonButton.children[0].src = 'Art/moon_basic.png'; // reset the image

            if (currentAspect >= aspectTypes.length) {
                music1.pause();
                const music2 = new Audio('Music/Battle.mp3');
                music2.loop = true;
                music2.play();
                moonButton.disabled = true;
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

const music1 = new Audio('Music/Menu.mp3');
document.querySelector('button').addEventListener('click', () => {
    music1.loop = true;
    music1.play();
});

function nextPage1() {
    window.location.href = 'boss1.html';
}

function startGame() {
    window.location.href = 'character.html';
    
}

function restartGame() {
    window.location.href = 'index.html'
}