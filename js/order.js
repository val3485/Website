const orders =[
{
    id: "1",
    name: "Clare",
    order_num: 2343,
    item_qty: 34,
    Total: "2000.00"
},

{
    id: "1",
     name: "Clare",
    order_num: 2343,
    item_qty: 34,
    Total: "2000.00"
}, 

{
    id: "1", name: "Clare",
    order_num: 2343,
    item_qty: 34,
    Total: "2000.00"
},
{
    id: "1", name: "Clare",
    order_num: 2343,
    item_qty: 34,
    Total: "2000.00"
}
]



    localStorage.setItem('orders', JSON.stringify(orders));

    orders = JSON.parse(localStorage.getItem('orders')) || [];



    function table(){

        const data = document.getElementById("data");
        
        data.innerHTML = ""; 
        
        orders.forEach(item => {
            data.innerHTML += `
               <div class="heuy2" onclick="expand(this)">
                    <div class="show">
                        <p>#${item.id} huh</p>
                    </div>

                    <div class="show">
        
                        <p>${item.id}</p>
                    </div>
                    <div class="show">
        
                        <p>5</p>
                    </div>
                    <div class="show">
        
                        <p>8900</p>
                    </div>
            </div>
            `;
        });
           data.innerHTML = html;
    }

    console.log(table)