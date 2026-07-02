using Microsoft.AspNetCore.Mvc;
using PoliceRegistrationSystem.Data;
using PoliceRegistrationSystem.Model;

namespace PoliceRegistrationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserData data = new UserData();

        // GET ALL USERS
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(data.GetUsers());
        }

        // GET USER BY ID
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID cannot be zero or negative.");
            }

            var user = data.GetUserById(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        // ADD USER
        [HttpPost]
        public IActionResult AddUser(Users user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            data.AddUser(user);

            return Ok("User Added Successfully.");
        }

        // UPDATE USER
        [HttpPut]
        public IActionResult UpdateUser(Users user)
        {
            if (user.UserID <= 0)
            {
                return BadRequest("ID cannot be zero or negative.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = data.GetUserById(user.UserID);

            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            data.UpdateUser(user);

            return Ok("User Updated Successfully.");
        }

        // DELETE USER
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID cannot be zero or negative.");
            }

            var existingUser = data.GetUserById(id);

            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            data.DeleteUser(id);

            return Ok("User Deleted Successfully.");
        }
    }
}