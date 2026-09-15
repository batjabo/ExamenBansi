using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http;

namespace apiexamen.ClientAPI
{
    public class APIconsume
    {
        private readonly HttpClient _httpClient = new HttpClient();

        public APIconsume()
        {
            string urlBase= "http://localhost:58397/";
            _httpClient = new HttpClient
            {
                BaseAddress = new System.Uri(urlBase)
            };
        }

        public async Task<List<ExamenModel>> obtenerListaExamen()
        {
            HttpResponseMessage response =
                await _httpClient.GetAsync("api/listaExamen");

            response.EnsureSuccessStatusCode();

            string json =
                await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<List<ExamenModel>>(json);
        }

        public async Task<List<ExamenModel>> ConsultarExamen(int fi_idExamen)
        {
            HttpResponseMessage response =
                await _httpClient.GetAsync("api/ConsultarExamen/{fi_esExamen}");

            response.EnsureSuccessStatusCode();

            string json =
                await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<List<ExamenModel>>(json);
        }

        public async Task<string> AgregarExamen(ExamenModel model)
        {
            HttpResponseMessage response =
                await _httpClient.GetAsync("api/AgregarExamen");

            response.EnsureSuccessStatusCode();

            string json =
                await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<string>(json);
        }

        public async Task<string> ActualizarExamen(ExamenModel model)
        {
            HttpResponseMessage response =
                await _httpClient.GetAsync("api/ActualizarExamen");

            response.EnsureSuccessStatusCode();

            string json =
                await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<string>(json);
        }

        public async Task<string> EliminarExamen(int fi_idExamen)
        {
            HttpResponseMessage response =
                await _httpClient.GetAsync("api/EliminarExamen/{fi_idExamen}");

            response.EnsureSuccessStatusCode();

            string json =
                await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<string>(json);
        }
    }
}
