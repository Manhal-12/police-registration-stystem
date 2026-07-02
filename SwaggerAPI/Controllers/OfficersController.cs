using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PoliceRegistrationSystem.Data;
using PoliceRegistrationSystem.Model;

namespace PoliceRegistrationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficersController : ControllerBase
    {
        private readonly OfficerData _data;

        public OfficersController()
        {
            _data = new OfficerData();
        }

        // GET ALL OFFICERS
        [HttpGet]
        public IActionResult GetOfficers()
        {
            var officers = _data.GetOfficers();
            return Ok(officers);
        }

        // GET OFFICER BY ID
        [HttpGet("{id}")]
        public IActionResult GetOfficerById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID cannot be zero or negative.");
            }

            var officer = _data.GetOfficerById(id);

            if (officer == null)
            {
                return NotFound("Officer not found.");
            }

            return Ok(officer);
        }

        // INSERT OFFICER
        [HttpPost]
        public IActionResult InsertOfficer(Officers officer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _data.InsertOfficer(officer);

            return Ok("Officer successfully added.");
        }

        // UPDATE OFFICER
        [HttpPut]
        public IActionResult UpdateOfficer(Officers officer)
        {
            if (officer.OfficerID <= 0)
            {
                return BadRequest("ID cannot be zero or negative.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingOfficer = _data.GetOfficerById(officer.OfficerID);

            if (existingOfficer == null)
            {
                return NotFound("Officer not found.");
            }

            string result = _data.UpdateOfficer(officer);

            return Ok(result);
        }

        // DELETE OFFICER
        [HttpDelete("{id}")]
        public IActionResult DeleteOfficer(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID cannot be zero or negative.");
            }

            var existingOfficer = _data.GetOfficerById(id);

            if (existingOfficer == null)
            {
                return NotFound("Officer not found.");
            }

            string result = _data.DeleteOfficer(id);

            return Ok(result);
        }
    }
}