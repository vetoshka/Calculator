using System;

namespace Calculator
{
    public class Calculation
    {
        public int Calculate(string expression)
        {
            int fBracket = 0;
            int sBracket;
            int result = 0;
            while (expression.Split(" ").Length >= 3 && expression.Length != 0)
            {
                if (expression.Contains("(") && expression.Contains(")"))
                {
                    for (int i = 0; i < expression.Length; i++)
                    {
                        if (expression[i].ToString() == "(")
                        {
                            fBracket = i;
                        }

                        if (expression[i].ToString() == ")")
                        {
                            sBracket = i;
                            expression = DoBracket(expression, fBracket, sBracket);
                            if (expression.Split(" ").Length < 3)
                            {
                                result = Convert.ToInt32(expression);
                            }

                            break;
                        }
                    }
                }
                else
                {


                    result = Subtract(expression);
                    expression = expression.Replace(expression, result.ToString());
                }
            }

            return result;
        }

        public string DoBracket(string expression, int first, int second)
        {
            string text = expression.Substring(first + 1, second - first - 1);


            expression = expression.Replace("(" + text + ")", Subtract(text).ToString());
            return expression;


        }
        private int Subtract(string line)
        {
            string[] text = line.Split("-");
            int total = Add(text[0]);
            for (int i = 1; i < text.Length; i++)
            {
                total = total - Add(text[i]);
            }
            return total;


        }

        private int Add(string line)
        {
            string[] text = line.Split("+");
            int total = Multiply(text[0]);
            for (int i = 1; i < text.Length; i++)
            {
                total = total + Multiply(text[i]);
            }
            return total;
        }

        private int Multiply(string line)
        {
            string[] text = line.Split("*");
            int total = Div(text[0]);
            for (int i = 1; i < text.Length; i++)
            {
                total = total * Div(text[i]);
            }
            return total;
        }

        private int Div(string line)
        {
            string[] text = line.Split("/");
            int total = Convert.ToInt32(text[0]);
            for (int i = 1; i < text.Length; i++)
            {
                total = total / Convert.ToInt32(text[i]);
            }
            return total;
        }
    }
}
