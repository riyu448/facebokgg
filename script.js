document.addEventListener("DOMContentLoaded", function () {    
    document.getElementById("login-form").addEventListener("submit", function (event) {    
        event.preventDefault();  
        loginUser();  
    });  
    checkUser();
});

// ✅ إنشاء مستخدم جديد وتعيين أول مستخدم كـ Admin
function registerUser() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    if (!username || !password) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let role = users.length === 0 ? "admin" : "user"; // أول مستخدم هو Admin

    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", username);

    window.location.href = "success.html";
}

// ✅ تسجيل الدخول والتحقق من الحساب
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

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = users.find(user => user.username === username);

    if (foundUser) {
        if (foundUser.password === password) {
            localStorage.setItem("currentUser", username);
            window.location.href = "success.html";
        } else {
            passwordError.innerText = "كلمة المرور غير صحيحة.";  
            passwordError.style.display = "block";  
        }
    } else {
        usernameError.innerText = "المستخدم غير موجود. يرجى التسجيل أولاً.";  
        usernameError.style.display = "block";
    }
}

// ✅ التحقق من المستخدم عند تحميل الصفحة
function checkUser() {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        window.location.href = "success.html";
    }
}

// ✅ حماية صفحة عرض المستخدمين بحيث لا يمكن لأي شخص غير المسؤول (admin) الوصول إليها
function protectAdminPage() {
    let currentUser = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === currentUser);

    if (!user || user.role !== "admin") {
        alert("ليس لديك صلاحية للوصول إلى هذه الصفحة.");
        window.location.href = "index.html";
    }
}

// ✅ عرض المستخدمين المسجلين مع إظهار كلمات المرور
function displayUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let usersList = document.getElementById("users-list");

    if (users.length === 0) {
        usersList.innerHTML = "<p>لا يوجد مستخدمون مسجلون.</p>";
        return;
    }

    usersList.innerHTML = users.map(user => 
        `<p>اسم المستخدم: ${user.username} | كلمة المرور: ${user.password} | الدور: ${user.role}</p>`
    ).join("");
}

// ✅ وظيفة فتح النافذة المنبثقة
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// ✅ وظيفة إغلاق النافذة المنبثقة
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
