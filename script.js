document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const termsCheckbox = document.getElementById("terms-checkbox");
    const usernameInput = document.getElementById("username");
    const usernameError = document.getElementById("username-error");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // منع الإرسال الافتراضي

        // ✅ التحقق من الموافقة على الشروط
        if (!termsCheckbox.checked) {
            alert("يجب الموافقة على الشروط والأحكام قبل تسجيل الدخول.");
            return;
        }

        // ✅ التحقق من إدخال البريد أو الهاتف
        if (usernameInput.value.trim() === "") {
            usernameError.textContent = "يرجى إدخال البريد الإلكتروني أو رقم الهاتف.";
            usernameError.style.display = "block";
            return;
        } else {
            usernameError.style.display = "none";
        }

        // ✅ تنفيذ تسجيل الدخول بنجاح
        document.getElementById("login-box").style.display = "none";
        document.getElementById("success-box").style.display = "block";
    });

    // ✅ إعادة تعيين النموذج عند العودة لتسجيل الدخول
    window.resetForm = function () {
        document.getElementById("login-box").style.display = "block";
        document.getElementById("success-box").style.display = "none";
        loginForm.reset();
    };

    // ✅ التحكم في النوافذ المنبثقة
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

    window.closeModal = closeModal;
});
