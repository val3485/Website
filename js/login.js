
function ClientLogin(event) {
    const VALID_USERNAME = "Shantee Naje"; //valid acc
    const VALID_PASSWORD = "purrnpour";

    // getting data
    const userInput = document.getElementById('user').value;
    const passInput = document.getElementById('pass').value;
    
    // comparing
    if (userInput === VALID_USERNAME && passInput === VALID_PASSWORD) {
        
        // simulating "saving" the user's status by setting a flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', userInput);
        
        // navigating to dasboard
        window.location.href = './adminDash.html';
        
    } else {
        alert("Login failed! Invalid username or password.");
    }
    
    // false because the submission was handled manually 
    return false; 
}
