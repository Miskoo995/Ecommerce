class Cart {

  //display products in cart 

  cartDisplay(data, cartData) {


    let tbody = document.getElementById('tbody');
    let output = '';

    cartData.forEach(el => {

      let position = data[el.id - 1];


      output += ` <tr>
        <td><img  height="50" width="50" src="${position.img}" /> </td>
        <td>${position.name}</td>
        <td>${position.category}</td>
        <td><input class="form-control" data-id="${position.id}" type="number" min="1" value="${el.quantity}" /></td>
        <td class="price">${position.price} $</td>
        <td class="text-right"><button  data-id="${position.id}" class="btn btn-sm btn-danger">x</button> </td>
    </tr>`;


    });


    tbody.innerHTML = output;


    this.localStorage(cartData);
    this.priceControl(data);


    let formControl = document.querySelectorAll('.form-control');


    formControl.forEach(control => {

      control.addEventListener('blur', (event) => {

        let eventTarget = event.target.dataset.id;



        cartData.forEach(element => {


          if (element.id === eventTarget) {

            cartData.splice(cartData.indexOf(element), 1);

          }
        });

        let element = {};

        element.id = eventTarget;
        element.quantity = control.value;
        cartData.push(element)

        this.localStorage(cartData)
        this.priceControl(data)

      })


    });

    //Get data for delete from cart 


    let btnDanger = document.querySelectorAll('.btn-danger');


    btnDanger.forEach(danger => {

      danger.addEventListener('click', (event) => {

        let eventTarget = event.target.dataset.id;

        let index = cartData.indexOf(eventTarget)
        cartData.splice(index, 1)

        danger.parentElement.parentElement.remove()

        this.localStorage(cartData)
        this.priceControl(data);


      });


    });

  }

  //Save data in LocalStorage 

  localStorage(data) {

    localStorage.setItem("cartarray", JSON.stringify(data));

  }

  // Display Price in cart 

  priceControl(data) {

    let getLocalStorange = JSON.parse(localStorage.getItem('cartarray'));



    let prices = [];
    getLocalStorange.forEach(element => {
      let el = element.id - 1;
      let value = data[el].price * element.quantity
      prices.push(value);

    });


    let total = document.getElementById('total');
    let totalDisplay = prices.reduce(function (acc, val) {
      return acc + val;
    }, 0)

    total.innerHTML = ` <td><strong>Total</strong></td>
      <td class="text-right"><strong>${totalDisplay}$</strong></td>`;
  }



}


export const cart = new Cart();