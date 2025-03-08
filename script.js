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
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let termsChecked = document.getElementById("terms-checkbox").checked;

    let usernameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");
    let termsError = document.getElementById("terms-error");

    let isValid = true;

    // ✅ التحقق من إدخال البريد أو الهاتف
    if (username === "") {
        usernameError.innerText = "يرجى إدخال البريد الإلكتروني أو رقم الهاتف.";
        usernameError.style.display = "block";
        isValid = false;
    } else {
        usernameError.style.display = "none";
    }

    // ✅ التحقق من إدخال كلمة المرور
    if (password === "") {
        passwordError.innerText = "يرجى إدخال كلمة المرور.";
        passwordError.style.display = "block";
        isValid = false;
    } else {
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
