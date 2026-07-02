using Microsoft.AspNetCore.Mvc;
using PoliceRegistrationSystem.Data;
using PoliceRegistrationSystem.Model;

namespace PoliceRegistrationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationsController : ControllerBase
    {
        private readonly RegistrationData _data;

        public RegistrationsController()
        {
            _data = new RegistrationData();
        }

        // GET ALL
        [HttpGet]
        public IActionResult GetRegistrations()
        {
            return Ok(_data.GetRegistrations());
        }

        // GET BY ID
        [HttpGet("{id}")]
        public IActionResult GetRegistrationById(int id)
        {
            if (id <= 0)
                return BadRequest("ID cannot be zero or negative.");

            var registration = _data.GetRegistrationById(id);

            if (registration == null)
                return NotFound("Registration not found.");

            return Ok(registration);
        }

        // INSERT
        [HttpPost]
        public IActionResult InsertRegistration(Registrations registration)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _data.InsertRegistration(registration);

            return Ok("Registration successfully added.");
        }

        // UPDATE
        [HttpPut]
        public IActionResult UpdateRegistration(Registrations registration)
        {
            if (registration.RegistrationID <= 0)
                return BadRequest("ID cannot be zero or negative.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = _data.GetRegistrationById(registration.RegistrationID);

            if (existing == null)
                return NotFound("Registration not found.");

            return Ok(_data.UpdateRegistration(registration));
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult DeleteRegistration(int id)
        {
            if (id <= 0)
                return BadRequest("ID cannot be zero or negative.");

            var existing = _data.GetRegistrationById(id);

            if (existing == null)
                return NotFound("Registration not found.");

            return Ok(_data.DeleteRegistration(id));
        }
    }
}