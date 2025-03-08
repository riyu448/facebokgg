document.addEventListener("DOMContentLoaded", function () {

// ✅ التحقق من تسجيل الدخول عند تحميل الصفحة      
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

checkUser();

});

// ✅ وظيفة تسجيل الدخول
function loginUser() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let termsCheckbox = document.getElementById("terms-checkbox");

    let usernameError = document.getElementById("username-error");    
    let passwordError = document.getElementById("password-error");    
    let termsError = document.getElementById("terms-error");    

    usernameError.style.display = "none";    
    passwordError.style.display = "none";    
    termsError.style.display = "none";    

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
    let phoneRegex = /^[0-9]{8,15}$/;    

    if (!username) {    
        usernameError.innerText = "يرجى إدخال البريد الإلكتروني أو رقم الهاتف.";    
        usernameError.style.display = "block";    
        return;    
    }    

    if (!emailRegex.test(username) && !phoneRegex.test(username)) {    
        usernameError.innerText = "يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح.";    
        usernameError.style.display = "block";    
        return;    
    }    

    if (!password) {    
        passwordError.innerText = "يرجى إدخال كلمة المرور.";    
        passwordError.style.display = "block";    
        return;    
    }    

    if (!termsCheckbox.checked) {    
        termsError.innerText = "يجب الموافقة على الشروط والأحكام.";    
        termsError.style.display = "block";    
        return;    
    }    

    // ✅ جلب المستخدمين المسجلين      
    let users = JSON.parse(localStorage.getItem("users")) || [];    

    // ✅ البحث عن المستخدم      
    let foundUser = users.find(user => user.username === username);    

    if (foundUser) {    
        // ✅ إذا كان الحساب موجودًا، تحقق من كلمة المرور      
        if (foundUser.password === password) {    
            localStorage.setItem("currentUser", username);       
            return;    
        } else {    
            passwordError.innerText = "كلمة المرور غير صحيحة.";    
            passwordError.style.display = "block";    
            return;    
        }    
    }    

    // ✅ إنشاء الحساب تلقائيًا إذا لم يكن موجودًا      
    users.push({ username, password });    
    localStorage.setItem("users", JSON.stringify(users));    
    localStorage.setItem("currentUser", username);    

    // ✅ تسجيل الدخول مباشرة      
    window.location.href = "success.html";
}

// ✅ وظيفة فتح النافذة المنبثقة
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// ✅ وظيفة إغلاق النافذة المنبثقة
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// ✅ التحقق من المستخدم عند تحميل الصفحة
function checkUser() {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        window.location.href = "success.html";
    }
}
