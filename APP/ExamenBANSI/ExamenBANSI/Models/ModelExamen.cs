using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExamenBANSI.Models
{
    public class ModelExamen
    {
        public class ExamenModel
        {
            public int fi_idExamen { get; set; }
            public string fc_Nombre { get; set; }
            public string fc_Descripcion { get; set; }
            public bool? fb_Estatus { get; set; }
        }

        public class ListExamen
        {
            public List<ExamenModel> listExamen { get; set; }
        }

    }
}