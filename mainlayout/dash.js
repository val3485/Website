function addDashboard(){
    // const currentDiv = document.getElementById("dash");
    const dash = document.createElement("div"); 
    dash.className ="dash";

    dash.innerHTML = `
        <div id="dash">

            <div class="dashboard"">
                <a href="./homepage.html" id="home"> 
                    <div >
                    
                            <img id="logo" src="../pics/logo.svg">
                            <p id="name">
                                Purr n Pour
                            </p>
                
                    </div>
                </a>
                <div id="end-div">
                    <p onclick="sidebar();sidebar2()">shop</p>
                   
                    <p><a href="./aboutUs.html" id="abt_us">About us</a></p>
                    <a href="./cart.html" ><img id="cart"  style="margin-bottom: 20px; width:40px;height:40px;" src="../pics/cart.svg"></a> 
                     
                </div>
                    
            </div>

            <div id="side-bar">
                <div >
                    <img id="logo"   src="../pics/logo.svg">
                    <p class="overview">
                        Overview of products
                    </p>
                
                </div>

                <div id="d1">
                    <div>
                        <img src="../pics/hot_coffee.svg">
                        <p>Hot Coffee</p>
                    </div>
                    <div>
                        <img src="../pics/coffee.svg">
                        <p>Coffee</p>
                    </div>
                    <div>
                        <img src="../pics/non_caffein.svg">
                        <p>Non-Caffeinated</p>
                    </div>
                </div>
            </div>
        <div>
    `; 

    document.body.appendChild(dash);
}



document.addEventListener("DOMContentLoaded", function (e) {
    addDashboard();
});

document.getElementById('abt_us').addEventListener('click', function(e) {
  e.preventDefault(); 
});
document.getElementById('home').addEventListener('click', function(e) {
  e.preventDefault(); 
});

function sidebar (){
    const sb = document.getElementById("side-bar");
    //checks for the type of style
    if (sb.style.display == "block") {
        sb.style.display = "none";
    } else {
        sb.style.display = "block";
    }
}  