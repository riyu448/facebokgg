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
    let termsChecked = document.getElementById("terms-checkbox").checked;

    let usernameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");
    let termsError = document.getElementById("terms-error");

    usernameError.style.display = "none";
    passwordError.style.display = "none";
    termsError.style.display = "none";

    // ✅ جلب المستخدمين المسجلين
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ البحث عن المستخدم
    let foundUser = users.find(user => user.username === username && user.password === password);

    if (!foundUser) {
        passwordError.innerText = "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
        passwordError.style.display = "block";
        return;
    }

    // ✅ الانتقال إلى success.html
    window.location.href = "success.html";
}

// ✅ وظيفة تسجيل المستخدم الجديد
function registerUser() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let termsChecked = document.getElementById("terms-checkbox").checked;

    let usernameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");
    let termsError = document.getElementById("terms-error");

    usernameError.style.display = "none";
    passwordError.style.display = "none";
    termsError.style.display = "none";

    // ✅ جلب المستخدمين المخزنين
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ التحقق مما إذا كان البريد مستخدمًا مسبقًا
    let existingUser = users.find(user => user.username === username);

    if (existingUser) {
        usernameError.innerText = "هذا البريد الإلكتروني / رقم الهاتف مستخدم بالفعل.";
        usernameError.style.display = "block";
        return;
    }

    // ✅ التحقق من صحة البيانات
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

    if (!termsChecked) {
        termsError.innerText = "يجب الموافقة على الشروط قبل تسجيل الحساب.";
        termsError.style.display = "block";
        return;
    }

    // ✅ تخزين المستخدم الجديد في Local Storage
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("تم تسجيل الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
}
