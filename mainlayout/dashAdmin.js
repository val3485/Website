class ComponentDash extends HTMLElement {
    connectedCallback(){
        this.innerHTML =`
         <div class="dashAdmin">
                <div class="logodash">
                    <img  src="../pics/logo.svg">
                    <p>Purr n Pour</p>
                </div>

                <div class="listAdmin" >
                    <img  src="../pics/dash.svg">
                    <p>Dashboard</p>
                </div>

                <div class="listAdmin">
                    <img  src="../pics/products.svg">
                    <p>Products</p>
                </div>


                <div class="listAdmin">
                    <img  src="../pics/orders.svg">
                    <p> 
                        <a href ="./orders.html" id="unset" >
                        Orders
                        </a>
                    </p>
                </div>


                <div class="listAdmin">
                    <img  src="../pics/receipt.svg">
                    <p>Receipt List</p>
                </div>

                <div class="sign-out">
                        <div class="listAdmin">
                            <a href="./login.html" id="sign-out">Sign-out</a>
                        </div>
                </div>
        </div>
        `;
    }
}

customElements.define("add-dash", ComponentDash);