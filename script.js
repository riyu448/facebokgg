document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        loginUser();
    });
});

// ✅ وظيفة تسجيل الدخول
function loginUser() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let usernameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");

    // ✅ إخفاء الأخطاء السابقة
    usernameError.style.display = "none";
    passwordError.style.display = "none";

    // ✅ التحقق من صحة الإدخال
    if (!username) {
        usernameError.innerText = "يرجى إدخال البريد الإلكتروني أو رقم الهاتف.";
        usernameError.style.display = "block";
        return;
    }

    if (!password) {
        passwordError.innerText = "يرجى إدخال كلمة المرور.";
        passwordError.style.display = "block";
        return;
    }

    // ✅ جلب المستخدمين المسجلين
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ البحث عن المستخدم
    let foundUser = users.find(user => user.username === username);

    if (!foundUser) {
        usernameError.innerText = "البريد الإلكتروني أو رقم الهاتف غير مسجل.";
        usernameError.style.display = "block";
        return;
    }

    // ✅ التحقق من كلمة المرور
    if (foundUser.password !== password) {
        passwordError.innerText = "كلمة المرور غير صحيحة.";
        passwordError.style.display = "block";
        return;
    }

    // ✅ الانتقال إلى success.html
    window.location.href = "success.html";
}
