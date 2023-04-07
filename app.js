let kittens = []
let affection = 5
let mood = ""
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */

// use later https://cdn.pixabay.com/photo/2013/07/12/19/22/cat-154641_960_720.png

function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    affection: 5,
    mood: "Tolerant"
  }
  kittens.push(kitten)
  saveKittens()
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem('kittens', JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = window.localStorage.getItem("kittens");
  let retrievedKittens = JSON.parse(storedKittens);
  if (retrievedKittens) {
    kittens = retrievedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */


function drawKittens() {
  let kittenListElement = document.getElementById("kittens")
  let kittenTemplate = ""
  kittens.forEach(kitten => {
    kittenTemplate += `
    <div class="kitten ${kitten.mood} p-2 card text-center gb-dark m-2">
    <img src="https://cdn.pixabay.com/photo/2013/07/12/19/22/cat-154641_960_720.png" class="kitten" height="200" width="200" alt="">
      <div class="mt-2" text-light>

      <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
      <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
      <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
      
      <div>
        <button class="fa-solid fa-hand" type="button" onclick="pet('${kitten.id}')">Pet Kitten</button>
        <button class="fa-solid fa-jar-wheat" type="button" onclick="catnip('${kitten.id}')">Give Catnip</button>
      </div>
      </div>
    </div>
    `
  })
  kittenListElement.innerHTML = kittenTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let randomNumber = Math.random()
  if (randomNumber > .5) {
    currentKitten.affection ++;
    setKittenMood(currentKitten)
    saveKittens() 
  } else {
    currentKitten.affection --;
    setKittenMood(currentKitten)
    saveKittens()
  }
}


/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "tolerant"
  currentKitten.affection = 5
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affection >= 6) {
    kitten.mood = "Happy"
  } if (kitten.affection <= 5) {
    kitten.mood = "Tolerant"
  } if (kitten.affection <= 3) {
    kitten.mood = "Angry"
  } if (kitten.affection <= 0) {
    kitten.mood = "Gone"
  }
  saveKittens()
}



/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.length = 0
  saveKittens()
  }

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  loadKittens()
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

