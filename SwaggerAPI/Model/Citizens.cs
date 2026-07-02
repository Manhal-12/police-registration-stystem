using System.ComponentModel.DataAnnotations;


namespace PoliceRegistrationSystem.Model
{

    public class Citizens
    {

        public int CitizenID { get; set; }



        [Required(ErrorMessage = "Full Name is required")]
        public string FullName { get; set; } = string.Empty;



        [Required(ErrorMessage = "Gender is required")]
        public string Gender { get; set; } = string.Empty;




        [Required(ErrorMessage = "Date Of Birth is required")]
        public DateTime? DateOfBirth { get; set; }




        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; } = string.Empty;




        [Required(ErrorMessage = "Phone is required")]
        [MinLength(9, ErrorMessage = "Phone must be at least 9 digits")]
        public string Phone { get; set; } = string.Empty;


    }

}