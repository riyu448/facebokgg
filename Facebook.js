document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("❌ يجب ملء جميع الحقول!");
            return;
        }

        // تخزين بيانات المستخدم في LocalStorage (محليًا)
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("✅ تم تسجيل المستخدم بنجاح!");
        window.location.href = "success.html"; // توجيه إلى صفحة النجاح
    });
});
