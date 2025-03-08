document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.querySelector(".toggle-password");
    const loginForm = document.getElementById("login-form");

    // ✅ إظهار/إخفاء كلمة المرور مع أيقونة شبيهة بفيسبوك
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.innerHTML = '<img src="eye-open.svg" alt="إظهار" width="20">';
        } else {
            passwordInput.type = "password";
            togglePassword.innerHTML = '<img src="eye-closed.svg" alt="إخفاء" width="20">';
        }
    });

    // ✅ منع تسجيل الدخول بدون إدخال بيانات
    loginForm.addEventListener("submit", function (event) {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const termsCheckbox = document.getElementById("terms-checkbox");
        const termsError = document.getElementById("terms-error");

        if (username === "" || password === "") {
            event.preventDefault();
            alert("يرجى إدخال البريد الإلكتروني وكلمة المرور!");
            return;
        }

        // ✅ التحقق من الشروط قبل تسجيل الدخول
        if (!termsCheckbox.checked) {
            event.preventDefault();
            termsError.textContent = "يجب الموافقة على الشروط والأحكام!";
            termsError.style.display = "block";
        } else {
            termsError.style.display = "none";
        }
    });

    // ✅ إظهار وإخفاء النوافذ المنبثقة
    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    document.getElementById("show-terms").addEventListener("click", function (event) {
        event.preventDefault();
        openModal("terms-modal");
    });

    document.getElementById("show-privacy").addEventListener("click", function (event) {
        event.preventDefault();
        openModal("privacy-modal");
    });

    document.querySelectorAll(".close").forEach(closeBtn => {
        closeBtn.addEventListener("click", function () {
            this.parentElement.parentElement.style.display = "none";
        });
    });
});
