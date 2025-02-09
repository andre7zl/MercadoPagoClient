const URL_GASTOS = "https://api.mercadopago.com/v1/payments/search";
const ACCESS_TOKEN =
  "APP_USR-8200924476094507-020820-e640332cf321e57e55149cbd2dc60280-1945113621";

const params = new URLSearchParams({
  status: "approved",
  limit: 10,
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
