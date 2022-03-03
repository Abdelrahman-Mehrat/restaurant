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
function wrapCards() {
  let myCard = [];
  for (const x of finalData) {
    let img = x.image_url;
    myCard += `
        <div class=" col-sm-4 p-3">
        <div class="food-card" data-id="${x.recipe_id}">
        <h3 class="text-center card-header">${x.title}</h3>

        <div>
        <img class="w-100" src="${img}">
        </div>
        <p>Publisher: ${x.publisher}</p>
        <a href="${x.publisher_url}" target="_blank">refrence</a>
        <button id="details-btn" class="btn btn-primary">details</button>
        </div>
        </div>
        `;
  }
  dataContainer.insertAdjacentHTML("afterbegin", myCard);

  let detailsButton = document.querySelectorAll("#details-btn");
  detailsButton.forEach((element) => {
    element.addEventListener("click", (e) => showDetails(e));
  });
}
let showSingleCard = document.querySelector("#showSingleCard");
async function showDetails(e) {
  //   showSingleCard = ``;
  let cardDetails = e.target.parentNode.dataset.id;
  console.log(e.target.parentNode.dataset.id);
  let singleData = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${cardDetails}`
  );
  let singleDataa = await singleData.json();
  singleDataa = singleDataa.recipe;
  console.log(singleDataa);
  let ingredients;
  for (const x of singleDataa.ingredients) {
    ingredients += `<li>${x}</li>`;
  }
  let postCard = `
  <div class="post-card">
        <div>
            <img class="w-100" src="${singleDataa.image_url}" alt="">
        </div>
        <ul>
        ${ingredients}
        </ul>

    </div>
  `;
  showSingleCard.insertAdjacentHTML("afterbegin", postCard);
}
