using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using OrderApi.Dto;
using OrderApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace OrderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/Order
        [HttpGet]
        [Authorize]
        public IActionResult GetOrders()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var role = claimsIdentity.FindFirst(ClaimTypes.Role)?.Value;
            var email = GetUserEmail();
            var orders = _orderService.GetOrders();
            switch (role)
            {
                case "User":
                    orders = orders.FindAll(i => i.Customer.ToLower() == email.ToLower());
                    break;
                case "Deliverer":
                    orders = orders.FindAll(i => i.Deliverer == email.ToLower());
                    break;
                case "Admin":
                    break;
                default:
                    orders = new List<OrderDto>();
                    break;
            }
            return Ok(orders);
        }
        // GET: api/Order
        [HttpGet("/waiting")]
        [Authorize(Roles = "Deliverer")]
        public IActionResult GetPendingOrders()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var role = claimsIdentity.FindFirst(ClaimTypes.Role)?.Value;
            var email = GetUserEmail();
            var orders = _orderService.GetOrders();
            switch (role)
            {
                case "User":
                    orders = orders.FindAll(i => i.Customer.ToLower() == email.ToLower());
                    break;
                case "Deliverer":
                    orders = orders.FindAll(i => i.Deliverer.ToLower() == email.ToLower());
                    break;
                case "Admin":
                    break;
                default:
                    orders = new List<OrderDto>();
                    break;
            }
            return Ok(orders);
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetOrder(int id)
        {
            return Ok(_orderService.GetOrder(id));
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Deliverer")]
        public IActionResult TakeDelivery(int id)
        {
            var email = GetUserEmail();
            try
            {
                return Ok(_orderService.DeliverOrder(id, email));
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> PostOrder(CreateOrderDto createOrderDto)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var username = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var _bearer_token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            try
            {
                return Ok(await _orderService.AddOrder(username, createOrderDto, _bearer_token));
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
