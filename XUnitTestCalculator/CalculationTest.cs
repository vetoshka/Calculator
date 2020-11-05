using System;
using Calculator;
using Xunit;

namespace XUnitTestCalculator
{
    public class CalculationTest
    {
        [Theory]
        [InlineData("(3 + 2) * 3",15)]
        [InlineData("4 * 3", 12)]
        public void TestCalculate(string expression, int expected)
        {
            Calculation calculation = new Calculation();
            int actual = calculation.Calculate(expression);
            Assert.Equal(expected,actual);
        }
    }
}
