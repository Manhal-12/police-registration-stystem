using Microsoft.Data.SqlClient;
using PoliceRegistrationSystem.Model;
using System.Data;

namespace PoliceRegistrationSystem.Data
{
    public class RegistrationData
    {
        string connection =
        @"Data Source=DESKTOP-OP4I91B;
        Initial Catalog=PoliceRegistrationSystem;
        Integrated Security=True;
        TrustServerCertificate=True";

        // GET ALL REGISTRATIONS
        public List<Registrations> GetRegistrations()
        {
            List<Registrations> registrations = new List<Registrations>();

            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = @"
                SELECT
                    R.RegistrationID,
                    R.RegistrationDate,
                    R.CitizenID,
                    R.OfficerID,
                    C.FullName AS CitizenName,
                    O.FullName AS OfficerName
                FROM Registrations R
                INNER JOIN Citizens C
                    ON R.CitizenID = C.CitizenID
                INNER JOIN Officers O
                    ON R.OfficerID = O.OfficerID
                ORDER BY R.RegistrationID DESC";

                SqlDataAdapter da = new SqlDataAdapter(query, conn);

                DataTable dt = new DataTable();

                da.Fill(dt);

                foreach (DataRow item in dt.Rows)
                {
                    registrations.Add(new Registrations
                    {
                        RegistrationID = Convert.ToInt32(item["RegistrationID"]),
                        RegistrationDate = Convert.ToDateTime(item["RegistrationDate"]),
                        CitizenID = Convert.ToInt32(item["CitizenID"]),
                        OfficerID = Convert.ToInt32(item["OfficerID"]),
                        CitizenName = item["CitizenName"].ToString(),
                        OfficerName = item["OfficerName"].ToString()
                    });
                }
            }

            return registrations;
        }

        // GET REGISTRATION BY ID
        public Registrations GetRegistrationById(int id)
        {
            Registrations registration = null;

            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = @"
                SELECT
                    R.RegistrationID,
                    R.RegistrationDate,
                    R.CitizenID,
                    R.OfficerID,
                    C.FullName AS CitizenName,
                    O.FullName AS OfficerName
                FROM Registrations R
                INNER JOIN Citizens C
                    ON R.CitizenID = C.CitizenID
                INNER JOIN Officers O
                    ON R.OfficerID = O.OfficerID
                WHERE R.RegistrationID = @RegistrationID";

                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@RegistrationID", id);

                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    registration = new Registrations
                    {
                        RegistrationID = Convert.ToInt32(reader["RegistrationID"]),
                        RegistrationDate = Convert.ToDateTime(reader["RegistrationDate"]),
                        CitizenID = Convert.ToInt32(reader["CitizenID"]),
                        OfficerID = Convert.ToInt32(reader["OfficerID"]),
                        CitizenName = reader["CitizenName"].ToString(),
                        OfficerName = reader["OfficerName"].ToString()
                    };
                }

                conn.Close();
            }

            return registration;
        }

        // INSERT REGISTRATION
        public void InsertRegistration(Registrations registration)
        {
            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = @"
                INSERT INTO Registrations
                (
                    RegistrationDate,
                    CitizenID,
                    OfficerID
                )
                VALUES
                (
                    @RegistrationDate,
                    @CitizenID,
                    @OfficerID
                )";

                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@RegistrationDate", registration.RegistrationDate);
                cmd.Parameters.AddWithValue("@CitizenID", registration.CitizenID);
                cmd.Parameters.AddWithValue("@OfficerID", registration.OfficerID);

                conn.Open();

                cmd.ExecuteNonQuery();

                conn.Close();
            }
        }

        // UPDATE REGISTRATION
        public string UpdateRegistration(Registrations registration)
        {
            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = @"
                UPDATE Registrations
                SET
                    RegistrationDate = @RegistrationDate,
                    CitizenID = @CitizenID,
                    OfficerID = @OfficerID
                WHERE RegistrationID = @RegistrationID";

                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@RegistrationID", registration.RegistrationID);
                cmd.Parameters.AddWithValue("@RegistrationDate", registration.RegistrationDate);
                cmd.Parameters.AddWithValue("@CitizenID", registration.CitizenID);
                cmd.Parameters.AddWithValue("@OfficerID", registration.OfficerID);

                conn.Open();

                int rows = cmd.ExecuteNonQuery();

                conn.Close();

                if (rows == 0)
                {
                    return "Registration ID not found";
                }

                return "Registration updated successfully";
            }
        }

        // DELETE REGISTRATION
        public string DeleteRegistration(int id)
        {
            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = "DELETE FROM Registrations WHERE RegistrationID=@RegistrationID";

                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@RegistrationID", id);

                conn.Open();

                int rows = cmd.ExecuteNonQuery();

                conn.Close();

                if (rows == 0)
                {
                    return "Registration ID not found";
                }

                return "Registration deleted successfully";
            }
        }
    }
}