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

        // ✅ التحقق مما إذا كان المستخدم مسجلاً مسبقًا
        const storedUser = localStorage.getItem(username);

        if (storedUser) {
            const userData = JSON.parse(storedUser);

            if (userData.password === password) {
                alert("✅ تسجيل الدخول ناجح!");
                document.getElementById("login-box").style.display = "none";
                document.getElementById("success-box").style.display = "block";
            } else {
                alert("❌ كلمة المرور غير صحيحة!");
            }
        } else {
            alert("❌ المستخدم غير مسجل!");
        }
    });

    // ✅ زر التسجيل (إضافة مستخدم جديد)
    const signupButton = document.querySelector(".signup");
    if (signupButton) {
        signupButton.addEventListener("click", function () {
            const username = prompt("أدخل البريد الإلكتروني أو رقم الهاتف:");
            const password = prompt("أدخل كلمة المرور:");

            if (username && password) {
                if (!localStorage.getItem(username)) {
                    localStorage.setItem(username, JSON.stringify({ password: password }));
                    alert("✅ تم إنشاء الحساب بنجاح!");
                } else {
                    alert("❌ هذا المستخدم مسجل بالفعل!");
                }
            } else {
                alert("❌ يجب إدخال جميع البيانات!");
            }
        });
    }
});

// ✅ إزالة التنبيه غير الضروري عند تحميل الصفحة
window.onload = function() {
    console.log("LocalStorage Data:", localStorage);
};
