document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.querySelector(".toggle-password");
    const loginForm = document.getElementById("login-form");

    // ✅ إظهار/إخفاء كلمة المرور
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🔒";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁️";
        }
    });

    // ✅ التحقق من الشروط قبل تسجيل الدخول
    loginForm.addEventListener("submit", function (event) {
        const termsCheckbox = document.getElementById("terms-checkbox");
        const termsError = document.getElementById("terms-error");

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
