class ComponentFooter  extends HTMLElement{

    connectedCallback(){

        this.innerHTML = `
    
            <div class="footer">
    
                    <img src="./pics/footer.svg">
    
                <div>
                    <div class="logoFooter">
                        <img src="./pics/logoWhite.svg" >
                        <p id="name">
                            Purr n Pour
                        </p>
                    </div>
    
                    <div class="details">
                        <p>Refund Policy</p>
                        <p>Terms and Condition</p>
                        <h4>Policies</h4>
                    </div>
    
                    <div class="details">
                        <p>+6387 876 8987</p>
                        <p>codies@gmail.com</p>
                        <p>28 Greenfield Avenue, Brgy. San Isidro, Quezon City, Metro Manila, Philippines 1109</p>
                        <h4>Contact Us</h4>
                    </div>
    
                    <div class="pages">
                        <div style="display: flex; gap: 10px;">
                            <img src="./pics/igIconw.svg">
                            <p>@hihi_hi_follow</p>
                        </div>
                        <div style="display: flex;gap: 10px;">
                            <img src="./pics/xIconw.svg">
                            <p>@hihi_hi_follow</p>
                        </div>
                        <div style="display: flex;gap: 10px;">
                            <img src="./pics/fbIconw.svg">
                            <p>KapitKayBatman page</p>
                        </div>
                        <h4>Follow us</h4>
                    </div>
                   
                </div>
    
                
            </div>
        
        `;
    }
}

customElements.define("add-footer", ComponentFooter);
