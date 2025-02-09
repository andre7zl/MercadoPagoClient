const URL_GASTOS = "https://api.mercadopago.com/v1/payments/search";
const ACCESS_TOKEN = "...";

// Parâmetros para filtrar os pagamentos aprovados
const params = new URLSearchParams({
  status: "approved",
  limit: 50,
});

const urlComParams = `${URL_GASTOS}?${params.toString()}`;

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

fetch(urlComParams, {
  method: "GET",
  headers,
})
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((payment) => {
      console.log(
        `ID: ${payment.id}, Valor: R$${payment.transaction_amount}, Data: ${payment.date_created}`
      );
    });
  })
  .catch((erro) => console.error("Erro:", erro));
