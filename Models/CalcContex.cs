using Microsoft.EntityFrameworkCore;

namespace Calculator.Models
{
    public class CalcContex : DbContext
    {
        public DbSet<Operation> operations { get; set; }
  
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            
            => options.UseSqlite("Data Source=calculate.db");
        
    }
}
