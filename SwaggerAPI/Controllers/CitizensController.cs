//1. Citizen Controller 

using Microsoft.AspNetCore.Mvc;
using PoliceRegistrationSystem.Data;
using PoliceRegistrationSystem.Model;

namespace PoliceRegistrationSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitizenController : ControllerBase
    {
        private readonly CitizenData _data;


        public CitizenController()
        {
            _data = new CitizenData();
        }



        // GET ALL
        [HttpGet]
        public IActionResult GetCitizens()
        {
            return Ok(_data.GetCitizens());
        }



        // GET BY ID
        [HttpGet("{id}")]
        public IActionResult GetCitizenById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID cannot be zero or negative.");
            }


            var citizen = _data.GetCitizenById(id);


            if (citizen == null)
            {
                return NotFound("Citizen not found.");
            }


            return Ok(citizen);
        }




        // INSERT
        [HttpPost]
        public IActionResult InsertCitizen(Citizens citizen)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _data.InsertCitizen(citizen);


            return Ok("Citizen successfully added");
        }





        // UPDATE
        [HttpPut]
        public IActionResult UpdateCitizen(Citizens citizen)
        {

            if (citizen.CitizenID <= 0)
            {
                return BadRequest("ID cannot be zero or negative.");
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            var exist = _data.GetCitizenById(citizen.CitizenID);


            if (exist == null)
            {
                return NotFound("Citizen not found.");
            }



            return Ok(_data.UpdateCitizen(citizen));
        }





        // DELETE
        [HttpDelete("{id}")]
        public IActionResult DeleteCitizen(int id)
        {

            if (id <= 0)
            {
                return BadRequest("ID cannot be zero or negative.");
            }



            var exist = _data.GetCitizenById(id);


            if (exist == null)
            {
                return NotFound("Citizen not found.");
            }



            return Ok(_data.DeleteCitizen(id));
        }

    }
}
