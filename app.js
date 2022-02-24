const app = document.querySelector(".app");
let frag = document.createDocumentFragment();
window.addEventListener("load",()=>{
  
    const ajax = new XMLHttpRequest();
    ajax.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=50');
    ajax.addEventListener('load', e => {
      app.textContent="";
      const respServerString = ajax.response;  // me llega una cadena json
      const respServerObject = JSON.parse(respServerString); // cadena -> obj
  
      //console.log(respServerString);
      //console.log(respServerObject);
  
      const pokemones = respServerObject.results;
      pokemones.map(poke => {
const ajax = new XMLHttpRequest();
        ajax.addEventListener("load", e=> {
            let json = JSON.parse(ajax.response);
           
            renderPoke(json);
        });
        ajax.open("GET",`https://pokeapi.co/api/v2/pokemon/${poke.url.split('/')[6]}`);
        ajax.send();
      });
    });
    ajax.send(); // en este punto, sale el request hacia el server
        

   });
   const pokeContent = document.getElementById('pokemonContent');
   let pokeForm = document.getElementById('searchPokemon');
   pokeContent.addEventListener("click", e =>pokeContent.classList.toggle("hidden"));

   pokeForm.addEventListener('submit', e =>{
    e.preventDefault();
    const expRegEmail = /[0-9]/gi;
    let searchPokemon = document.getElementById('pokemon').value;
    if(expRegEmail.test(searchPokemon) == false){

    }else{
      getPokemon(searchPokemon, true);
      pokeContent.textContent="";
      pokeContent.classList.toggle("hidden");
    }
    

});

function getPokemon(id){
  const ajax = new XMLHttpRequest();
  ajax.addEventListener("load", e=> {
      let json = JSON.parse(ajax.response);
      
      const poke_types = json.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
      pokeContent.textContent="";
      pokeContent.innerHTML = `
      <div class="pCards">
      <h3 class="name">${json.name}</h3>
      <div class="cards ${type}">
      <div class="img-container">
      <img src=${json.sprites.front_default} />
      </div>
      <div class="infos">
      
      <small class="type">Tipo: <span>${type}</span></small>
      <small class="type">Vida: <span>${json.stats[0].base_stat}</span></small>
      <small class="type">Ataque: <span>${json.stats[1].base_stat}</span></small>
      <small class="type">Defensa: <span>${json.stats[2].base_stat}</span></small>
      <small class="type">Speed: <span>${json.stats[5].base_stat}</span></small>
    </div>
      </div>
      </div>
      `
      
  });
  ajax.open("GET",`https://pokeapi.co/api/v2/pokemon/${id}`);
  ajax.send();
 }
 const colors = {
  fire: '#FFA05D',
grass: '#8FD594',
electric: '#FFE43B',
water: '#7E97C0',
ground: '#CAAC4D',
rock: '#90642D',
poison: '#9D5B9B',
bug: '#EAFD71',
dragon: '#97b3e6',
psychic: '#FF96B5',
flying: '#CDCDCD',
fighting: '#FF5D5D',
normal: '#FFFFFF'
}

const main_types = Object.keys(colors);
   function renderPoke(son){
    const poke_types = son.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    app.innerHTML += `
    <div class="card ${type}">
    <div class="img-container">
    <img src=${son.sprites.front_default} />
    </div>
    <div class="info">
    <span class="number">#${son.id
                    .toString()
                    .padStart(3, '0')}</span>
    <h3 class="name">${son.name}</h3>
    
</div>
    </div>
    `
   /*<small class="type">Tipo: <span>${son.types[0].type.name}</span></small>*/
   }

    