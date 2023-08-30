const inputBuscar = document.getElementById("buscar");
const divBusqueda = document.getElementById("busqueda");
const botonBuscar = document.getElementById("btn-buscar");
const logo = document.getElementById("logo");
const nav = document.getElementById("nav");
const pokeName =document.getElementById('str');
const contenedor =document.getElementById("contenedor2")
const colores = {
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


//-----------------------------SALIR DE BUSQUEDA
function salir() {
  inputBuscar.value = "";
  divBusqueda.style.display = "none";
  inputBuscar.style.display = "flex";
  nav.style.backgroundColor = "#ff5252";
  nav.style.border = "3px solid #ff5252";
  nav.style.boxShadow = "5px 5px 4px 2px rgba(0, 0, 0, 0.5)";
  contenedor.innerHTML = '';
}
//------------------------------ busqueda con enter
inputBuscar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscar();
  }
});
//----------------------------- Busqueda con boton
let pokemonBuscado;
function buscar() {
  divBusqueda.style.display = "flex";
  inputBuscar.style.display = "none";
  nav.style.backgroundColor = "#0d0d0df1";
  nav.style.border = "3px solid black";
  nav.style.boxShadow = "2px 2px 4px #4dd5ffe7";
  botonBuscar.style.margin = "auto";
  pokemonBuscado=inputBuscar.value
  console.log("kkkkk",pokemonBuscado)
  //------------------------------ validacion de datos vacios
  if (pokemonBuscado === "") {
    alert("No escribiste ningun pokemon");
    pokemonBuscado.value = "";
    salir();
    return;
  }
  function traerPokemon(pokemonInfo) {
    const url = fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonBuscado.toLowerCase()}`
    );
    url
      .then((response) => response.json())
      .then((data) => {
        pokemonInfo(data);
      });
  }
  traerPokemon(data =>{
    pokeName.textContent =data.name.toUpperCase();
    const poke_types = data.types.map((type) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const color = colores[type];


    const article = document.createRange().createContextualFragment(`
      <div class="img-container2">
        <img src= https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg alt=${data.name}/>
      </div>
      <div class="info2">
      <div class="caja2"
          <span class="number2">#${data.id
            .toString()
            .padStart(3, "0")}</span>
          <h3 class="name2">NOMBRE : ${data.name}</h3>
          <small class="type2">Tipo: <span>${type}</span></small>
       </div>   
        </div></>
    `);
    const main = document.getElementById("contenedor2");
    main.style.backgroundColor = color;
    main.append(article)
  })
}
