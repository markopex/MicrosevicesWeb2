using BasketApi.Dto;
using BasketApi.Interfaces;
using BasketApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace BasketApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketService _basketService;

        public BasketController(IBasketService basketService)
        {
            _basketService = basketService;
        }

        [HttpGet]
        [Authorize]
        public ActionResult GetBasket()
        {
            var email = GetUserEmail();
            try
            {
                return Ok(_basketService.GetBasket(email));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public ActionResult UpdateBasket(BasketDto dto)
        {
            var email = GetUserEmail();
            try
            {
                return Ok(_basketService.SetBasket(email, dto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize]
        public ActionResult AddBasketItem(BasketItem item)
        {
            var email = GetUserEmail();
            try
            {
                return Ok(_basketService.AddItemToBasket(email, item));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("checkout")]
        [Authorize]
        public ActionResult Checkout(CheckoutDto dto)
        {
            var email = GetUserEmail();
            try
            {
                var basket = _basketService.GetBasket(email);
                
                // send message to order api
                
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [NonAction]
        private string GetUserEmail()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            return claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
        }
    }
}
