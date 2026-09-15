using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DataBase.DataBase
{
    public class DataAccessSqlServer : IDisposable
    {
        private SqlConnection sqlConnection = null;
        private SqlCommand sqlcommand = null;
        private SqlDataReader sqlDataread = null;
        public string MensajePrint { get; set; }


        public DataAccessSqlServer(String connectionName)
        {
            if (sqlConnection == null)
            {
                sqlConnection = new SqlConnection();
                sqlConnection.ConnectionString = connectionName; 
                sqlConnection.Open();

                sqlConnection.InfoMessage += sqlConnection_InfoMessage;
            }
            else
            {
                if (sqlConnection.State.Equals(ConnectionState.Open))
                    sqlConnection.Close();

                sqlConnection.ConnectionString = connectionName; 
                sqlConnection.Open();
            }
        }

        void sqlConnection_InfoMessage(object sender, SqlInfoMessageEventArgs e)
        {
            MensajePrint = e.Message;
        }

        public void Open()
        {
            if (sqlConnection.State.Equals(ConnectionState.Closed))
                sqlConnection.Open();
        }

        public void Close()
        {
            try
            {
                if (!sqlConnection.State.Equals(ConnectionState.Closed))
                    this.sqlConnection.Close();
            }

            catch (Exception ex)
            {
                if (!sqlConnection.State.Equals(ConnectionState.Closed))
                    this.sqlConnection.Dispose();
            }
        }

        public DataSet ExecuteDataSet(string NombreSp, List<SqlParameter> Parametros)
        {
            DataSet ds = new DataSet();
            using (SqlConnection conn = sqlConnection)
            {
                SqlCommand sqlComm = new SqlCommand(NombreSp, conn);

                if (Parametros != null && Parametros.Count > 0)
                {
                    sqlComm.Parameters.AddRange(Parametros.ToArray());
                }

                sqlComm.CommandType = CommandType.StoredProcedure;
                sqlComm.CommandTimeout = 3600;

                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = sqlComm;

                da.Fill(ds);
            }
            this.Close();
            return ds;
        }

        public SqlDataReader ExecuteDataRead(string NombreSp, List<SqlParameter> Parametros)
        {
            sqlcommand = new SqlCommand();
            sqlcommand.Connection = this.sqlConnection;
            sqlcommand.CommandTimeout = 3600;
            sqlcommand.CommandText = NombreSp;
            if (Parametros != null && Parametros.Count > 0)
            {
                sqlcommand.Parameters.AddRange(Parametros.ToArray());
            }
            sqlcommand.CommandType = System.Data.CommandType.StoredProcedure;
            sqlDataread = sqlcommand.ExecuteReader();

            return sqlDataread;
        }

        public object ExecuteScalar(string NombreSp, List<SqlParameter> Parametros)
        {
            sqlcommand = new SqlCommand();
            sqlcommand.Connection = this.sqlConnection;
            sqlcommand.CommandTimeout = 3600;
            sqlcommand.CommandText = NombreSp;
            if (Parametros != null && Parametros.Count > 0)
            {
                sqlcommand.Parameters.AddRange(Parametros.ToArray());
            }
            sqlcommand.CommandType = System.Data.CommandType.StoredProcedure;
            object Respuesta = sqlcommand.ExecuteScalar();
            this.Close();
            return Respuesta;
        }

        public void ExecuteScalarOutput(string NombreSp, ref List<SqlParameter> Parametros)
        {
            sqlcommand = new SqlCommand();
            sqlcommand.Connection = this.sqlConnection;
            sqlcommand.CommandTimeout = 3600;
            sqlcommand.CommandText = NombreSp;
            if (Parametros != null && Parametros.Count > 0)
            {
                sqlcommand.Parameters.AddRange(Parametros.ToArray());
            }
            sqlcommand.CommandType = System.Data.CommandType.StoredProcedure;
            sqlcommand.ExecuteScalar();
            this.Close();
        }

        public object ExecuteFunction(string NombreFunc, List<SqlParameter> Parametros)
        {
            sqlcommand = new SqlCommand();
            sqlcommand.Connection = this.sqlConnection;
            sqlcommand.CommandTimeout = 3600;
            sqlcommand.CommandText = "Select " + NombreFunc + "(";
            foreach (SqlParameter p in Parametros)
                sqlcommand.CommandText += "@" + p.ParameterName + ",";

            sqlcommand.CommandText = sqlcommand.CommandText.Remove(sqlcommand.CommandText.Length - 1, 1);
            sqlcommand.CommandText += ")";

            if (Parametros != null && Parametros.Count > 0)
                sqlcommand.Parameters.AddRange(Parametros.ToArray());

            sqlcommand.CommandType = CommandType.Text;
            object Respuesta = sqlcommand.ExecuteScalar();
            return Respuesta;
        }

        public object ExecuteNonQuery(string NombreSp, List<SqlParameter> Parametros)
        {
            sqlcommand = new SqlCommand();
            sqlcommand.Connection = this.sqlConnection;
            sqlcommand.CommandTimeout = 3600;
            sqlcommand.CommandText = NombreSp;
            if (Parametros != null && Parametros.Count > 0)
            {
                sqlcommand.Parameters.AddRange(Parametros.ToArray());
            }
            sqlcommand.CommandType = System.Data.CommandType.StoredProcedure;
            object Respuesta = sqlcommand.ExecuteNonQuery();
            this.Close();
            return Respuesta;
        }

        public void Dispose()
        {
            if (sqlConnection.State != ConnectionState.Closed)
                sqlConnection.Close();
            sqlConnection.Dispose();
        }
    }
}