using Microsoft.Data.SqlClient;
using PoliceRegistrationSystem.Model;

namespace PoliceRegistrationSystem.Data
{
    public class UserData
    {
        string connection =
        @"Data Source=DESKTOP-OP4I91B;
        Initial Catalog=PoliceRegistrationSystem;
        Integrated Security=True;
        TrustServerCertificate=True";

        // GET ALL USERS
        public List<Users> GetUsers()
        {
            List<Users> users = new List<Users>();

            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM Users", con);

                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Users user = new Users();

                    user.UserID = Convert.ToInt32(reader["UserID"]);
                    user.FullName = reader["FullName"].ToString();
                    user.Username = reader["Username"].ToString();
                    user.Password = reader["Password"].ToString();
                    user.Role = reader["Role"].ToString();

                    users.Add(user);
                }

                con.Close();
            }

            return users;
        }

        // GET USER BY ID
        public Users GetUserById(int id)
        {
            Users user = null;

            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand(
                    "SELECT * FROM Users WHERE UserID=@UserID", con);

                cmd.Parameters.AddWithValue("@UserID", id);

                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    user = new Users();

                    user.UserID = Convert.ToInt32(reader["UserID"]);
                    user.FullName = reader["FullName"].ToString();
                    user.Username = reader["Username"].ToString();
                    user.Password = reader["Password"].ToString();
                    user.Role = reader["Role"].ToString();
                }

                con.Close();
            }

            return user;
        }

        // ADD USER
        public void AddUser(Users user)
        {
            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand(
                    @"INSERT INTO Users
                    (FullName,Username,Password,Role)
                    VALUES
                    (@FullName,@Username,@Password,@Role)", con);

                cmd.Parameters.AddWithValue("@FullName", user.FullName);
                cmd.Parameters.AddWithValue("@Username", user.Username);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                cmd.Parameters.AddWithValue("@Role", user.Role);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }

        // UPDATE USER
        public void UpdateUser(Users user)
        {
            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand(
                    @"UPDATE Users SET
                    FullName=@FullName,
                    Username=@Username,
                    Password=@Password,
                    Role=@Role
                    WHERE UserID=@UserID", con);

                cmd.Parameters.AddWithValue("@UserID", user.UserID);
                cmd.Parameters.AddWithValue("@FullName", user.FullName);
                cmd.Parameters.AddWithValue("@Username", user.Username);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                cmd.Parameters.AddWithValue("@Role", user.Role);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }

        // DELETE USER
        public void DeleteUser(int id)
        {
            using (SqlConnection con = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand(
                    "DELETE FROM Users WHERE UserID=@UserID", con);

                cmd.Parameters.AddWithValue("@UserID", id);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
    }
}