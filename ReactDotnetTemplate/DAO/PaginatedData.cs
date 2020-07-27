using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactDotnetTemplate.DAO
{
    public class PaginatedData<T> { 
        public int PageIndex { get; private set; }
        public int TotalPages { get; private set; }
        public List<T> Data { get; private set; }

        public PaginatedData(List<T> items, int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            Data = items;
        }

        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 1);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return (PageIndex < TotalPages);
            }
        }

        public static async Task<PaginatedData<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = await source.CountAsync();
            int resultSize = pageSize == -1 ? count : pageSize;
            resultSize = resultSize == 0 ? 1 : resultSize;
            var items = await source.Skip((pageIndex - 1) * pageSize).Take(resultSize).ToListAsync();
            return new PaginatedData<T>(items, count, pageIndex, pageSize == -1 ? count : pageSize);
        }
    }
}
