using System.Collections.Generic;
using System.Threading.Tasks;
using Calculator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Calculator.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MathController : ControllerBase
    {
        CalcContex db;
       readonly ILogger<MathController> _log;
       private readonly Calculation _calculation;

        public MathController(CalcContex context, ILogger<MathController> log, Calculation calculation)
        {
      
            db = context;
            _log = log;
            _calculation = calculation;

        }


 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Operation>>> Get()
        {

            return await db.operations.ToListAsync();
            
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<Operation>> Get(int id)
        {
            Operation operation = await db.operations.FirstOrDefaultAsync(x => x.Id == id);
            if (operation == null)
                return NotFound();
            return new ObjectResult(operation);
        }


        [HttpPost]
        public async Task<ActionResult<Operation>> Post(Operation operation)
        {
            if (operation == null)
            {
                return BadRequest();
            }
            string expression = operation.Expression;
           
            operation.Result = _calculation.Calculate(expression);
            db.Add(operation);
            await db.SaveChangesAsync();
            return Ok(operation);
        }


       
        [HttpDelete("{id}")]
        public async Task<ActionResult<Operation>> Delete(int id)
        {
            Operation operation = await db.operations.FirstOrDefaultAsync(x => x.Id == id);
            if (operation == null)
            {
                return NotFound();
            }
            db.operations.Remove(operation);
            await db.SaveChangesAsync();
            return Ok(operation);
        }
    }
}