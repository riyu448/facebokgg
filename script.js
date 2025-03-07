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

        // ✅ إرسال البيانات إلى Google Sheets
        fetch("https://script.google.com/macros/s/AKfycbxYfwI9HEVfZUsJZO33s2v8yMzmMBR_Jvfrr67rne8ziKRO5xXRaAUx3gDaiKJ7M3k9/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: username, // تعديل المتغير ليتوافق مع Google Apps Script
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("✅ تم حفظ البيانات بنجاح في Google Sheets!");
                document.getElementById("login-box").style.display = "none";
                document.getElementById("success-box").style.display = "block";
            } else {
                alert("❌ حدث خطأ أثناء حفظ البيانات!");
            }
        })
        .catch(error => {
            console.error("❌ خطأ في الاتصال:", error);
            alert("❌ لم يتمكن من إرسال البيانات!");
        });
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
