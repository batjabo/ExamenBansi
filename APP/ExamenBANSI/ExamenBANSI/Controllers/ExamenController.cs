using ExamenBANSI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ExamenBANSI.Models.ModelExamen;
using apiexamen.ClientAPI;
using apiexamen;
using System.Configuration;
using System.Threading.Tasks;
using System.Reflection;
using System.Data;
using Microsoft.Ajax.Utilities;

namespace ExamenBANSI.Controllers
{
    public class ExamenController : Controller
    {
        apiexamen.clsExamen wsexamen = new apiexamen.clsExamen();
        String conSQL = ConfigurationManager.ConnectionStrings["connSql"].ConnectionString;


        public ActionResult Index()
        {
            return View();

        }
        [HttpPost]
        public ActionResult guardaExamen(apiexamen.ExamenModel model,int metodo )
        {

            var Datos = wsexamen.AgregarExamen(model, conSQL, metodo);
            var Parametros = new object[] { };
            var jsonResult = Json(new { success = true, data = Datos }, "application/json", System.Text.Encoding.UTF8, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
            

        }

        public JsonResult guardaExamenEdit(apiexamen.ExamenModel model, int metodo)
        {

            var Datos = wsexamen.AgregarExamen(model, conSQL, metodo);
            var Parametros = new object[] { };
            var jsonResult = Json(new { success = true, data = Datos }, "application/json", System.Text.Encoding.UTF8, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        public async Task<JsonResult> functionLista(int fi_idExamen, int metodo )
        {
            var Datos = await wsexamen.ConsultaExamen(0, conSQL, metodo);
            var Parametros = new object[] { };
            var jsonResult = Json(new { success = true, data = Datos }, "application/json", System.Text.Encoding.UTF8, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpPost]
        public async Task<JsonResult> EliminaRegistro(int fi_idExamen, int metodo)
        
        {
            var Datos = await wsexamen.EliminaExamen(fi_idExamen, conSQL, metodo);
            var Parametros = new object[] { };
            var jsonResult = Json(new { success = true, data = Datos }, "application/json", System.Text.Encoding.UTF8, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }


    }
}
