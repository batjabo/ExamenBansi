using apiexamen.ClientAPI;
using apiexamen.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace apiexamen
{
    public class clsExamen
    {

        public APIconsume _api ;
        
        /// <summary>
        /// fi_idexamen a consultar en caso de ser 0 trae lista completa
        /// con = cadena de conexion de la base
        /// metodo = metodo que va a usar API/ADO.Net (0 = API / 1 = ADO.Net)
        /// 
        /// </summary>
        /// <param name="fi_idExamen"></param>
        /// <param name="con"></param>
        /// <param name="metodo"></param>
        /// <returns></returns>
        public async Task<List<ExamenModel>> ConsultaExamen(int fi_idExamen,string con,int metodo)
        {
      
            List <ExamenModel> lstResult = new List<ExamenModel> ();
       
            switch (metodo)
            {
                case 0:
                    if(_api ==null)
                    {
                        _api = new APIconsume();
                    }
                    lstResult = await _api.obtenerListaExamen();
                    break;
                case 1:
                    lstResult=  DataAcces.listExamen(fi_idExamen, con);
                    break;
                default:
                    break;
            }

            return lstResult;
        }

        public async Task<string> AgregarExamen(ExamenModel model, string con, int metodo)
        {
            string restval = string.Empty;
            try
            {
                switch (metodo)
                {
                    case 0:
                        if (_api == null)
                        {
                            _api = new APIconsume();
                        }
                        restval = await _api.AgregarExamen(model);
                        break;
                    case 1:
                        restval = DataAcces.AgregaExamen(model, con);
                        break;
                    default:
                        break;
                }
            }
            catch(Exception ex)
            {
                

            }
            

            return restval;
        }


        public async Task<string> ActualizarExamen(ExamenModel model, string con, int metodo)
        {
            string restval = string.Empty;

            switch (metodo)
            {
                case 0:
                    if (_api == null)
                    {
                        _api = new APIconsume();
                    }
                    restval = await _api.ActualizarExamen(model);
                    break;
                case 1:
                    restval = DataAcces.AgregaExamen(model, con);
                    break;
                default:
                    break;
            }

            return restval;
        }

        public async Task<string> EliminaExamen(int fi_idExamen, string con, int metodo)
        {
            string restval = string.Empty;

            switch (metodo)
            {
                case 0:
                    if (_api == null)
                    {
                        _api = new APIconsume();
                    }
                    restval = await _api.EliminarExamen(fi_idExamen);
                    break;
                case 1:
                    restval = DataAcces.cancelaExamen(fi_idExamen, con);
                    break;
                default:
                    break;
            }

            return restval;
        }
    }
}
