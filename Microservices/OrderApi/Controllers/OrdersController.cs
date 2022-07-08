using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using OrderApi.Dto;
using OrderApi.Interfaces;
using System;
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
        public IActionResult GetOrders()
        {
            return Ok(_orderService.GetOrders());
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            return Ok(_orderService.GetOrder(id));
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
    }
}
