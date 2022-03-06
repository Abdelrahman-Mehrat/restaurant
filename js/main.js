console.log("بسم الله");
// parent
let dataContainer = document.querySelector("#collected-data");
// get data from api
let mainInput = document.querySelector("#seacrh-input");
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
// <<<<.....................................>>>> //
function wrapCards() {
  let myCard = [];
  let num = 0;
  for (const x of finalData) {
    let img = x.image_url;
    myCard += `
      <div class="col-lg-4 col-md-6 col-sm-6 col-6  p-3" >
        <div class="card p-3 food-card" data-id="${x.recipe_id}">
          <div class="blurring dimmable image">
              <img class="w-100 card" src="${img}">
          </div>
          <div class="content">
              <p class="header card-header-font">${x.title}</p>
              <div class="meta ">
                  <span class="date card-p-font">Publisher: ${x.publisher}</span>
              </div>
          </div>
          <div class="extra content">
              <div class="d-flex justify-content-center mt-1">
                  <a class="refrence-link mx-1" href="${x.publisher_url}" target="_blank">refrence</a>
                  <a id="details-btn" class="mx-1 refrence-link">details</a>
              </div>
              <a>
                  <a class="mx-1"  href="${x.source_url}" target="_blank">details link</a>
                  <button data-fav="${num}" class="mx-1 btn border book-mark">favourite</button>  
              </a>
          </div>
      </div>   
      </div>`;
    num++;
  }
  dataContainer.insertAdjacentHTML("afterbegin", myCard);

  // <<<<.....................................>>>> //
  let detailsButton = document.querySelectorAll("#details-btn");
  detailsButton.forEach((element) => {
    element.addEventListener("click", (e) => showDetails(e));
  });
  let bookMarkBtn = document.querySelectorAll(".book-mark");
  bookMarkBtn.forEach((btn) => {
    btn.addEventListener("click", test.bind(this));
  });
}
let myFavCard = [];
function test(e) {
  let myId = e.target.dataset.fav;
  console.log(myId);
  myFavCard.push(finalData[e.target.dataset.fav]);
  console.log(myFavCard);
  addBookMark();
}
function addBookMark() {
  let bookMarkDiv = document.querySelector("#showSingleCard");
  let favItem;
  for (const x of myFavCard) {
    favItem = `
      <div class="col-md-4">
        <div>
        <div>
        <img src="${x.image_url}" class="w-100">
        </div>
          <p>${x.title}</p>
        </div>
      </div>  
    `;
  }
  bookMarkDiv.insertAdjacentHTML("afterbegin", favItem);
}
// <<<<...................pop-up..................>>>> //
async function showDetails(e) {
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
        <a class="post-card-link" target="_blank" href="${singleDataa.source_url}">Link</a>
        </div>
        <ul class="row f-z" > 
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
