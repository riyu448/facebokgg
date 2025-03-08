document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const usernameError = document.getElementById("username-error");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        const username = usernameInput.value.trim();
        const password = document.getElementById("password").value.trim();
        const termsCheckbox = document.getElementById("terms-checkbox");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{8,15}$/;

        // ✅ التحقق من صحة البريد أو الهاتف
        if (!emailRegex.test(username) && !phoneRegex.test(username)) {
            usernameError.textContent = "❌ الرجاء إدخال بريد إلكتروني صحيح أو رقم هاتف صحيح!";
            usernameError.style.display = "block"; // ✅ عرض الخطأ
            return;
        } else {
            usernameError.style.display = "none"; // ✅ إخفاء الخطأ إذا كان الإدخال صحيحًا
        }

        // ✅ التحقق من كلمة المرور
        if (password === "") {
            alert("❌ يجب إدخال كلمة المرور!");
            return;
        }

        // ✅ التحقق من الموافقة على الشروط
        if (!termsCheckbox.checked) {
            alert("❌ يجب الموافقة على الشروط والأحكام قبل المتابعة!");
            return;
        }

        // ✅ التحقق من وجود المستخدم في LocalStorage
        let storedUser = localStorage.getItem(username);

        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.password === password) {
                window.location.href = "success.html";
            } else {
                alert("❌ كلمة المرور غير صحيحة!");
            }
        } else {
            localStorage.setItem(username, JSON.stringify({ password: password }));
            window.location.href = "success.html";
        }
    });

    // ✅ التحكم في النوافذ المنبثقة
    document.getElementById("show-terms").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("terms-modal").style.display = "block";
    });

    document.getElementById("show-privacy").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("privacy-modal").style.display = "block";
    });

    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = "none";
    };
});
