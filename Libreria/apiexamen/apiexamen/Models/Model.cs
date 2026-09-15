using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apiexamen
{
    public class ExamenModel
    {
        public int fi_idExamen { get; set; }
        public string fc_Nombre { get; set; }
        public string fc_Descripcion { get; set; }
        public int fb_Estatus { get; set; }
    }

    public class ListExamen
    {
        public List<ExamenModel> listExamen { get; set; }
    }
}
