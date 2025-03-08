document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault(); // منع الإرسال الافتراضي
        validateForm();
    });

    // ✅ إغلاق النوافذ المنبثقة عند النقر خارجها
    window.onclick = function (event) {
        let termsModal = document.getElementById("terms-modal");
        let privacyModal = document.getElementById("privacy-modal");
        if (event.target === termsModal) termsModal.style.display = "none";
        if (event.target === privacyModal) privacyModal.style.display = "none";
    };
});

function validateForm() {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let termsChecked = document.getElementById("terms-checkbox").checked;

    let usernameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");
    let termsError = document.getElementById("terms-error");

    let isValid = true;

    // ✅ التحقق من صحة البريد الإلكتروني أو رقم الهاتف
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^(\+?\d{1,3})?\d{10,15}$/;

    if (username.value.trim() === "") {
        username.style.border = "2px solid red";
        usernameError.innerText = "يرجى إدخال البريد الإلكتروني أو رقم الهاتف.";
        usernameError.style.display = "block";
        isValid = false;
    } else if (!emailRegex.test(username.value) && !phoneRegex.test(username.value)) {
        username.style.border = "2px solid red";
        usernameError.innerText = "يرجى إدخال بريد إلكتروني صالح أو رقم هاتف صحيح.";
        usernameError.style.display = "block";
        isValid = false;
    } else {
        username.style.border = "1px solid #ddd";
        usernameError.style.display = "none";
    }

    // ✅ التحقق من صحة كلمة المرور
    if (password.value.trim() === "") {
        password.style.border = "2px solid red";
        passwordError.innerText = "يرجى إدخال كلمة المرور.";
        passwordError.style.display = "block";
        isValid = false;
    } else if (password.value.length < 6) {
        password.style.border = "2px solid red";
        passwordError.innerText = "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل.";
        passwordError.style.display = "block";
        isValid = false;
    } else {
        password.style.border = "1px solid #ddd";
        passwordError.style.display = "none";
    }

    // ✅ التحقق من الموافقة على الشروط
    if (!termsChecked) {
        termsError.innerText = "يجب الموافقة على الشروط والأحكام قبل تسجيل الدخول.";
        termsError.style.display = "block";
        isValid = false;
    } else {
        termsError.style.display = "none";
    }

    // ✅ إذا كان كل شيء صحيحًا، انتقل إلى `success.html`
    if (isValid) {
        window.location.href = "success.html";
    }
}

// ✅ دالة إغلاق النوافذ المنبثقة
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// ✅ دالة فتح النوافذ المنبثقة
document.getElementById("show-terms").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("terms-modal").style.display = "block";
});

document.getElementById("show-privacy").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("privacy-modal").style.display = "block";
});
