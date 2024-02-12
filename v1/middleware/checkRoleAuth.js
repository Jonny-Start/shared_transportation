/**
 * Verificamos si el cliente tiene los permisos necesarios para esta consulta
 */

const { verifyToken } = require("../helpers/generateAndValidateToken");
const User = require("../../models/users");

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    //Validamos si existe un toquen
    if (!req.headers.authorization) {
      res.status(401);
      return res.send({
        error: {
          es: "No se encontró un toquen en el header",
          en: "No token found in header",
        },
      });
    }
    //Extraemos el JWT de los headers de la petición
    const token = req.headers.authorization.split(" ").pop();
    //Verificamos la integridad del toquen
    const tokenData = await verifyToken(token);
    //Buscamos el usuario mediante el ID extraído del toquen
    const userData = await User.findById(tokenData._id);

    //Verificamos si el rol del usuario está entre los permitidos del arreglo declarado en la ruta
    if ([].concat(roles).includes(userData.role)) {
      req.userRolIdVerified = tokenData._id;
      next();
    } else {
      res.status(401);
      res.send({
        error: {
          es: "No tienes permisos para esta acción",
          en: "You do not have permissions for this action",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error: " + error,
    });
  }
};

const checkRoleUpdate = (roles) => async (req, res, next) => {
  try {
    //Validamos si existe un toquen
    if (!req.headers.authorization) {
      res.status(401);
      return res.send({
        error: {
          es: "No se encontró un toquen en el header",
          en: "No token found in header",
        },
      });
    }
    //Extraemos el JWT de los headers de la petición
    const token = req.headers.authorization.split(" ").pop();
    //Verificamos la integridad del toquen
    const tokenData = await verifyToken(token);
    //Buscamos el usuario mediante el ID extraído del toquen
    const userData = await User.findById(tokenData._id);
    // if (!userData) {
    //   res.status(404);
    //   return res.send({
    //     error: {
    //       es: "No se encontró información del usuario solicitado",
    //       en: "No requested user information found",
    //     },
    //   });
    // }

    //Verificamos si el rol del usuario está entre los permitidos del arreglo declarado en la ruta
    if (
      [].concat(roles).includes(userData.role) ||
      userData._id == tokenData._id
    ) {
      req.userRolIdVerified = tokenData._id;
      next();
    } else {
      res.status(401);
      res.send({
        error: {
          es: "No tienes permisos para esta acción",
          en: "You do not have permissions for this action",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error: " + error,
    });
  }
};

module.exports = { checkRoleAuth, checkRoleUpdate };
