const pokeContent = document.getElementById("pokedexContenido");
let pokeForm = document.getElementById("buscar");
const modalSearch = document.getElementById("pokedexContenido");
const divGeneration = document.getElementById("botonera");
//-------------------------------------------------------------- colores
const colors = {
  fire: "#FCA004",
  grass: "#01A759",
  electric: "#F2E529",
  water: "#0487D9",
  ground: "#D9BFA0",
  rock: "#735135",
  poison: "#D35DE8",
  bug: "#DDF72F",
  dragon: "#9CC1D9",
  psychic: "#FF9AC7",
  flying: "#B9DFFF",
  fighting: "#F24C3D",
  normal: "#FFFACD",
  undefined: "#69A7BF",
};
let numeroPagina = 1;
function paginacion(gen) {
  const pokemonGen = {
    1: [1, 50],
    2: [51, 100],
    3: [101, 150],
    4: [151, 200],
    5: [201, 250],
    6: [251, 300],
    7: [351, 386],
  };

  const pokemonGenDefault = [1, 50];
  const generacion = pokemonGen[gen] || pokemonGenDefault;
  return generacion;
}
//-------------------------------------------------------------control paginacion
let rangoPagina = paginacion(numeroPagina);
//------------- avanzar
let siguienteP = document
  .getElementById("siguiente")
  .addEventListener("click", (e) => {
    if (numeroPagina < 7) {
      modalSearch.innerHTML = "";
      numeroPagina++;
      rangoPagina = paginacion(numeroPagina);
      drawPokemon();
    }
  });
//------------ retroceder
let anteriorP = document
  .getElementById("antes")
  .addEventListener("click", (e) => {
    if (numeroPagina > 1) {
      modalSearch.innerHTML = "";
      numeroPagina -= 1;
      rangoPagina = paginacion(numeroPagina);
      drawPokemon();
    }
  });
//------------- dibuja pokemones
async function drawPokemon() {
  for (let i = rangoPagina[0]; i <= rangoPagina[1]; i++) {
    await getPokemon(i);
  }
}

const getPokemon = async (id, modal) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const rest = await fetch(url);
  const pokemon = await rest.json();
  createPokemon(pokemon, modal);
};

//-------------------------------------------pintar card pokemon
const main_types = Object.keys(colors);

function createPokemon(pokemon, modal) {
  const pokemonEl = document.createElement("div");

  pokemonEl.classList.add("pokemon");

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;
  
  if (modal !== true) {
    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
              .toString()
              .padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;
    pokedexContenido.appendChild(pokemonEl);
  } else {
    const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
              .toString()
              .padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
        </div>
    
    </div>`;

    modalSearch.innerHTML = pokeInnerHTML;
  }
}
drawPokemon();

/*-------------------------------------------Buscar pokemon*/

pokeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchPokemon = document.getElementById("pokemon").value;
  getPokemon(searchPokemon, true);
});

function exitModal() {
  const modalPokemon = document.getElementById("modalPokemon");
  modalPokemon.style.display = "none";
  drawPokemon();
}
