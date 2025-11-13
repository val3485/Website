let orders =[
{
    id: 1,
    order_num: 4543,
    name: "Clare Lubiano",
    item_qty: 2,
    total: "2000.00",
    items: [
      { product: "Latte", price: 250, qty: 2 },
      { product: "Vanilla Ice cream", price: 150, qty: 1 }
    ]
  },
  {
    id: 2,
    order_num: 4529,
    name: "Sylvia Heart Sulla",
    item_qty: 2,
    total: "1200.00",
    items: [
      { product: "Cookie", price: 100, qty: 3 },
      { product: "Latte", price: 300, qty: 1 }
    ]
  },
{
    id: 3,
    order_num: 8958,
    name: "Chybes Shantee Naje",
    item_qty: 2,
    total: "2000.00",
    items: [
      { product: "Coffee Beans", price: 250, qty: 2 },
      { product: "Mug", price: 150, qty: 1 }
    ]
  },
  {
    id: 4,
    order_num: 3652,
    name: "John Doe",
    item_qty: 2,
    total: "1200.00",
    items: [
      { product: "Cookie", price: 100, qty: 3 },
      { product: "Latte", price: 300, qty: 1 }
    ]
  },
{
    id: 5,
    order_num: 4521,
    name: "Alexis Mayocalba",
    item_qty: 2,
    total: "2000.00",
    items: [
      { product: "Coffee Beans", price: 250, qty: 2 },
      { product: "Mug", price: 150, qty: 1 }
    ]
  },
  {
    id: 6,
    order_num: 2356,
    name: "Donald Higgins",
    item_qty: 2,
    total: "1200.00",
    items: [
      { product: "Cookie", price: 100, qty: 3 },
      { product: "Latte", price: 300, qty: 1 }
    ]
  },
{
    id: 7,
    order_num: 1542,
    name: "Edward Liao",
    item_qty: 2,
    total: "2000.00",
    items: [
      { product: "Coffee Beans", price: 250, qty: 2 },
      { product: "Mug", price: 150, qty: 1 }
    ]
  },
  {
    id: 8,
    order_num: 8923,
    name: "Belle Tiu",
    item_qty: 2,
    total: "1200.00",
    items: [
      { product: "Cookie", price: 100, qty: 3 },
      { product: "Latte", price: 300, qty: 1 }
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
               <div class="table-data" onclick="expand(this)">
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
            `;
        });
    }

    function costumer_cart(){

        const cart = document.getElementById("cart-content");
        
        cart.innerHTML = ""; 
        orders.forEach(order => {
            let products = "";

            order.items.forEach(prod => {
            products += `
                <div>
                    <div>
                        <p>${prod.product}</p>
                    </div>
                    <div>
                        <p>${prod.price}</p>
                    </div>
                    <div>
                        <p>${prod.qty}</p>
                    </div>
                </div>
            `;
            });

            // orders.forEach(item => {
                cart.innerHTML += `
                <div class="acc-content">
                        <div>
                            <div>
                                <div>
                                    
                                    <h2>Product Name</h2>
                                </div>
                                <div>
                                    
                                    <h2>Price</h2>
                                </div>
                                <div>
                                    
                                    <h2>Quantity</h2>
                                </div>
                                
                            </div>

                            ${products}
                            
                        </div>
                    </div>
                `;
                console.log("EIDDG")
            // });
        })

        console.log("shihdf")
    }

    // function 

    table()
    costumer_cart()
    track()