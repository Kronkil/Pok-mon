// Fetch the first 20 Pokémon
async function fetchPokemonList() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    for (const pokemon of data.results) {
      fetchPokemonDetails(pokemon.url);
    }
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
  }
}
