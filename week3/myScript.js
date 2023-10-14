function validateEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
}


// blur username


username.addEventListener("blur", function () {
    const username = document.getElementById("username");
    const username_div = document.getElementById("username_div");

    if (username.value.trim() === "") {
        username_div.className="input-control error"
        usernameError.textContent = "Username is required";
    } 
    
    else {
        username_div.className="input-control success"
        usernameError.textContent = "";
    }
});

email.addEventListener("blur", function () {

    const email = document.getElementById("email");
    const email_div = document.getElementById("email_div");

    if (email.value.trim() === "") {
        email_div.className="input-control error"
        emailError.textContent = "Email is required";
    }
    else if (validateEmail(email.value.trim()) == false){
        email_div.className="input-control error"
        emailError.textContent = "Enter Valid Email";
    }
    else {
        email_div.className="input-control success"
        emailError.textContent = "";
    }
});

password.addEventListener("blur", function () {
    const password = document.getElementById("password");
    const password_div = document.getElementById("password_div");

    if (password.value.trim() === "") {
        password_div.className="input-control error"
        passwordError.textContent = "Password is required";
    }
    else if (password.value.trim().length <= 7 ){
        password_div.className="input-control error"
        passwordError.textContent = "Password is too short";
    } else {
        password_div.className="input-control success"
        passwordError.textContent = "";
    }
});

password2.addEventListener("blur", function () {
    const password2 = document.getElementById("password2");
    const password2_div = document.getElementById("password2_div");

    if (password2.value.trim() === "") {
        password2_div.className="input-control error"
        password2Error.textContent = "Password is required";
    } 
    else if(password.value.trim() !== password2.value.trim()){
        password2_div.className="input-control error"
        password2Error.textContent = "Password's dont match";
    }
    else {
        password2_div.className="input-control success"
        password2Error.textContent = "";
    }
});


form.addEventListener("submit", function (e) {
    e.preventDefault();
     if (password2_div.className === "input-control success" && password_div.className === "input-control success" && email_div.className === "input-control success" && username_div.className==="input-control success" ){
        alert("Form submitted successfully");
     } else{
        alert("Make sure there are no errors")
     }

});
