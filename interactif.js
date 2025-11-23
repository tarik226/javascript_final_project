const workers = [];
let count = 1;
function addWorker(e) {
  e.preventDefault();
  let namevalue = document.getElementById("worker-name").value;
  let rolevalue = document.getElementById("worker-role").value;
  let photovalue = document.getElementById("worker-photo").value;
  let emailvalue = document.getElementById("worker-email").value;
  let numbervalue = document.getElementById("worker-number").value;
  let regexname = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
  let regexphoto = /^(https?:\/\/)?.+$/;
  let regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let regexphone = /^06\d{8}$/;
  // let leaveDate= document.getElementsByClassName('experience_leavedate');
  // let hireDate=document.getElementsByClassName('experience_hiredate');
  let container = document.getElementsByClassName("experience-container")[0]
    .children;
  let lengthe = document.getElementsByClassName("experience-container")[0]
    .children.length;
  // console.log('nombre d\'enfants'+lengthe);
  let erreurs = document.getElementsByClassName("zone-erreur")[0];
erreurs.innerHTML = "";
  for (const exp of container) {
    if (
      new Date(exp.children[lengthe - 1]).getTime() >
      new Date(exp.children[lengthe - 2]).getTime()
    ) {
      console.log("inside the if");
      
      let erreur = document.createElement("p");
      erreur.innerHTML =
        "<strong>la date de recrutement ne doit etre inferieure a la date de demission</strong>";
      erreurs.appendChild(erreur);
    }
  }
  let table_exp = [];
  for (const element of container) {
    console.log('inside the addworker');
    
    console.log(element);
    
    let exp_company =element.querySelector(".experience_company").value;
    let exp_role = element.querySelector(".experience_role").value;
    let exp_hire = element.querySelector(".experience_hiredate").value;
    let exp_leave = element.querySelector(".experience_leavedate").value;
    let objet_exp = {
      company: exp_company,
      role: exp_role,
      hireDate: exp_hire,
      leaveDate: exp_leave,
    };
    table_exp.push(objet_exp);
  }
  if (
    regexname.test(namevalue) &&
    regexphoto.test(photovalue) &&
    regexemail.test(emailvalue) &&
    regexphone.test(numbervalue)
  ) {
    // console.log("inside the if");
    let worker_instance = {
      id: count,
      name: namevalue,
      role: rolevalue,
      email: emailvalue,
      number: numbervalue,
      photo: photovalue,
      location: "none",
      experiences: table_exp,
    };
    workers.push(worker_instance);
    count++;

    workerRender("worker-list");
  } else {
    console.log("inside the else");
    let erreurs = document.getElementsByClassName("zone-erreur")[0];
    if (!regexname.test(namevalue)) {
      console.log('inside the p');
      
      let erreur = document.createElement("p");
      erreur.innerHTML = "<strong>Nom invalide</strong>";
      erreurs.appendChild(erreur);
    }
    if (!regexphoto.test(photovalue)) {
            console.log('inside the img');

      let erreur = document.createElement("p");
      erreur.innerHTML = "<strong>Photo invalide (URL attendue)</strong>";
      erreurs.appendChild(erreur);
    }
    if (!regexemail.test(emailvalue)) {
            console.log('inside the email');

      let erreur = document.createElement("p");
      erreur.innerHTML = "<strong>Email invalide</strong>";
      erreurs.appendChild(erreur);
    }
    if (!regexphone.test(numbervalue)) {
            console.log('inside the number');

      let erreur = document.createElement("p");
      erreur.innerHTML =
        "<strong>Numéro de téléphone doit debuter par 06</strong>";
      erreurs.appendChild(erreur);
    }

    // 
  }
  //  console.log(workers);

   document.getElementById('form_add').reset();
}

let form_add = document.getElementById("form_add");
form_add.addEventListener("submit", addWorker);

