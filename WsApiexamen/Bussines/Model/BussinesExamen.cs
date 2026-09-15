using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static Model.Entity.ModelExamen;
namespace Bussines.Model
{
    public class BussinesExamen
    {

        public static List<ExamenModel> listaExamen()
        {
            List<ExamenModel> lst = new List<ExamenModel>();
            using (DataBase.Model.DbiExamenEntities1 db = new DataBase.Model.DbiExamenEntities1())
            {
                lst = (from d in db.tbl_Examen
                       select new ExamenModel
                       {
                           fi_idExamen = d.fi_idExamen,
                           fc_Nombre = d.fc_Nombre,
                           fc_Descripcion = d.fc_Descripcion,
                           fb_Estatus = d.fb_Estatus
                       }).ToList();
            }
            return lst;
        }

        public static async Task<string> agregaExamenAsync(ExamenModel model)
        {
            string retVal = string.Empty;
            try
            {
                using (DataBase.Model.DbiExamenEntities1 db = new DataBase.Model.DbiExamenEntities1())
                {
                    var examen = new DataBase.Model.tbl_Examen();

                    examen.fc_Nombre = model.fc_Nombre;
                    examen.fc_Descripcion = model.fc_Descripcion;
                    examen.fb_Estatus = 1;
                    examen.fd_falta = DateTime.Now;

                    db.tbl_Examen.Add(examen);
                    await db.SaveChangesAsync();

                    retVal = "El Registro se guardo con Exito";
                }
            }
            catch (Exception ex)
            {
                retVal = ex.ToString();
            }
            return retVal;

        }
        
        public static async Task<string> actualizaExamenAsync(ExamenModel model)
        {
            string retVal = string.Empty;

            try
            {
                using (DataBase.Model.DbiExamenEntities1 db = new DataBase.Model.DbiExamenEntities1())
                {
                    var examen = db.tbl_Examen
                                   .FirstOrDefault(x => x.fi_idExamen == model.fi_idExamen);

                    if (examen == null)
                    {
                        retVal = "El examen no existe";
                        return retVal;
                    }

                    examen.fc_Nombre = model.fc_Nombre;
                    examen.fc_Descripcion = model.fc_Descripcion;
                    examen.fd_fechaModificacion = DateTime.Now;

                    await db.SaveChangesAsync();

                    retVal = "El Registro se actualizó con Éxito";
                }
            }
            catch (Exception ex)
            {
                retVal = ex.ToString();
            }

            return retVal;
        }

        public static async Task<string> eliminarExamenAsync(int id)
        {
            string retVal = string.Empty;

            try
            {
                using (DataBase.Model.DbiExamenEntities1 db = new DataBase.Model.DbiExamenEntities1())
                {
                    var examen = db.tbl_Examen
                                   .FirstOrDefault(x => x.fi_idExamen == id);

                    if (examen == null)
                    {
                        retVal = "El examen no existe";
                        return retVal;
                    }

                    examen.fb_Estatus = 0;
                    await db.SaveChangesAsync();

                    retVal = "El Registro se cancelo con Éxito";
                }
            }
            catch (Exception ex)
            {
                retVal = ex.ToString();
            }

            return retVal;
        }

        public static ExamenModel consultaExamen(int id)
        {
            ExamenModel datamodel = new ExamenModel();

            try
            {
                using (DataBase.Model.DbiExamenEntities1 db = new DataBase.Model.DbiExamenEntities1())
                {
                    var examen = db.tbl_Examen
                                   .FirstOrDefault(x => x.fi_idExamen == id);

                    if (examen == null)
                    {

                    }
                    datamodel.fi_idExamen = examen.fi_idExamen;
                    datamodel.fc_Nombre = examen.fc_Nombre;
                    datamodel.fc_Descripcion = examen.fc_Descripcion;
                    datamodel.fb_Estatus = examen.fb_Estatus;

                }
            }
            catch (Exception ex)
            {

            }

            return datamodel;
        }
    }
}