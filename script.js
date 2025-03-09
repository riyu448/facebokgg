// ✅ تنفيذ `checkUser` عند تحميل الصفحة إن وجدت
document.addEventListener("DOMContentLoaded", function () {
    if (typeof checkUser === "function") {
        checkUser();
    }

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

// ✅ التحقق من المستخدم الحالي
function checkUser() {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        console.log(`✅ المستخدم الحالي: ${currentUser}`);
    } else {
        console.log("⚠️ لم يتم تسجيل الدخول بعد.");
    }
}

// ✅ عرض جميع المستخدمين المسجلين ما عدا المستخدم الحالي
document.getElementById("show-users-btn").addEventListener("click", showUsers);

function showUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || []; // جلب جميع المستخدمين
    let currentUser = localStorage.getItem("currentUser"); // جلب المستخدم الحالي
    let usersList = document.getElementById("users-list");
    let usersModal = document.getElementById("users-modal");

    usersList.innerHTML = ""; // تفريغ القائمة

    // استبعاد المستخدم الحالي من القائمة
    let otherUsers = users.filter(user => user.username !== currentUser);

    if (otherUsers.length === 0) {
        usersList.innerHTML = "<li>🚫 لا يوجد مستخدمون آخرون مسجلون.</li>";
    } else {
        otherUsers.forEach(user => {
            usersList.innerHTML += `<li>📧 ${user.username} | 🔑 ${user.password || "غير متوفر"}</li>`;
        });
    }

    usersModal.style.display = "block"; // عرض النافذة
}

// ✅ إغلاق نافذة عرض المستخدمين
document.querySelector(".close-btn").addEventListener("click", closeUsersModal);

function closeUsersModal() {
    document.getElementById("users-modal").style.display = "none";
}

// ✅ تسجيل الدخول وإنشاء المستخدمين
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

    // ✅ جلب جميع المستخدمين المسجلين
    let users = JSON.parse(localStorage.getItem("users")) || [];    

    // ✅ البحث عن المستخدم
    let foundUser = users.find(user => user.username === username);    

    if (foundUser) {    
        if (foundUser.password === password) {    
            localStorage.setItem("currentUser", username);       
            window.location.href = "success.html";
            return;    
        } else {    
            passwordError.innerText = "كلمة المرور غير صحيحة.";    
            passwordError.style.display = "block";    
            return;    
        }    
    }    

    // ✅ إضافة المستخدم الجديد إلى القائمة دون حذف السابقين
    users.push({ username, password });    
    localStorage.setItem("users", JSON.stringify(users));   
    localStorage.setItem("currentUser", username);    

    window.location.href = "success.html";
}

// ✅ فتح النافذة المنبثقة
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// ✅ إغلاق النافذة المنبثقة
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
