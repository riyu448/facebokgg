document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        loginUser();
    });

    document.getElementById("show-terms").addEventListener("click", function(event) {      
        event.preventDefault();    
        openModal("terms-modal");    
    });

    document.getElementById("show-privacy").addEventListener("click", function(event) {      
        event.preventDefault();    
        openModal("privacy-modal");    
    });
});

// ✅ التحقق من صحة البريد الإلكتروني أو رقم الهاتف
function validateInput(username, password) {
    let usernameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");
    let termsError = document.getElementById("terms-error");
    let termsCheckbox = document.getElementById("terms-checkbox");

    usernameError.style.display = "none";
    passwordError.style.display = "none";
    termsError.style.display = "none";

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^[0-9]{8,15}$/;

    if (!username) {
        usernameError.innerText = "يرجى إدخال البريد الإلكتروني أو رقم الهاتف.";
        usernameError.style.display = "block";
        return false;
    }

    if (!emailRegex.test(username) && !phoneRegex.test(username)) {
        usernameError.innerText = "يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح.";
        usernameError.style.display = "block";
        return false;
    }

    if (!password) {
        passwordError.innerText = "يرجى إدخال كلمة المرور.";
        passwordError.style.display = "block";
        return false;
    }

    if (!termsCheckbox.checked) {    
        termsError.innerText = "يجب الموافقة على الشروط والأحكام.";    
        termsError.style.display = "block";    
        return false;    
    }    

    return true;
}

// ✅ تسجيل الدخول باستخدام Firebase
function loginUser() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!validateInput(username, password)) return;

    auth.signInWithEmailAndPassword(username, password)
        .then(userCredential => {
            localStorage.setItem("currentUser", username);
            window.location.href = "success.html";
        })
        .catch(error => {
            document.getElementById("password-error").innerText = "خطأ في تسجيل الدخول: " + error.message;
            document.getElementById("password-error").style.display = "block";
        });
}

// ✅ عرض المستخدمين
function showUsers() {
    let usersList = document.getElementById("users-list");
    usersList.innerHTML = "";

    db.collection("users").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let user = doc.data();
                usersList.innerHTML += `<li>📧 ${user.username}</li>`;
            });
        });
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
