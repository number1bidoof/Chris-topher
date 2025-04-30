// Global Varribles
const classes = ("Ninja","Knight","Wizard","Monk");
const items = ("swords", "potions", "stick","bomb", "compass", "dirt", "money", "ice");
let user;
let stats = {"Strength":0,"Speed":0,"Intlligence":0,"Defense":0};
let aspects = new Array; //Will add late inside the first screen
let userCollection; // Displays the users items
// First Screen: Charater Customization
function firstScreen() {
    let spinor = document.createElement('img') // creates the object
    spinor.setAttribute("src", "FullMoon2010.jpg")// loads in the gif file
    spinor.setAttribute("id","spinor") // sets the id of the spinor
    document.getElementById("myDiv").appendChild(spinor); // Adds it to the user div 
    let nameChoice = String(prompt("What is your name?")) // First choice: users name
    randomBit = (Math.random()*11)
    if (user != null) {
        let randomBit = (Math.random()*11)
        document.getElementById("myDiv").addEventListener("click", function (){ // if the user clicks the moon
            
            userCollection.push(items[randomBit]) // randomizes the item the user has
            nameChoice.toLocaleUpperCase = nameChoice



        })
        
    } else {
        throw error 
    }
    

}
