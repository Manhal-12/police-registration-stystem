using System.ComponentModel.DataAnnotations;

namespace PoliceRegistrationSystem.Model
{
    public class Officers
    {
        public int OfficerID { get; set; }

        [Required(ErrorMessage = "Full Name is required")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Rank Name is required")]
        public string RankName { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        [MinLength(9, ErrorMessage = "Phone number must be at least 9 digits.")]
        public string Phone { get; set; }
    }
}