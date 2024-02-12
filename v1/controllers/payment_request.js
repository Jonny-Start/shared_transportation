const Travels = require("../../models/travels");
const { verifyToken } = require("./../helpers/generateAndValidateToken");
const Users = require("../../models/users");

const payment_request = async (req, res) => {
  const id_travel = req.params.id_travel;
  const tokenData = await verifyToken(
    req.headers["authorization"].split(" ")[1]
  );
  const id_user = tokenData._id;

  if (id_travel == "" || id_travel == undefined) {
    return res.status(500).json({
      id_travel: id_travel,
      kilometres: kilometres,
      message: "Error: El ID del viaje es requerido / " + error,
    });
  }
  try {
    const dataUser = Users.findById(id_user);
    const travel = Travels.findById(id_travel);
    const Total_price = travel.cost_total;

    //Pago con entidad externa

    // URL del servidor
    const url = "https://production.wompi.co/v1/tokens/cards";

    // Token de seguridad
    const token = "pub_stagint_ugRk15MJiZS8ORew4zTicuHilfC4p6Iu";

    // Datos a enviar en el cuerpo de la solicitud
    const datos = {
      amount_in_cents: Total_price, // Monto current centavos
      currency: "COP", // Moneda
      signature:
        "37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5", //Firma de integridad
      customer_email: dataUser.email, // Email del usuario
      payment_method: {
        installments: 2, // Número de cuotas si la fuente de pago representa una tarjeta de lo contrario el campo payment_method puede ser ignorado.
      },
      reference: "sJK4489dDjkd390ds02", // Referencia única de pago
      payment_source_id: 3891, // ID de la fuente de pago
    };

    // Configuración de la solicitud
    const configuracion = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    };

    // Realizar la solicitud con fetch
    fetch(url, configuracion)
      .then((response) => {
        if (!resopnse.ok) {
          return res.status(500).json({
            message: "Error: no se pudo realizar el pago ",
            resopnse: resopnse,
          });
        }
        return response.json();
      })
      .then(async (data) => {
        await Travels.findByIdAndUpdate(id_travel, { paid: true });

        return res.status(200).json({
          message: "Succes: pago realizado con exito",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error: no se pudo realizar el pago ",
          error: error,
        });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error: " + error,
    });
  }
};

module.exports = { payment_request };
