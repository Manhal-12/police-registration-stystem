using System.ComponentModel.DataAnnotations;

namespace PoliceRegistrationSystem.Model
{
    public class Registrations
    {
        public int RegistrationID { get; set; }

        public DateTime RegistrationDate { get; set; }

        [Required(ErrorMessage = "Citizen ID is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Citizen ID must be greater than 0")]
        public int CitizenID { get; set; }

        [Required(ErrorMessage = "Officer ID is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Officer ID must be greater than 0")]
        public int OfficerID { get; set; }

        public string? CitizenName { get; set; }

        public string? OfficerName { get; set; }
    }
}