function workerRender(place) {console.log(workers);

  const listContainer = document.getElementsByClassName(place)[0];
  listContainer.textContent = "";
  workers.forEach((worker) => {
    //creation d'elemtn li qui prend deatils du worker
    let li = document.createElement("li");

    li.className = "worker";
    li.dataset.id = worker.id;
    li.innerHTML = `
            <img src="${worker.photo}" alt="user_photo"/>
            <div>
                <strong>${worker.name}</strong><br/>
                ${worker.role}
            </div>
            <button class="remove">X</button>
        `;
    li.addEventListener("click", detailsWorker);
    const removeButton = li.querySelector(".remove");
    console.log(removeButton);
    removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      // e.stopImmediatePropagation();
      removeEmploye(e);
    });

    listContainer.appendChild(li);
  });
}

function addExperience() {
  let experience_container = document.getElementsByClassName(
    "experience-container"
  )[0];
  let div_experience = document.createElement("div");
  div_experience.innerHTML = `
                    <label>Company</label>
                    <input type="text" class="experience_company">
                    <label for="">Role</label>
                    <input type="text" class="experience_role">
                    <label for="">From</label>
                    <input type="date" class="experience_hiredate">
                    <label for="">To</label>
                    <input type="date" class="experience_leavedate">
                `;
  experience_container.append(div_experience);
}
document
  .getElementsByClassName("add-experience")[0]
  .addEventListener("click", () => {
    addExperience();
  });

function detailsWorker(e) {
  console.log("inside the detials function");
  // recuperation d'id assigne a chaque div d'employe cree
  const element = e.target.dataset.id;
  console.log(e.target.dataset.id);

  //recherche par id -- worker_distinct contient l'employe trouve format {objet}
  let worker_distinct = workers.find((ele) => ele.id == element);
  // console.log(worker_distinct);

  //selection du popup details
  let container = document.getElementsByClassName("worker_details")[0];
  //creation du conteneur qui va contient les details d'ygemploye
  let ul_item = document.createElement("div");

  // html d'experience
  let experiences = worker_distinct.experiences
    .map((exp) => {
      return `
                <div class="experience">
                    <strong>${exp.company}</strong>
                    <strong>Role</strong><p>${exp.role}</p>
                    <strong>Period</strong><p>${exp.hireDate} -- ${exp.leaveDate}</p>
                </div>
            `;
    })
    .join("");
  // insertion en div
  ul_item.innerHTML = `
        <div class="photo_name_role">
            <div><img src="${worker_distinct.photo}" alt="avatar"></div>
            <div><h2>${worker_distinct.name}</h2><h4>${worker_distinct.role}</h4></div>
        </div>
        <div class="email_phone_location">
            <strong>Email</strong><p>${worker_distinct.email}</p>
            <strong>Phone</strong><p>${worker_distinct.number}</p>
            <strong>location</strong><p>${worker_distinct.location}</p>
        </div>
        <div>
            <h1>Work experiences</h1>
            <div>${experiences}</div>
        </div>
        <button id="close">Close</button>
    `;
  // ajout au popup details
  container.appendChild(ul_item);
  container.style.display = "block";
  document.querySelector("#close").addEventListener("click", (e) => {
    const workerDetails = e.currentTarget.closest(".worker_details");
    if (workerDetails) {
      console.log("inside the if for workerdetails");

      workerDetails.style.display = "none";
      // e.stopPropagation();
    }
  });
}

function removeEmploye(e) {
  let element_removed_id = parseInt(
    e.target.closest("[data-id]").getAttribute("data-id")
  );
  console.log(element_removed_id);
  const index = workers.findIndex((worker) => worker.id === element_removed_id);
  console.log(index)
  if (index !== -1) {
    workers.splice(index, 1);
    console.log(workers);
    
  }
  workerRender("worker-list");
}

document.querySelectorAll('.add-btn').forEach((elem)=>{
    elem.addEventListener('click',addWorkerToSection);
})

