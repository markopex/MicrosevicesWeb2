using ProductApi.Dto;
using ProductApi.Models;
using System.Collections.Generic;

namespace ProductApi.Interfaces
{
    public interface IProductService
    {
        Product GetProduct(int id);
        Product AddProduct(ProductDto productDto);
        List<Product> GetProducts(); 

    }
}
