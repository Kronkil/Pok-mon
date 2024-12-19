let currentPokemon = null;

// Fetch the list of Pokémon and select a random one
async function fetchPokemonList() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1024"
    );
    const data = await response.json();
    const randomPokemon = getRandomPokemon(data.results); // Pick a random Pokémon
    const detailsResponse = await fetch(randomPokemon.url); // Get its details
    const details = await detailsResponse.json(); // Parse the details
    displayPokemon(details); // Display the selected Pokémon's image
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
  }
}

// Get a random Pokémon from the list
function getRandomPokemon(pokemonArray) {
  const randomIndex = Math.floor(Math.random() * pokemonArray.length);
  return pokemonArray[randomIndex];
}

// Display Pokémon image for guessing
function displayPokemon(pokemon) {
  currentPokemon = pokemon; // Store the current Pokémon's details
  const imageElement = document.getElementById("pokemon-image");
  imageElement.src = pokemon.sprites.front_default; // Show the Pokémon image
  imageElement.alt = "Guess the Pokémon!"; // Set alt text for accessibility
  document.getElementById("feedback").textContent = ""; // Clear feedback text
  document.getElementById("player-guess").value = ""; // Clear the input field
}

// Handle guess submission
function handleGuess() {
  const playerGuess = document
    .getElementById("player-guess")
    .value.trim()
    .toLowerCase(); // Get and sanitize player input
  if (!currentPokemon) return; // Ensure there is a current Pokémon to guess

  // Check if the player's guess matches the Pokémon's name
  if (playerGuess === currentPokemon.name) {
    document.getElementById("feedback").textContent = "✅ Correct! Well done!";
  } else {
    document.getElementById(
      "feedback"
    ).textContent = `❌ Incorrect! The Pokémon was ${currentPokemon.name}.`;
  }
}

// Handle new game
function startNewGame() {
  fetchPokemonList(); // Fetch a new random Pokémon for the new game
}

// Wire up event listeners
document.getElementById("submit-button").addEventListener("click", handleGuess);
document
  .getElementById("new-game-button")
  .addEventListener("click", startNewGame);

// Initialize the game by starting the first round
startNewGame();
