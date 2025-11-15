let orders =[
{
    id: 1,
    order_num: 4543,
    name: "Clare Lubiano",
    item_qty: 2,
    total: "582.40",
    items: [
      { product: "Latte", price: 170, qty: 2 },
      { product: "Vanilla Milkshake", price: 180, qty: 1 }
    ]
  },
  {
    id: 2,
    order_num: 4529,
    name: "Sylvia Heart Sulla",
    item_qty: 2,
    total: "571.2",
    items: [
      { product: "Hot Chocolate", price: 170, qty: 3 }
    ]
  },
{
    id: 3,
    order_num: 8958,
    name: "Chybs Shantee Naje",
    item_qty: 2,
    total: "694.4",
    items: [
      { product: "Americano", price: 250, qty: 1 },
      { product: "Affogato", price: 220, qty: 1 },
      { product: "Cold Brew with Milk", price: 150, qty: 1 }
    ]
  },
  {
    id: 4,
    order_num: 3652,
    name: "John Doe",
    item_qty: 2,
    total: "347.2",
    items: [
      { product: "Flat White", price: 175, qty: 1 },
      { product: "Espresso", price: 135, qty: 1 }
    ]
  },
{
    id: 5,
    order_num: 4521,
    name: "Alexis Mayocalba",
    item_qty: 2,
    total: "593.6",
    items: [
      { product: "Vanilla Milkshake", price: 180, qty: 2 },
      { product: "Hot Chocolate", price: 170, qty: 1 }
    ]
  },
  {
    id: 6,
    order_num: 2356,
    name: "Donald Higgins",
    item_qty: 2,
    total: "336.00",
    items: [
      { product: "Lemonade", price: 100, qty: 3 }
    ]
  },
{
    id: 7,
    order_num: 1542,
    name: "Edward Liao",
    item_qty: 2,
    total: "490.00",
    items: [
      { product: "Espresso", price: 135, qty: 2 },
      { product: "Affogato", price: 220, qty: 1 }
    ]
  },
  {
    id: 8,
    order_num: 8923,
    name: "Belle Tiu",
    item_qty: 2,
    total: "604.8",
    items: [
      { product: "Vanilla Milkshake", price: 180, qty: 3 }
    ]
  }
]

    localStorage.setItem('orders', JSON.stringify(orders));
    orders = JSON.parse(localStorage.getItem('orders')) || [];
 

    function table(){

        const data = document.getElementById("data");
        
        data.innerHTML = ""; 
        
        orders.forEach(item => {
            data.innerHTML += `
               <div class="table-data" onclick="expand(this,${item.id})">
                  <div class="data-header">
                    <div class="show">
                        <p>#${item.order_num}</p>
                    </div>

                    <div class="show">
                        <p>${item.name}</p>
                    </div>

                    <div class="show">
                        <p>${item.item_qty}</p>
                    </div>

                    <div class="show">
                        <p>${item.total}</p>
                    </div>
                  </div>

                  <div id="acc-content"> </div>
            </div>
            `;
        });
    }


    
function expand(e, id) {

    const acc = document.querySelectorAll(".table-data")

    acc.forEach(item => {

        if (item === e) {
            e.classList.toggle("expand")
            const cart = item.querySelector("#acc-content"); 

            if (item.classList.contains("expand")) {
                const order = orders.find(o => o.id === id) 
                let products = ""
                let products_data = ""

                order.items.forEach(prod => { 
                    products_data += `
                        <div class="content">
                            <div>
                                <p>${prod.product}</p>
                            </div>
                            <div>
                                <p>${prod.price}</p>
                            </div>
                            <div>
                                <p>${prod.qty}</p>
                            </div>
                        </div > `
                });

                products += `
                    <div class="acc-content"> 
                        <div class="content-header">
                            <div>
                                <h2>Name</h2>
                            </div>
                            <div>

                                <h2>Price</h2>
                            </div>
                            <div>
                                <h2>Quantity</h2>
                            </div>
                        </div>
                        ${products_data}
                    </div>
                `;

                cart.innerHTML = products; 
            }
        } else {
            item.classList.remove("expand") 
        }
    })
}


table()