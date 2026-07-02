using Microsoft.Data.SqlClient;
using PoliceRegistrationSystem.Model;
using System.Data;

namespace PoliceRegistrationSystem.Data
{
    public class CitizenData
    {
        string connection =
        @"Data Source=DESKTOP-OP4I91B;
        Initial Catalog=PoliceRegistrationSystem;
        Integrated Security=True;
        TrustServerCertificate=True";



        // GET ALL CITIZENS
        public List<Citizens> GetCitizens()
        {
            List<Citizens> citizens = new List<Citizens>();


            using (SqlConnection conn = new SqlConnection(connection))
            {

                string query = "SELECT * FROM Citizens";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);

                DataTable dt = new DataTable();


                da.Fill(dt);



                foreach (DataRow item in dt.Rows)
                {

                    citizens.Add(new Citizens
                    {

                        CitizenID =
                        Convert.ToInt32(item["CitizenID"]),

                        FullName =
                        item["FullName"].ToString(),

                        Gender =
                        item["Gender"].ToString(),

                        DateOfBirth =
                        Convert.ToDateTime(item["DateOfBirth"]),

                        Address =
                        item["Address"].ToString(),

                        Phone =
                        item["Phone"].ToString()

                    });

                }

            }


            return citizens;

        }





        // GET CITIZEN BY ID
        public Citizens GetCitizenById(int id)
        {

            Citizens citizen = null;


            using (SqlConnection conn = new SqlConnection(connection))
            {

                string query =
                "SELECT * FROM Citizens WHERE CitizenID=@CitizenID";


                SqlCommand cmd = new SqlCommand(query, conn);


                cmd.Parameters.AddWithValue(
                    "@CitizenID",
                    id);



                conn.Open();



                SqlDataReader reader = cmd.ExecuteReader();



                if (reader.Read())
                {

                    citizen = new Citizens
                    {

                        CitizenID =
                        Convert.ToInt32(reader["CitizenID"]),


                        FullName =
                        reader["FullName"].ToString(),


                        Gender =
                        reader["Gender"].ToString(),


                        DateOfBirth =
                        Convert.ToDateTime(reader["DateOfBirth"]),


                        Address =
                        reader["Address"].ToString(),


                        Phone =
                        reader["Phone"].ToString()

                    };

                }


                conn.Close();

            }


            return citizen;

        }







        // INSERT CITIZEN
        public void InsertCitizen(Citizens citizen)
        {

            using (SqlConnection conn = new SqlConnection(connection))
            {


                string query = @"
                INSERT INTO Citizens
                (
                    FullName,
                    Gender,
                    DateOfBirth,
                    Address,
                    Phone
                )

                VALUES
                (
                    @FullName,
                    @Gender,
                    @DateOfBirth,
                    @Address,
                    @Phone
                )";



                SqlCommand cmd = new SqlCommand(query, conn);



                cmd.Parameters.AddWithValue(
                    "@FullName",
                    citizen.FullName);



                cmd.Parameters.AddWithValue(
                    "@Gender",
                    citizen.Gender);



                cmd.Parameters.AddWithValue(
                    "@DateOfBirth",
                    citizen.DateOfBirth);



                cmd.Parameters.AddWithValue(
                    "@Address",
                    citizen.Address);



                cmd.Parameters.AddWithValue(
                    "@Phone",
                    citizen.Phone);



                conn.Open();



                cmd.ExecuteNonQuery();



                conn.Close();

            }

        }







        // UPDATE CITIZEN
        public string UpdateCitizen(Citizens citizen)
        {

            using (SqlConnection conn = new SqlConnection(connection))
            {


                string query = @"
                UPDATE Citizens

                SET

                FullName=@FullName,
                Gender=@Gender,
                DateOfBirth=@DateOfBirth,
                Address=@Address,
                Phone=@Phone

                WHERE CitizenID=@CitizenID";



                SqlCommand cmd = new SqlCommand(query, conn);



                cmd.Parameters.AddWithValue(
                    "@CitizenID",
                    citizen.CitizenID);



                cmd.Parameters.AddWithValue(
                    "@FullName",
                    citizen.FullName);



                cmd.Parameters.AddWithValue(
                    "@Gender",
                    citizen.Gender);



                cmd.Parameters.AddWithValue(
                    "@DateOfBirth",
                    citizen.DateOfBirth);



                cmd.Parameters.AddWithValue(
                    "@Address",
                    citizen.Address);



                cmd.Parameters.AddWithValue(
                    "@Phone",
                    citizen.Phone);




                conn.Open();



                int rows = cmd.ExecuteNonQuery();



                conn.Close();




                if (rows == 0)
                {
                    return "Citizen ID not found";
                }



                return "Citizen updated successfully";


            }

        }


        public Citizens GetCitizenByName(string name)
        {

            Citizens citizen = null;


            using (SqlConnection conn = new SqlConnection(connection))
            {


                string query =
                "SELECT * FROM Citizens WHERE FullName=@name";



                SqlCommand cmd =
                new SqlCommand(query, conn);



                cmd.Parameters.AddWithValue(
                "@name",
                name
                );



                conn.Open();


                SqlDataReader reader =
                cmd.ExecuteReader();



                if (reader.Read())
                {


                    citizen = new Citizens
                    {

                        CitizenID =
                    Convert.ToInt32(reader["CitizenID"]),


                        FullName =
                    reader["FullName"].ToString(),


                        Gender =
                    reader["Gender"].ToString(),


                        DateOfBirth =
                    Convert.ToDateTime(reader["DateOfBirth"]),


                        Address =
                    reader["Address"].ToString(),


                        Phone =
                    reader["Phone"].ToString()

                    };


                }



                conn.Close();


                return citizen;


            }
        }






        // DELETE CITIZEN
        public string DeleteCitizen(int id)
        {

            using (SqlConnection conn = new SqlConnection(connection))
            {


                string query =
                "DELETE FROM Citizens WHERE CitizenID=@CitizenID";



                SqlCommand cmd = new SqlCommand(query, conn);



                cmd.Parameters.AddWithValue(
                    "@CitizenID",
                    id);



                conn.Open();



                int rows = cmd.ExecuteNonQuery();



                conn.Close();




                if (rows == 0)
                {
                    return "Citizen ID not found";
                }



                return "Citizen deleted successfully";


            }

        }

    }
}