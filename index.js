let nameInputPoke = document.getElementById("namePoke")

nameInputPoke.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPoke()
  }
});


const searchPoke = () => {

  let namePoke = nameInputPoke.value.toLowerCase().trim();

  if (namePoke === "") {
    return null;
  }

  let url = `https://pokeapi.co/api/v2/pokemon/${namePoke}`;

  let hpStat = document.getElementById("hpStat");
  hpStat.innerHTML = "";

  let atkStat = document.getElementById("atkStat");
  atkStat.innerHTML = "";

  let defStat = document.getElementById("defStat");
  defStat.innerHTML = "";

  let spAtk = document.getElementById("spAtk");
  spAtk.innerHTML = "";

  let spDef = document.getElementById("spDef");
  spDef.innerHTML = "";

  let spdStat = document.getElementById("spdStat");
  spdStat.innerHTML = "";

  let typePoke = document.getElementById("typePoke");
  typePoke.innerHTML = "";

  let abilitiesPoke = document.getElementById("abilitiesPoke");
  abilitiesPoke.innerHTML = "";

  let statusPoke = document.getElementById("statusPokemon");
  statusPoke.innerHTML = "Buscando...";

  let statusLight = document.getElementById("statusLight");
  statusLight.className = "statusLight statusBlue";

  let imgURL = document.getElementById("imageSrc");
  imgURL.src = "./images/loading.gif";

  let heightPoke = document.getElementById("heightPoke");
  heightPoke.innerHTML = "";

  let weightPoke = document.getElementById("weightPoke");
  weightPoke.innerHTML = "";

  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        statusLight.className = "statusLight statusYellow";
        imgURL.src = "./images/notFound.jpg";
        statusPoke.innerHTML = "Pokemon no encontrado.";
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
        let allTypes = "";
        let allAbilities = "";
        data.types.map((info) => {
          allTypes = allTypes + ` ${info.type.name}`;
        });
        typePoke.innerHTML = `Tipo: ${allTypes}`.toUpperCase();

        data.abilities.map((info) => {
          allAbilities = allAbilities + ` ${info.ability.name}`;
        });
        abilitiesPoke.innerHTML = `Habilidades: ${allAbilities}`.toUpperCase();

        hpStat.innerHTML = `<p>${data.stats[0].base_stat}</p><p>HP</p>`;
        atkStat.innerHTML = `<p>${data.stats[1].base_stat}</p><p>ATK</p>`;
        defStat.innerHTML = `<p>${data.stats[2].base_stat}</p><p>DEF</p>`;
        spAtk.innerHTML = `<p>${data.stats[3].base_stat}</p><p>SP.ATK</p>`;
        spDef.innerHTML = `<p>${data.stats[4].base_stat}</p><p>SP.DEF</p>`;
        spdStat.innerHTML = `<p>${data.stats[5].base_stat}</p><p>SPEED</p>`;

        heightPoke.innerHTML = `<p>Altura: ${data.height / 10} m</p>`;
        weightPoke.innerHTML = `<p>Peso: ${data.weight / 10} kg</p>`;

        imgURL.src = data.sprites.front_default;
        statusPoke.innerHTML = `# ${data.order} - ${data.name.toUpperCase()}`;
        statusLight.className = "statusLight statusGreen";
      }
    });
};
