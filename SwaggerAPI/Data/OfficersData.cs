using Microsoft.Data.SqlClient;
using PoliceRegistrationSystem.Model;
using System.Data;

namespace PoliceRegistrationSystem.Data
{
    public class OfficerData
    {
        string connection =
        @"Data Source=DESKTOP-OP4I91B;
        Initial Catalog=PoliceRegistrationSystem;
        Integrated Security=True;
        TrustServerCertificate=True";

        // GET ALL OFFICERS
        public List<Officers> GetOfficers()
        {
            List<Officers> officers = new List<Officers>();

            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = "SELECT * FROM Officers";

                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                foreach (DataRow item in dt.Rows)
                {
                    officers.Add(new Officers
                    {
                        OfficerID = Convert.ToInt32(item["OfficerID"]),
                        FullName = item["FullName"].ToString(),
                        RankName = item["RankName"].ToString(),
                        Phone = item["Phone"].ToString()
                    });
                }
            }

            return officers;
        }

        // GET OFFICER BY ID
        public Officers GetOfficerById(int id)
        {
            Officers officer = null;

            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = "SELECT * FROM Officers WHERE OfficerID=@OfficerID";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@OfficerID", id);

                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    officer = new Officers
                    {
                        OfficerID = Convert.ToInt32(reader["OfficerID"]),
                        FullName = reader["FullName"].ToString(),
                        RankName = reader["RankName"].ToString(),
                        Phone = reader["Phone"].ToString()
                    };
                }

                conn.Close();
            }

            return officer;
        }

        // INSERT OFFICER
        public void InsertOfficer(Officers officer)
        {
            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = @"INSERT INTO Officers
                                (FullName, RankName, Phone)
                                VALUES
                                (@FullName, @RankName, @Phone)";

                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@FullName", officer.FullName);
                cmd.Parameters.AddWithValue("@RankName", officer.RankName);
                cmd.Parameters.AddWithValue("@Phone", officer.Phone);

                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        // UPDATE OFFICER
        public string UpdateOfficer(Officers officer)
        {
            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = @"UPDATE Officers
                                 SET FullName=@FullName,
                                     RankName=@RankName,
                                     Phone=@Phone
                                 WHERE OfficerID=@OfficerID";

                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@OfficerID", officer.OfficerID);
                cmd.Parameters.AddWithValue("@FullName", officer.FullName);
                cmd.Parameters.AddWithValue("@RankName", officer.RankName);
                cmd.Parameters.AddWithValue("@Phone", officer.Phone);

                conn.Open();

                int rows = cmd.ExecuteNonQuery();

                conn.Close();

                if (rows > 0)
                {
                    return "Officer updated successfully.";
                }

                return "Officer not found.";
            }
        }

        // DELETE OFFICER
        public string DeleteOfficer(int id)
        {
            using (SqlConnection conn = new SqlConnection(connection))
            {
                string query = "DELETE FROM Officers WHERE OfficerID=@OfficerID";

                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@OfficerID", id);

                conn.Open();

                int rows = cmd.ExecuteNonQuery();

                conn.Close();

                if (rows > 0)
                {
                    return "Officer deleted successfully.";
                }

                return "Officer not found.";
            }
        }
    }
}