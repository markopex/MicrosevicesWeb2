using AutoMapper;
using ProductApi.Dto;
using ProductApi.Infrastructure;
using ProductApi.Interfaces;
using ProductApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProductApi.Services
{
    public class ProductService: IProductService
    {
        private readonly IMapper _mapper;
        private readonly ProductsDbContext _dbContext;

        public ProductService(IMapper mapper, ProductsDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public Product AddProduct(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();

            return product;
        }

        public Product GetProduct(int id)
        {
            return _dbContext.Products.Find(id);
        }

        public List<Product> GetProducts()
        {
            return _dbContext.Products.ToList();
        }
    }
}
