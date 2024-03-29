// loader
window.onload = function () {
  document.querySelector(".loader-contain").style.display = "none";
  random_test();
};
let random_btn = document.querySelector(".test_one");
random_btn.addEventListener("click", random_test);
function random_test() {
  let random_food = [
    "carrot",
    "broccoli",
    "cauliflower",
    "cauliflower",
    "corn",
    "cucumber",
    "green pepper",
    "lettuce",
    "mushrooms",
    "onion",
    "potato",
    "red pepper",
    "tomato",
    "beetroot",
    "brussel sprouts",
    "peas",
    "zucchini",
    "radish",
    "sweet potato",
    "artichoke",
  ];
  let random_num = Math.floor(Math.random() * random_food.length);
  getSelectedData(random_food[random_num]);
  console.log(random_num);
}
// parent
let dataContainer = document.querySelector("#collected-data");
// get data from api
let mainInput = document.querySelector("#seacrh-input");
let mainButton = document.querySelector("#search-button");
let bookMarkDiv = document.querySelector("#showSingleCard");
//
mainInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    mainButton.click();
  }
});
mainButton.addEventListener("click", getSelectedData);
let finalData = [];

async function getSelectedData(meal) {
  dataContainer.innerHTML = "";
  let mainInputValue = mainInput.value;
  mainInputValue != "" ? (meal = mainInputValue) : "";
  console.log(mainInputValue);
  let selectedData = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
  selectedData = await selectedData.json();
  finalData = selectedData.recipes;
  bookMarkDiv.innerHTML = "";
  checkHeader();
  wrapCards();
}
// <<<<.....................................>>>> //
function wrapCards() {
  let myCard = [];
  let num = 0;
  for (const x of finalData) {
    let img = x.image_url;
    myCard += `
      <div class="col-lg-4 col-md-6 col-sm-6 col-12  p-3 d-flex food-card_parent" >
        <div class="card p-3 food-card w-100" data-id="${x.recipe_id}">
          <div>
            <div class="blurring dimmable image card_img_parent">
            <img class="w-100 card card_img" src="${img}">
            </div>
            <div class="content mb-2">
              <p class="header card-header-font mb-1">${x.title}</p>
              <div class="meta ">
              <span class="date card-p-font">Publisher: ${x.publisher}</span>
              </div>
            </div>
          </div>   
          <div class="d-flex justify-content-between">              
            <a id="details-btn" class="mx-1 refrence-link btn btn-outline-secondary">details</a>
            <button  data-fav="${num}" data-favselector="${x.recipe_id}" class="mx-1 btn btn-outline-success  book-mark">
            <i class="heart outline icon"></i>    
            </button>  
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
  // click favourite button
  let bookMarkBtn = document.querySelectorAll(".book-mark");
  bookMarkBtn.forEach((btn) => {
    btn.addEventListener("click", test.bind(this));
  });
}
// <<<<.................BOOK MARK....................>>>> //
let myFavCard = [];

function test(e) {
  let target;
  if (e.target.classList.contains("icon")) {
    target = e.target.parentNode;
  } else {
    target = e.target;
  }
  target.classList.toggle("added");
  if (target.classList.contains("added")) {
    let myId = target.dataset.fav;
    myFavCard.push(finalData[myId]);
    addBookMark();
  } else {
    let selectedFavItem = Array.from(bookMarkDiv.children);
    for (const x of selectedFavItem) {
      if (x.dataset.favid == target.dataset.favselector) {
        x.remove();
      }
    }
  }
  checkHeader();
}
function addBookMark() {
  let favItem;
  for (const x of myFavCard) {
    favItem = `
      <div class="col-md-4  mb-2 px-3" data-favid="${x.recipe_id}">
        <div class="row bookmark-card p-0">
        <div class="col-4 p-0">
          <img src="${x.image_url}" class="w-100" style="height:70px">
        </div>
          <p class="col-8">${x.title}</p>
        </div>
      </div>  
    `;
  }
  bookMarkDiv.insertAdjacentHTML("beforeend", favItem);
}
function checkHeader() {
  if (bookMarkDiv.children.length > 0) {
    document.querySelector(".fav-title").classList.remove("hide");
  } else {
    document.querySelector(".fav-title").classList.add("hide");
  }
}
// <<<<...................pop-up..................>>>> //

async function showDetails(e) {
  let cardDetails = e.target.parentNode.parentNode.dataset.id;
  let singleData = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${cardDetails}`);
  let singleDataa = await singleData.json();
  singleDataa = singleDataa.recipe;
  let ingredients = "";
  for (const x of singleDataa.ingredients) {
    ingredients += `<li class= "col-md-6  ingredients">${x}</li>`;
  }
  let postCard = `
  <div class="pop-up-card">
    <div class="post-card">
      <div class="card-exit-btn">
        <i class="m-0 window close outline icon"></i>
      </div>
      <div class="post-card-img w-100">
          <img class="w-100" src="${singleDataa.image_url}" alt="">
      </div>
      <p class="post-card-title mb-1">${singleDataa.title}</p>
      <div class="d-flex mb-1">
        <a class="btn  refrence-link2 mx-auto" target="_blank" href="${singleDataa.source_url}">Details</a>
      </div>
      <ul class="row f-z ml-0 mr-0 pb-3" > 
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
    e.target.parentNode.parentNode.parentNode.classList.add("hide");
  });
  bgPopUp.addEventListener("click", function (e) {
    if (e.target == bgPopUp) bgPopUp.classList.add("hide");
  });
}
