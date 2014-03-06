using CrossCuttingConcerns;
using DataObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace AdventureTimeQuizExpanded.Controllers
{
    public class HomeController : Controller
    {
     
        public ActionResult Index()
        {
            return View();
        }

        public bool Insert(QuizModel model) {

            QuizDao quizDao = new QuizDao();

            quizDao.Insert(model);

            return true;
        }

    
        public JsonResult getScores() { 

            QuizDao quizDao = new QuizDao();

           QuizModel scores = new QuizModel();
            
            scores = quizDao.getScores();

            return Json(scores);
        }
    }
}
