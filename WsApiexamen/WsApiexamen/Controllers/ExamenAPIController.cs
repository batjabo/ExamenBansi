using Bussines.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using static Model.Entity.ModelExamen;

namespace WsApiexamen.Controllers
{
    public class ExamenAPIController : ApiController
    {
        [HttpGet]
        [Route("api/listaExamen")]
        public List<ExamenModel> listaExamen()
        {
            List<ExamenModel> listExamen = BussinesExamen.listaExamen();

            return listExamen;
        }


        [HttpPost]
        [Route("api/AgregarExamen")]
        public async Task<string> AgregarExamen(ExamenModel model)
        {
            string retVal = await BussinesExamen.agregaExamenAsync(model);

            return retVal;

        }

        [HttpGet]
        [Route("api/ConsultarExamen/{id:int}")]
        public ExamenModel ConsultarExamen(int id)
        {
            ExamenModel retVal = BussinesExamen.consultaExamen(id);
            return retVal;

        }
        [HttpPut]
        [Route("api/ActualizarExamen")]
        public async Task<string> ActualizarExamen(ExamenModel model)
        {
            string retVal = await BussinesExamen.actualizaExamenAsync(model);

            return retVal;

        }
        [HttpPut]
        [Route("api/EliminarExamen/{id:int}")]
        public async Task<string> EliminarExamen(int id)
        {
            string retVal = await BussinesExamen.eliminarExamenAsync(id);

            return retVal;

        }
    }
}
