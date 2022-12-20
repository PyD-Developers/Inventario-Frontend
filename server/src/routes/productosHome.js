const { Router } = require("express");
const { Productos, Insumos } = require("../db");
const { create_product, get_product } = require("../utils/utilsProductos");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let data_total = Productos.findAll({
      limit: 7,
      order: [[stock, DESC]],
    });

    return res.status(200).send(data_total);
  } catch (error) {
    console.log("ERROR EN RUTA GET PRODUCTOSHOME", error);
  }
});

module.exports = router;