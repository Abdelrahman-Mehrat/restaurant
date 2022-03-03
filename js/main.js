console.log("بسم الله");
let mainInput = document.querySelector("#seacrh-input");
let dataContainer = document.querySelector("#collected-data");
let mainButton = document.querySelector("#search-button");
mainButton.addEventListener("click", getSelectedData);
let finalData=[]
async function getSelectedData() {
let mainInputValue= mainInput.value;
    let selectedData =await fetch(`https://forkify-api.herokuapp.com/api/search?q=${mainInputValue}`);
    selectedData = await selectedData.json()
    finalData =  selectedData.recipes
    console.log(finalData);
    wrapCards()
} 
function wrapCards() {
    let myCard=[];
    for (const x of finalData) {
        let img = x.image_url
        myCard+= `
        <div class=" col-sm-4 p-3">
        <div class="food-card">
        <h3 class="text-center">${x.title}</h3>

        <div>
        <img class="w-100" src="${img}">
        </div>
        <p>Publisher: ${x.publisher}</p>
        <a href="${x.publisher_url}" target="_blank">refrence</a>
        
        </div>
        </div>
        `
    }
    
    dataContainer.insertAdjacentHTML("afterbegin",myCard)
}
