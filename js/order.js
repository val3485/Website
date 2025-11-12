let orders =[
{
    id: 1,
    order_num: 454,
    name: "Clare",
    item_qty: 2,
    total: "2000.00",
    items: [
      { product: "Coffee Beans", price: 250, item_qty: 2 },
      { product: "Mug", price: 150, item_qty: 1 }
    ]
  },
  {
    id: 2,
    order_num: 454,
    name: "Alex",
    item_qty: 2,
    total: "1200.00",
    items: [
      { product: "Cookie", price: 100, item_qty: 3 },
      { product: "Latte", price: 300, item_qty: 1 }
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

        orders.items.forEach(prod => {
        products += `
            <div>
                <div>
                    <p>Coca Cola</p>
                </div>
                <div>
                    <p>P 895</p>
                </div>
                <div>
                    <p>9</p>
                </div>
            </div>
        `;
        });

        orders.forEach(item => {
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
        });
    }

    table()
    costumer_cart()
