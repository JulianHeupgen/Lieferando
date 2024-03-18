
let meals = [                                                              

    {
        "name": "Pizza Margharita",
        "ingredients": "mit Tomatensauce und Mozarella",
        "price": 10.00
    },

    {
        "name": "Pizza Salami",
        "ingredients": "mit Tomatensauce, Mozarella und Salami",
        "price": 12.90
    },

    {
        "name": "Pizza Funghi",
        "ingredients": "mit Tomatensauce, Mozarella und Champignons",
        "price": 13.90
    },

    {
        "name": "Pizza Ai Formaggi",
        "ingredients": "mit Tomatensauce und verschiedenen Käsesorten",
        "price": 13.90
    },

    {
        "name": "Pizza Stracchino",
        "ingredients": "mit Tomatensauce, Mozarella, Stracchinokäse, Pesto und Basilikum",
        "price": 16.90
    },

];


let selectedMenus = [];                     
let prices = [];
let amounts = [];

let totalPrice;                             


load();                                     


function renderMealsAndBasket() {                                                

    let mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';

    for ( let i = 0; i < meals.length; i++ ) {
        mealsContainer.innerHTML += `<div id="meal${i}" class="meals-style">
                                       <div class="meal-header">
                                        <h2>${meals[i]["name"]}</h2>
                                        <button class="addButton" onclick="addMenu(${i})">+</button>
                                       </div>
                                        <span class="ingredients-style">${meals[i]["ingredients"]}</span>
                                        <span class="price-style">${meals[i]["price"].toFixed(2)} €</span>
                                      </div>`;
    }

    renderBasket();
}


function addMenu(mealsIndex) {                              

    let selectedMenu = meals[mealsIndex]["name"];
    let index = selectedMenus.indexOf(selectedMenu);        

    if(index >= 0) {                                                     
       amounts[index]++;                                    
    } else {  
       selectedMenus.push(selectedMenu);                    
       prices.push(meals[mealsIndex]["price"]);
       amounts.push(1);
    }

    renderBasket();
}


function renderBasket() {                                  

    if(selectedMenus == '') {
        showEmptyBasket();
    } else {
        showBasket();
    }
}


function showEmptyBasket() {                                                   

    let emptyBasket = document.getElementById('main-container-right');

    emptyBasket.innerHTML = `<h2 class="header-warenkorb">Warenkorb</h2>
                             <div class="img-and-span">
                             <img class="img-warenkorb" src="./img/warenkorb.jpg">
                             <span>Wähle leckere Gerichte aus der Karte aus.</span>
                             </div>
                             <div id="pay">
                              <div class="sum-style">
                               <span>Zwischensumme</span>
                               <span>0,00 €</span>
                              </div>
                             <div class="sum-total-style">
                               <span>Gesamt</span>
                               <span>0,00 €</span>
                             </div>
                            </div>
                            <span id="info-pay">
                            Leider kannst du noch nicht bestellen. Pizza-Haus Gengenbach liefert erst ab einem Mindestbestellwert von <b>20,00 €</b> (exkl. Lieferkosten).
                            </span>`;

    save();                        
}


function showBasket() {                                                        

    let emptyBasket = document.getElementById('main-container-right');

    emptyBasket.innerHTML = `<h2 class="header-warenkorb">Warenkorb</h2>
                             <div id="menusInBasket"></div>                  
                             <div id="pay">
                              <div class="sum-style">
                               <span>Zwischensumme</span>
                               <span id="sum"></span>
                              </div>
                              <div class="sum-style">
                               <span>Lieferkosten</span>
                               <span>2,00 €</span>
                              </div> 
                             <div class="sum-total-style">
                               <span>Gesamt</span>
                               <span id="sum-total"></span>
                             </div>
                            </div>
                            <span id="info-pay"></span>
                            <div class="pay-button-div">
                            <button id="pay-button">Bestellen</button>
                            </div>`;

    showSelectedMenus();
    showSums();
    checkSumForDelivery();
}


function showSelectedMenus() {                                      

    let menusBasket = document.getElementById('menusInBasket');
    

    for (let i = 0; i < selectedMenus.length; i++ ) {

        menusBasket.innerHTML += `<div class="menuInBasket-container">
                                   <div class="totalAmount">
                                    <span>${amounts[i]}</span>
                                    <span>${selectedMenus[i]}</span>
                                   </div>
                                   <div class="changeMenu">
                                     <div class="reduce-increase">
                                      <button class="changeButton" onclick="reduce(${i})"> - </button>
                                      <button class="changeButton" onclick="increase(${i})"> + </button>
                                     </div>
                                     <div class="totalPrice-and-trash">
                                      <span>${(amounts[i]*prices[i]).toFixed(2)} €</span>
                                      <img class="trash-img" src="./img/trash.jpg" onclick="deleteAll(${i})"> 
                                     </div>
                                    </div>
                                  </div>`;
    }
}


function showSums() {                                               

    let sum = document.getElementById('sum');
    
    totalPrice = 0;                                                 

    for(let i = 0; i < selectedMenus.length; i++ ) {                
        let priceMenu = (amounts[i]*prices[i]).toFixed(2);          
        totalPrice += parseFloat(priceMenu);                        
    }

    sum.innerHTML = `${totalPrice.toFixed(2)} €`;

    let sumTotal = document.getElementById('sum-total');
    let sumWithDelivery = totalPrice + 2;                           
    sumTotal.innerHTML = `${sumWithDelivery.toFixed(2)} €`;

    save();
}


function checkSumForDelivery() {                                    

    if(totalPrice < 20) {                                           
        let info = document.getElementById('info-pay');
        info.innerHTML = `<div>Leider kannst du noch nicht bestellen. 
                          Pizza-Haus Gengenbach liefert erst ab einem Mindestbestellwert von <b>20,00 €</b> (exkl. Lieferkosten).<br>
                          Dir fehlen nur noch <b>${(20-totalPrice).toFixed(2)} €</b>.</div>`;  
        } else {
            let payButton = document.getElementById('pay-button');
            payButton.addEventListener("click", function(){                                                
                alert('Vielen Dank für deine Bestellung ! Die Lieferzeit beträgt ca 40 Minuten.');
                selectedMenus = [];                                                                                        
                prices = [];
                amounts = [];
                renderBasket();
            })
        }   
}


function reduce(index) {                                     

    if(amounts[index] >= 2) {                                
        
      amounts[index]--;
      renderBasket();
    } 
}


function increase(index) {                                  

    amounts[index]++;
    renderBasket();
}


function deleteAll(index) {                                  

    selectedMenus.splice(index,1);                          
    prices.splice(index,1);
    amounts.splice(index,1);

    renderBasket();
}


function save() {                                                         

    let selectedMenusAsString = JSON.stringify(selectedMenus);            
    localStorage.setItem('selectedMenus', selectedMenusAsString);         

    let pricesAsString = JSON.stringify(prices);
    localStorage.setItem('prices', pricesAsString);

    let amountsAsString = JSON.stringify(amounts);
    localStorage.setItem('amounts', amountsAsString);
}


function load() {                                                        

    let selectedMenusAsString = localStorage.getItem('selectedMenus');
    if(selectedMenusAsString) {                                           
        selectedMenus = JSON.parse(selectedMenusAsString);
    }

    let pricesAsString = localStorage.getItem('prices');
    if(pricesAsString) {
        prices = JSON.parse(pricesAsString);
    }

    let amountsAsString = localStorage.getItem('amounts');
    if(amountsAsString) {
        amounts = JSON.parse(amountsAsString);
    }
}

