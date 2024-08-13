const predators = [
    {
      name: 'Wolf',
      url: '/images/Wolf.jpg',
      weapons: ['plasmaCaster', 'smartDisc', 'whip', 'combiStick'],
      power: 999,
    },
    {
      name: 'Celtic',
      url: '/images/Celtic.jpg',
      weapons: ['plasmaCaster','combiStick','netGun'],
      power: 200,
    },
    {
        name: 'Berserker',
        url: '/images/Berserker.jpg',
        weapons: ['plasmaCaster','netGun'],
        power: 999,
      },
      {
        name: 'City Hunter',
        url: '/images/City_Hunter.jpg',
        weapons: ['plasmaCaster','combiStick','smartDisc'],
        power: 300,
      },
      {
        name: 'Dark',
        url: '/images/Dark.jpg',
        weapons: ['plasmaCaster', 'smartDisc', 'combiStick'],
        power: 999,
      },
      {
        name: 'Falconer',
        url: '/images/Falconer.jpg',
        weapons: ['plasmaCaster',],
        power: 600,
      },
      {
        name: 'Jungle Hunter',
        url: '/images/Jungle_Hunter.jpg',
        weapons: ['plasmaCaster',],
        power: 300,
      },
      {
        name: 'Scar',
        url: '/images/Scar.jpg',
        weapons: ['plasmaCaster','smartDisc'],
        power: 750,
      },
      {
        name: 'Tracker',
        url: '/images/Tracker.jpg',
        weapons: ['plasmaCaster',],
        power: 500,
      },
  ];

//Select HTML/DOM elements
const predatorsWrapper = document.querySelector("#predators-wrapper");
const teamWrapper = document.querySelector("#team-wrapper");
const checkboxes = document.querySelectorAll(".check");
const filtersContainer = document.querySelector("#filters-container");
const searchInput = document.querySelector("#search");
const teamSize = document.querySelector("#team-size");

//Init
let teamSizeNumber = 0;
const predatorElements = [];
const teamMemberElements = [];
let teamMemberPredators = [];

//Event listeners for filtering
 filtersContainer.addEventListener('change',filterPredators);
 searchInput.addEventListener('input',filterPredators);

//Loop over predators and create elements
predators.forEach((predator)=>{
    const predatorElement = createPredatorElement(predator);
    predatorElements.push(predatorElement);
    predatorsWrapper.appendChild(predatorElement);
    const teamMemberElement = createTeamMemberElement(predator);
    teamMemberElements.push(teamMemberElement);
    teamWrapper.appendChild(teamMemberElement);
});


//Functions
function createPredatorElement(predator){
  const predatorElement = document.createElement("div");
     predatorElement.className = 'item space-y-2';
     predatorElement.innerHTML =`
     <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
                     <img 
                     src="${predator.url}" 
                     alt="${predator.name}" 
                     class="w-full h-full object-cover">
                     <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
                     id="${predator.name}">
                         Add To Team
                     </button>
                 </div>
                 <div class="flex flex-col justify-between items-center md:flex-row">
                    <p class="text-xl">${predator.name}</p>
                    <strong class="text-xl">Power: ${predator.power.toString()}</strong>
                </div>
     `;
     predatorElement.querySelector('.status').addEventListener('click',updateTeam);
     return predatorElement;
}

function updateTeam(e){
  const statusElement = e.target;
  const indexOfPredator = teamMemberPredators.indexOf(statusElement.id);
  if(statusElement.classList.contains('added')){
    statusElement.classList.remove('added');
    statusElement.innerText = 'Add To Team';
    statusElement.classList.remove('bg-red-700');
    statusElement.classList.add('bg-black');
    delete teamMemberPredators[indexOfPredator];
    teamMemberPredators = teamMemberPredators.filter((element)=> {return element != null})
    teamSizeNumber--;

}else{
    statusElement.classList.add('added');
    statusElement.innerText = 'Remove From Team';
    statusElement.classList.remove('bg-black');
    statusElement.classList.add('bg-red-700');
    teamMemberPredators.push(statusElement.id);
    teamSizeNumber++;
}
  teamSize.innerText = teamSizeNumber.toString();

}

function filterPredators(){
  const searchTerm = searchInput.value.trim().toLowerCase();
    const checkedWeapons = Array.from(checkboxes)
        .filter((check)=>check.checked)
        .map((check)=>check.id);

  //Loop over predators and check for matches
  predatorElements.forEach((predatorElement, index) =>{
    const predator = predators[index];
    const matchesSearchTerm = predator.name.toLowerCase().includes(searchTerm);
    const isInCheckedWeapon = checkedWeapons.length === 0 || predator.weapons.some((weapon) => checkedWeapons.includes(weapon));
  if(matchesSearchTerm && isInCheckedWeapon){
      predatorElement.classList.remove("hidden");
  }else{
      predatorElement.classList.add("hidden");
  }

  });
}

//Already existing Predator Elements could be used but to keep project simple I created a different predator "team member" element
function createTeamMemberElement(predator){
  const teamMemberElement = document.createElement("div");
     teamMemberElement.className = `item space-y-2 hidden team-${predator.name.replaceAll(' ', '')}`;
     teamMemberElement.innerHTML =`
     <div class="bg-gray-100 flex flex-row justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
                     <img 
                     src="${predator.url}" 
                     alt="${predator.name}" 
                     class="w-full h-full object-cover">
                     <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
                     id="${predator.name}">
                         Add To Team
                     </button>
                 </div>
                 <div class="flex flex-col justify-between items-center md:flex-row">
                    <p class="text-xl">${predator.name}</p>
                    <strong class="text-xl">Power: ${predator.power.toString()}</strong>
                </div>
     `;
     teamMemberElement.querySelector('.status').addEventListener('click',updateTeam);
     return teamMemberElement;
}


function updatePageToMain(){
  teamWrapper.classList.add('hidden');
  predatorsWrapper.classList.remove('hidden');
}

//First make everybody hidden and then remove hidden from only team members
function updatePageToTeam(){
    predators.forEach((predator)=>{
    const teamPredator = document.querySelector(`.team-${predator.name.replaceAll(' ', '')}`)
    teamPredator.classList.add('hidden');
  })
  teamMemberPredators.forEach((teamMemberPredator)=>{
    const teamPredator = document.querySelector(`.team-${teamMemberPredator.replaceAll(' ', '')}`)
    teamPredator.classList.remove('hidden');
  });
  teamWrapper.classList.remove('hidden');
  predatorsWrapper.classList.add('hidden');
}