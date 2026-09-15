using DataBase.DataBase;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace apiexamen.DataBase
{
    public class DataAcces
    {
        public static List<ExamenModel> listExamen(int fi_idExamen,string conn)
        {
            List<ExamenModel> lstReg = new List<ExamenModel>();
            using (DataAccessSqlServer dao = new DataAccessSqlServer(conn))
            {
                using (DataSet dsExamen = dao.ExecuteDataSet("SP_CONSULTA_EXAMEN", new List<SqlParameter>
                {
                    new SqlParameter(){ ParameterName = "@fi_idExamen", Value = fi_idExamen }
                }))
                {
                    if (dsExamen != null && dsExamen.Tables[0] != null && dsExamen.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow dr in dsExamen.Tables[0].Rows)
                        {
                            var model = new ExamenModel
                            {
                                fi_idExamen = dr["fi_idExamen"] != DBNull.Value ? dr.Field<int>("fi_idExamen") : 0,
                                fc_Nombre = dr["fc_Nombre"] != DBNull.Value ? dr.Field<string>("fc_Nombre") : string.Empty,
                                fc_Descripcion = dr["fc_Descripcion"] != DBNull.Value ? dr.Field<string>("fc_Descripcion") : string.Empty,
                                fb_Estatus = dr["fb_Estatus"] != DBNull.Value ? dr.Field<int>("fi_idExamen") : 0
                            };
                            lstReg.Add(model);
                        }
                    }
                }
            }
            return lstReg;
        }


        public static string AgregaExamen(ExamenModel model, string conn)
        {
            string retResult = string.Empty;
            try
            {
                using (DataAccessSqlServer dao = new DataAccessSqlServer(conn))
                {
                    using (DataSet dresult = dao.ExecuteDataSet("SP_ALTA_EXAMEN", new List<SqlParameter>
                {
                   new SqlParameter(){ParameterName ="@fc_Nombre",Value = model.fc_Nombre },
                   new SqlParameter(){ParameterName ="@fc_descripcion " , Value = model.fc_Descripcion },
                }))
                    {
                        if (dresult != null && dresult.Tables[0] != null && dresult.Tables[0].Rows.Count > 0)
                        {
                            foreach (DataRow dr in dresult.Tables[0].Rows)
                            {
                                retResult = dr["retCodigo"] != DBNull.Value ? dr.Field<string>("retCodigo") : "0";
                                retResult = retResult.ToString() + (dr["retVal"] != DBNull.Value ? dr.Field<string>("retVal") : string.Empty).ToString();
                            }
                        }
                    }
                }
            
            }
            catch(Exception ex) { 
                retResult= ex.InnerException.ToString();
            }

            return retResult;
        }

        public static string actualizaExamen(ExamenModel model,string conn)
        {
            string retResult = string.Empty;
            try
            {
                using (DataAccessSqlServer dao = new DataAccessSqlServer(conn))
                {
                    using (DataSet dresult = dao.ExecuteDataSet("SP_ACTUALIZA_EXAMEN", new List<SqlParameter>
                {
                    new SqlParameter(){ ParameterName = "@fi_idExamen", Value = model.fi_idExamen },
                    new SqlParameter(){ ParameterName = "@fc_Nombre", Value = model.fc_Nombre },
                    new SqlParameter(){ ParameterName = "@fc_descripcion", Value = model.fc_Descripcion}
                }))
                    {
                        if (dresult != null && dresult.Tables[0] != null && dresult.Tables[0].Rows.Count > 0)
                        {
                            foreach (DataRow dr in dresult.Tables[0].Rows)
                            {
                                retResult = dr["retCodigo"] != DBNull.Value ? dr.Field<string>("retCodigo") : "0";
                                retResult = retResult.ToString() + (dr["retVal"] != DBNull.Value ? dr.Field<string>("retVal") : string.Empty).ToString();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                retResult = ex.InnerException.ToString();
            }

            
            return retResult;
        }
        public static string cancelaExamen(int fi_idExamen, string conn)
        {
            string retResult = string.Empty;
            try
            {
                using (DataAccessSqlServer dao = new DataAccessSqlServer(conn))
                {
                    using (DataSet dresult = dao.ExecuteDataSet("SP_ELIMINA_EXAMEN", new List<SqlParameter>
                {
                    new SqlParameter(){ ParameterName = "@fi_idExamen", Value = fi_idExamen },
                }))
                    {
                        if (dresult != null && dresult.Tables[0] != null && dresult.Tables[0].Rows.Count > 0)
                        {
                            foreach (DataRow dr in dresult.Tables[0].Rows)
                            {
                                retResult = dr["retCodigo"] != DBNull.Value ? dr.Field<string>("retCodigo") : "0";
                                retResult = retResult + (dr["retVal"] != DBNull.Value ? dr.Field<string>("retVal") : string.Empty).ToString();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                retResult = ex.InnerException.ToString();
            }
            
            return retResult;
        }

    }
}
