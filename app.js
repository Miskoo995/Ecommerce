import {
    http
} from './modules/easyhttp.js';
import {
    ui
} from './modules/ui.js';

import {
    cart
} from './modules/cart';


document.addEventListener('DOMContentLoaded', getProducts);


let pag = document.querySelector('.pagination');
let selector = document.getElementById('inputGroupSelect01');
let alll = document.querySelectorAll('.page-item');
let pagelink = document.querySelectorAll('.page-link');
let category = document.querySelector('.list-group');
let cartButton = document.getElementById('cart');
let closebtn = document.getElementById("closebtn");
let cartMenu = document.getElementById("mySidenavR");
let checkout = document.querySelector(".btn-success")




pag.addEventListener('click', (event) => indexValue(event));
category.addEventListener('click', (e) => categoryFunction(e))
selector.addEventListener('click', () => pagValue(pagination = selector[selector.selectedIndex].value));
cartButton.addEventListener('click', openMenu => cartMenu.style.width = "490px");
closebtn.addEventListener('click', closeMenu => cartMenu.style.width = "0");
checkout.addEventListener('click', getCheckout);



//Default values for pagination

let index = 1;
let pagination = 6;

//Get data for checkout 

function getCheckout(){

    let getLocalStorange = JSON.parse(localStorage.getItem('cartarray'));
   
    http.get(' https://api.myjson.com/bins/innhs')
    .then(data => {
        ui.checkoutDisplay(data.products,getLocalStorange)

    })



}

// get add to cart buttons and use listners.
function getButtons() {

    let getLocalStorange = JSON.parse(localStorage.getItem('cartarray'));

    let arrayMain;

    if(getLocalStorange !== null){

        arrayMain = getLocalStorange ;

        cartManager(arrayMain)

    }else{
        arrayMain = [];
    }
   
  
   
    let buttons = [...document.querySelectorAll('.btn-info')];
   
    
    buttons.forEach(button => {

   button.addEventListener('click', (event) => {
    let element = {};
       
    
    let eventTarget = event.target.dataset.id;
    button.disabled = true;
    
    element.id = eventTarget;
    element.quantity = 1;
    arrayMain.push(element);
   

    cartManager(arrayMain)
   });



});
}


function cartManager(niz){
  

        http.get(' https://api.myjson.com/bins/innhs')
        .then(data => {
            cart.cartDisplay(data.products, niz)

        })



}



//Get all products

function getProducts() {

    http.get(' https://api.myjson.com/bins/innhs')
        .then(data => {

            ui.getProducts(data.products, index, pagination)

        }).then(() => {

            getButtons();

        })

        .err(err => console.log(err));

}


// Listing data by category 

function categoryFunction(e) {

    let cat = e.target.innerText;

    http.get(' https://api.myjson.com/bins/innhs')
        .then(data => {

            ui.categoryLister(data.products, cat)
        }).then(() => {

            getButtons();

        })
        .err(err => console.log(err));

}

//Change the value in pagination 

function changeStatus(e, enValue) {

    alll.forEach(element => {

        if (element.classList.contains('active')) {

            element.classList.remove('active')
        }

    });

    pagelink.forEach(link => {

        if (link.innerText == enValue) {

            link.parentElement.classList.add('active');
        }
    });
}


// Change display data per Index clicked on per Page in pagination

function indexValue(e) {

    let enValue = e.target.innerText;
    let active;

    if (enValue == "Next") {

        alll.forEach(element => {

            if (element.classList.contains('active')) {
                active = parseInt(element.innerText) + 1;
                pagDisplay(active, pagination);

            }
        });

        //Change statuses in Index overview 

        changeStatus(e, active);

    } else if (enValue == "Previous") {

        alll.forEach(element => {

            if (element.classList.contains('active')) {


                active = parseInt(element.innerText) - 1;

                if (active <= 0) {

                    active = 1;
                }

                pagDisplay(active, pagination);

            }
        });

        changeStatus(e, active);

    } else {

        pagDisplay(enValue, pagination);
        changeStatus(e, enValue);


    }
}


//Display for pagination

function pagDisplay(index, pagination) {


    http.get(' https://api.myjson.com/bins/innhs')
        .then(data => {

            ui.getProducts(data.products, index, pagination)
        }).then(() => {

            getButtons();
        });
}

// Get data per Pagination

function pagValue(e) {


    http.get(' https://api.myjson.com/bins/innhs')
        .then(data => {

            ui.getProducts(data.products, index, e)
        }).then(() => {

            getButtons();
        });




}