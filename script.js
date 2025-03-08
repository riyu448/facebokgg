document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            alert("❌ يجب ملء جميع الحقول!");
            return;
        }

        // التحقق مما إذا كان المستخدم مسجلاً مسبقًا
        let storedUser = localStorage.getItem(username);

        if (storedUser) {
            // المستخدم موجود، تحقق من كلمة المرور
            const userData = JSON.parse(storedUser);
            if (userData.password === password) {
                alert("✅ تسجيل الدخول ناجح!");
                window.location.href = "success.html"; // توجيه إلى صفحة النجاح
            } else {
                alert("❌ كلمة المرور غير صحيحة!");
            }
        } else {
            // المستخدم غير موجود، يتم تسجيله تلقائيًا
            localStorage.setItem(username, JSON.stringify({ password: password }));
            alert("✅ تم تسجيل الدخول لأول مرة! تم حفظ بياناتك.");
            window.location.href = "success.html"; // توجيه إلى صفحة النجاح
        }
    });
});
