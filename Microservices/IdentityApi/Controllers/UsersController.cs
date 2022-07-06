using EmailService;
using EmailService.Interfaces;
using IdentityApi.Dto;
using IdentityApi.Interfaces;
using IdentityApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace IdentityApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IEmailSender _emailService;

        public UsersController(IUserService userService, IEmailSender emailSender)
        {
            _userService = userService;
            _emailService = emailSender;
        }

        [HttpGet]
        public ActionResult GetUser()
        {
            var userEmail = GetUserEmail();
            try
            {
                return Ok(_userService.GetUserByEmail(userEmail));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("login")]
        public ActionResult Login(LoginDto dto)
        {
            var retVal = _userService.LoginUser(dto);
            if (retVal == null) return BadRequest();
            return Ok(retVal);
        }

        [HttpPost]
        public ActionResult AddUser([FromBody] RegisterDto dto)
        {
            try
            {
                
                _userService.AddUser(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
        [HttpPut]
        [Authorize]
        public ActionResult UpdateUser([FromBody] UpdateUserDto dto)
        {
            var userEmail = GetUserEmail();
            try
            {
                _userService.UpdateUser(userEmail, dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpGet("deliverers")]
        [Authorize(Roles = "Admin")]
        public ActionResult GetDeliverers()
        {
            return Ok(_userService.GetDeliverers());
        }

        [HttpPost("deliverers")]
        [Authorize(Roles = "User")]
        public ActionResult ApplyForDeliverer()
        {
            var userEmail = GetUserEmail();
            try
            {
                _userService.UpdatePendingStatus(userEmail, ERequestStatus.WAITING_FOR_RESPONSE);
                // send email
                try
                {
                    var message = new Message(userEmail, "You apply is register", "Your apply for becoming deliverer is registred. It will be responded in shortest time.");
                    _emailService.SendEmail(message);
                }catch(Exception ex) { }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
        [HttpPut("deliverers")]
        [Authorize(Roles = "Admin")]
        public ActionResult UpdateDelivererStatus([FromBody] UpdateStatusDto updateStatusDto)
        {
            try
            {
                _userService.UpdateDelivererStatus(updateStatusDto);
                try
                {
                    if (updateStatusDto.Approved)
                    {

                        var message = new Message(updateStatusDto.Deliverer, "Delivery application update", "Wellcome to delivery community.");
                        _emailService.SendEmail(message);
                    }
                    else
                    {
                        var message = new Message(updateStatusDto.Deliverer, "Delivery application update", "We are sorry but your delivery apply is denied:/");
                        _emailService.SendEmail(message);
                    }
                }catch(Exception ex) { }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        
        [NonAction]
        private string GetUserEmail()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            return claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
        }
    }
}