function addWorkerToSection(e){  
let salle = e.target.closest('.zone').classList[1];
switch (salle) {
  case "conference":
    console.log('conference');
    addToZone(e,null);
    break;
  case "reception":
    console.log('reception');
    addToReception();
    addToZone(e,'Receptionist');
    break;
  case "servers":
    console.log('servers');
    addToZone(e,'IT_guy');
    break;
  case "security-room":
    console.log('security-room');
    addToZone(e,'Security')
    break;
  case "staff-room":
    console.log('staff-room');
    addToZone(e,null)
    break;
  case "archive":
    console.log('archive');
    addToZone(e,'Cleaning');
    break;

  default:
    console.log('chambre invalide');
    
    break;
}}


function addToZone(e,filter){
  document.getElementsByClassName('choice_worker')[0].style.display="block";
  workerRenderChoice(e,filter);
}
function workerRenderChoice(e,filter){
  const listContainer = document.getElementsByClassName('choice_worker_list')[0];
  let zone =e.target.closest('.zone');
  listContainer.innerHTML = "";
  if (filter!=null) {
      workers.filter((w)=> w.role==filter).forEach((worker) => {
    let li = document.createElement("li");
    li.className = "worker";
    li.dataset.id = worker.id;
    li.innerHTML = `
            <img src="${worker.photo}" alt="user_photo"/>
            <div>
                <strong>${worker.name}</strong><br/>
                ${worker.role}
            </div>
            <button class="remove">X</button>
        `;
        listContainer.appendChild(li);
    li.addEventListener("click", function(e){
      // console.log(e.target.dataset.id);
      let id=e.target.dataset.id;
      let worker =workers.find((w)=>w.id==id);
      worker.location=zone.classList[1];
      console.log(worker);
      console.log(document.getElementsByClassName(zone.classList[1])[0].children.length);
      
      if (document.getElementsByClassName(zone.classList[1])[0].children.length>=5) {
        console.log('inside the number of children if');
        
        window.alert('le nombre d\'employés depasees');
        return;
      } else {
         let worker_html=document.createElement('div');
      worker_html.classList.add('worker');
      worker_html.innerHTML= `
            <img src="${worker.photo}" alt="user_photo"/>
            <div>
                <strong>${worker.name}</strong><br/>
                ${worker.role}
            </div>
            <button class="remove">X</button>
        `;
      worker_html.querySelector('.remove').addEventListener('click',(e)=>{
        console.log('inside the event');
        
          e.target.closest('.worker').remove();
      })
      zone.append(worker_html);
      li.remove();
      }
     
      // document.getElementsByClassName(zone.classList[1])[0].style.opaccity='0.5'
      li.onclick=null;
    });

    const removeButton = li.querySelector(".remove");
    // console.log(removeButton);
    removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      removeEmploye();

    });

    
})}}

document.getElementById('worker-photo').addEventListener('change',(e)=>{
  document.querySelector('#worker_round').setAttribute('src', document.getElementById('worker-photo').value);
  // console.log(e.target.value);
// console.log();
})
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementsByClassName('reception')[0].querySelector("div")) {
  return;
} else {
    document.getElementsByClassName('reception')[0].style.backgroundColor='red';
  }
  if (document.getElementsByClassName('servers')[0].querySelector("div")) {
  return;
} else {
    document.getElementsByClassName('servers')[0].style.backgroundColor='red';
  }
 if (document.getElementsByClassName('security-room')[0].querySelector("div")) {
  return;
} else {
    document.getElementsByClassName('security-room')[0].style.backgroundColor='red';
  }
 if (document.getElementsByClassName('archive')[0].querySelector("div")) {
  return;
} else {
    document.getElementsByClassName('archive')[0].style.backgroundColor='red';
  }
})


// const zones = document.getElementsByClassName('zone');
// for (let zone of zones) {
//   zone.addEventListener('click', addWorkerToSection);
// }


