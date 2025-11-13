/**
 * @param {Event} event - The form submission event.
 */
function handleClientLogin(event) {
    const VALID_USERNAME = "Shantee Naje";
    const VALID_PASSWORD = "purrnpour";

    // getting data
    const usernameInput = document.getElementById('user').value;
    const passwordInput = document.getElementById('pass').value;
    
    // comparing
    if (usernameInput === VALID_USERNAME && passwordInput === VALID_PASSWORD) {
        
        // simulating "saving" the user's status by setting a flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', usernameInput);
        
        // navigating to dasboard
        window.location.href = './adminDash.html';
        
    } else {
        alert("Login failed! Invalid username or password.");
    }
    
    // false because the submission was handled manually 
    return false; 
}
