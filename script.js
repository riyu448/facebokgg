document.getElementById("show-terms").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("terms-modal").style.display = "block";
});

document.getElementById("show-privacy").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("privacy-modal").style.display = "block";
});

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const termsCheckbox = document.getElementById("terms-checkbox");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{8,15}$/;

        if (!emailRegex.test(username) && !phoneRegex.test(username)) {
            alert("❌ الرجاء إدخال بريد إلكتروني صحيح أو رقم هاتف صحيح!");
            return;
        }

        if (password === "") {
            alert("❌ يجب إدخال كلمة المرور!");
            return;
        }

        if (!termsCheckbox.checked) {
            alert("❌ يجب الموافقة على الشروط والأحكام قبل المتابعة!");
            return;
        }

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
});
