class UI {

    constructor() {

        this.pageItems = document.querySelector('.pagination');
        this.pagePer = document.querySelectorAll('.page-item');
        this.pagePerA = document.querySelector('.active');


    }

    //Display of checkout on final step

    checkoutDisplay(data, local) {


        let prices = [];
        let tbody = document.getElementById('widget');
        let output = '';
        local.forEach(element => {
            let el = element.id - 1;
            let value = data[el].price * element.quantity
            prices.push(value);
            output += ` 
            <div class="summary-block">
            <div class="summary-content">
                <div class="summary-head"><h5 class="summary-title">${data[el].name}</h5></div>
                <div class="summary-price">
                    <p>${data[el].price} / ${element.quantity}</p>
                </div>
            </div>
        </div>`
        });

        tbody.innerHTML = output;


        let check = document.getElementById('summary-head');

        let totalDisplay = prices.reduce(function (acc, val) {
            return acc + val;
        }, 0);
        console.log(totalDisplay)

        check.innerText = totalDisplay

    }

    // Main product listing, by Index and Pagination 

    getProducts(data, index, pagination) {


        let element = (index * pagination) - pagination;
        let delimiterElement;

        if (index == 1) {

            delimiterElement = 0;

        } else {

            delimiterElement = element;
        }



        let entryData = data.splice(delimiterElement, pagination);

        this.dataDisplay(entryData)


    }

    //List by Category

    categoryLister(data, category) {

        let rule = data.filter(function (el) {

            return el.category == category;

        });

        this.dataDisplay(rule)

    }

    //Display data and check if product is in cart 

    dataDisplay(entryData) {


        let inCartStorage = JSON.parse(localStorage.getItem("cartarray"));
        let maincontent = document.getElementById('main-content');
        let output = '';


        let inCartArray = [];
        if (inCartStorage !== null) {

            inCartStorage.forEach(element => {
                inCartArray.push(element.id)
            });
        }

        let isDisabled;
        let inCart;

        entryData.forEach(myData => {


            let string = String(myData.id)
            inCart = inCartArray.includes(string)

            if (inCart == true) {
                isDisabled = 'disabled'
            } else {

                isDisabled = ''
            }
            output += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <a href="#"><img class="card-img-top" src="${myData.img}" alt=""></a>
                <div class="card-body">
                    <h4 class="card-title">
                        <a href="#">${myData.name}</a>
                    </h4>
                    <h5>$${myData.price}</h5>
                    <p class="card-text">${myData.description}</p>
                </div>
                <button  data-id="${myData.id}" type="button" class="btn btn-info" ${isDisabled} >Add to cart</button>
                
            <div class="card-footer">
                <small class="text-muted">${myData.category}</small>
            </div>
        </div>
    </div>`
        });

        maincontent.innerHTML = output;

    }

}

export const ui = new UI();