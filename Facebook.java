import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/process")
public class Facebook extends HttpServlet {
    private static String URL;
    private static String USER;
    private static String PASSWORD;

    static {
        try (FileInputStream fis = new FileInputStream("config.properties")) {
            Properties properties = new Properties();
            properties.load(fis);
            URL = properties.getProperty("db.url");
            USER = properties.getProperty("db.user");
            PASSWORD = properties.getProperty("db.password");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("❌ فشل تحميل إعدادات قاعدة البيانات.");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String pass = request.getParameter("password");

        if (username == null || username.trim().isEmpty() || pass == null || pass.trim().isEmpty()) {
            response.getWriter().println("❌ يجب ملء جميع الحقول!");
            return;
        }

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
            String checkUserSQL = "SELECT COUNT(*) FROM users WHERE username = ?";
            try (PreparedStatement checkStmt = conn.prepareStatement(checkUserSQL)) {
                checkStmt.setString(1, username);
                ResultSet rs = checkStmt.executeQuery();
                if (rs.next() && rs.getInt(1) > 0) {
                    response.getWriter().println("❌ اسم المستخدم موجود بالفعل!");
                    return;
                }
            }

            String insertSQL = "INSERT INTO users (username, password) VALUES (?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(insertSQL)) {
                stmt.setString(1, username);
                stmt.setString(2, pass);
                int rowsInserted = stmt.executeUpdate();
                if (rowsInserted > 0) {
                    response.getWriter().println("✅ تم تسجيل المستخدم بنجاح!");
                } else {
                    response.getWriter().println("❌ حدث خطأ أثناء التسجيل.");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println("❌ خطأ في قاعدة البيانات: " + e.getMessage());
        }
    }
}
