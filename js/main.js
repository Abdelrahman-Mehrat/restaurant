console.log("بسم الله");
let mainInput = document.querySelector("#seacrh-input");
let dataContainer = document.querySelector("#collected-data");
let mainButton = document.querySelector("#search-button");
mainButton.addEventListener("click", getSelectedData);
let finalData = [];
async function getSelectedData() {
  let mainInputValue = mainInput.value;
  let selectedData = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=pizza`
  );
  selectedData = await selectedData.json();
  finalData = selectedData.recipes;
  console.log(finalData);
  wrapCards();
}
// function wrapCards() {
// let myCard = [];
// for (const x of finalData) {
//   let img = x.image_url;
//   myCard += `
//       <div class=" col-sm-4 p-3">
//       <div class=" data-id="${x.recipe_id}">
//       <h3 class="text-center card-header">${x.title}</h3>

//       <div>
//       <img class="w-100" src="${img}">
//       </div>
//       <p>Publisher: ${x.publisher}</p>
//       <div class="d-flex justify-content-center mt-1">
//         <a class="refrence-link mx-1" href="${x.publisher_url}" target="_blank">refrence</a>
//         <a id="details-btn" class="mx-1">details</a>
//       </div>
//       </div>
//       </div>
//       `;
// }
//

function wrapCards() {
  let myCard = [];
  for (const x of finalData) {
    let img = x.image_url;
    myCard += `
  
      <div class=" col-md-4  " >
      <div class="card px-3 food-card" data-id="${x.recipe_id}">
   
          <div class="blurring dimmable image">
              <img class="w-100 card" src="${img}">
          </div>
          <div class="content">
              <p class="header">${x.title}</p>
              <div class="meta">
                  <span class="date">Publisher: ${x.publisher}</span>
              </div>
          </div>
          <div class="extra content">
              <div class="d-flex justify-content-center mt-1">
                  <a class="refrence-link mx-1" href="${x.publisher_url}" target="_blank">refrence</a>
                  <a id="details-btn" class="mx-1">details</a>
              </div>
              <a>
                  <i class="users icon"></i>
                  2 Members
              </a>
          </div>
      </div>   </div>
 
`;
  }

  dataContainer.insertAdjacentHTML("afterbegin", myCard);

  let detailsButton = document.querySelectorAll("#details-btn");
  detailsButton.forEach((element) => {
    element.addEventListener("click", (e) => showDetails(e));
  });
}
async function showDetails(e) {
  // let showSingleCard = document.querySelector("#showSingleCard");
  let cardDetails = e.target.parentNode.parentNode.parentNode.dataset.id;
  let singleData = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${cardDetails}`
  );
  let singleDataa = await singleData.json();
  singleDataa = singleDataa.recipe;
  console.log(singleDataa);
  let ingredients;
  for (const x of singleDataa.ingredients) {
    ingredients += `<li class= "col-md-6 ingredients">${x}</li>`;
  }
  let postCard = `
  <div class="pop-up-card">
  <div class="post-card">
  <div class="card-exit-btn">
  x
</div>
        <div class="post-card-img">
            <img class="w-100" src="${singleDataa.image_url}" alt="">
        </div>
        <p class="post-card-title">${singleDataa.title}</p>
        <div class="d-flex">
        <a class="post-card-link" href="${singleDataa.source_url}">Link</a>
        </div>
        <ul class="row"> 
        ${ingredients}
        </ul>
  </div>
    </div>
  `;
  let bgPopUp = document.querySelector(".background-pop-up");

  bgPopUp.innerHTML = postCard;
  popUpFunc();
}
//
function popUpFunc() {
  let bgPopUp = document.querySelector(".background-pop-up");
  let PopUp = document.querySelector(".pop-up-card");
  let exitBtn = document.querySelector(".card-exit-btn");
  bgPopUp.classList.remove("hide");
  exitBtn.addEventListener("click", function (e) {
    // console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.parentNode.classList.add("hide");
  });
  bgPopUp.addEventListener("click", function (e) {
    if (e.target == bgPopUp) bgPopUp.classList.add("hide");
  });
}
