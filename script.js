// Fetch the first 1025 Pokémon
async function fetchPokemonList() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1025"
    );
    const data = await response.json();
    for (const pokemon of data.results) {
      fetchPokemonDetails(pokemon.url);
    }
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
  }
}

let currentPokemon = null;

// Fetch a list of Pokémon and select one at random
async function fetchPokemonList() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await response.json();
    const randomPokemon = getRandomPokemon(data.results);
    const detailsResponse = await fetch(randomPokemon.url);
    const details = await detailsResponse.json();
    displayPokemon(details);
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
  }
}

// Get a random Pokémon
function getRandomPokemon(pokemonArray) {
  const randomIndex = Math.floor(Math.random() * pokemonArray.length);
  return pokemonArray[randomIndex];
}

// Display Pokémon image for guessing
function displayPokemon(pokemon) {
  currentPokemon = pokemon;
  const imageElement = document.getElementById("pokemon-image");
  imageElement.src = pokemon.sprites.front_default;
  imageElement.alt = "Guess the Pokémon!";
  document.getElementById("feedback").textContent = "";
  document.getElementById("player-guess").value = "";
}

// Handle guess submission
function handleGuess() {
  const playerGuess = document
    .getElementById("player-guess")
    .value.trim()
    .toLowerCase();
  if (!currentPokemon) return;

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
  fetchPokemonList();
}

// Wire up event listeners
document.getElementById("submit-button").addEventListener("click", handleGuess);
document
  .getElementById("new-game-button")
  .addEventListener("click", startNewGame);

// Initialize the game
startNewGame();
