require("dotenv").config();
const axios = require("axios");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("db_dashboard", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const Transferencia = sequelize.define(
  "gasto",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    categoria_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    data_criacao: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING(50), allowNull: false },
  },
  {
    tableName: "gasto",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => console.log("BANCO OK"))
  .catch((err) => console.error("Erro ao connectar banco", err));

async function buscargastos() {
  try {
    const resposta = await axios.get(
      "https://api.mercadopago.com/v1/payments/search",
      {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
      }
    );

    const gastosAprovadas = resposta.data.results.filter(
      (t) => t.status === "approved"
    );

    for (const t of gastosAprovadas) {
      await Transferencia.create({
        valor: t.transaction_amount,
        categoria_id: null,
        data_criacao: new Date(t.date_approved),
        status: t.status,
      });
    }

    console.log("Transferências aprovadas salvas no banco!");
  } catch (error) {
    console.error("Erro ao buscar transferências:", error.message);
  }
}

buscargastos();
