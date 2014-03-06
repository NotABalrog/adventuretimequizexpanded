using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrossCuttingConcerns
{
    public class QuizModel
    {
        public QuizModel()
        {
            Id = String.Empty;
            Name = String.Empty;
            Correct = String.Empty;
            Incorrect = String.Empty;
        

            AllScores = new List<QuizModel>();
        }

        public List<QuizModel> AllScores { get; set; } 

        public string Id { get; set; }
        public string Name { get; set; }
        public string Correct{ get; set; }
        public string Incorrect { get; set; }
        
    }
}
