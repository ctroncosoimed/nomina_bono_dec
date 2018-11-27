const nomina = require('../models').nomina;
var sequelize = require('sequelize');

module.exports = {
  list(req, res) {
    let where = {};
    if (req.params.codigo != null && req.params.codigo != "") { where["id"] = req.params.codigo }
    if (req.params.año != null && req.params.año != "") { where["anio"] = req.params.año }
    if (req.params.nro != null && req.params.nro != "") { where["nro"] = req.params.nro }
    if (req.params.rut != null && req.params.rut != "") { where["rut"] = req.params.rut }
    if (req.params.nombre != null && req.params.nombre != "") { where["nombre"] = req.params.nombre }
    if (req.params.bonificacion != null && req.params.bonificacion != "") { where["bonificacion"] = req.params.bonificacion }
    if (req.params.comuna != null && req.params.comuna != "") { where["comuna"] = req.params.comuna }
    if (req.params.bus_comuna != null && req.params.bus_comuna != "") { where["bus_comuna"] = req.params.bus_comuna }
    if (req.params.fecha_acto_venta != null && req.params.fecha_acto_venta != "") { where["fecha_acto_venta"] = req.params.fecha_acto_venta }
    if (req.params.bus_financiador != null && req.params.bus_financiador != "") { where["bus_financiador"] = req.params.bus_financiador }
    if (req.params.mes != null && req.params.mes != "") { where = sequelize.literal("EXTRACT(month FROM fecha_acto_venta) = "+req.params.mes)} 

    if ( req.params.limit == null) { req.params.limit = 3 }
    if ( req.params.offset == null) { req.params.offset = 1 }

    return nomina
    .findAndCountAll({
      where,
      limit: req.params.limit,
      offset: req.params.offset,
    })
    .then(nomina => {
     if(nomina.count <= 0){
      res.status(200).json({status: 403, message: "No se encontraron registros" });
     }else{
      res.status(200).json({status: 200, message: nomina, limit: req.query.limit, offset: req.query.offset});
     }

      
    })
    .catch(function (error) {
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    });
  },

  update(req, res) {
    return nomina
      .findByPk(req.params.codigo)
      .then(nomina => {
        if (!nomina) {
          return res.status(404).send({ status: 403, message: 'Nomina Not Found' });
        }
        return nomina
          .update({
            status: true,
          })
          .then(() => res.status(200).json({status: 200, message: 'updated'}))  // Send back the updated todo.
          .catch((error) => res.status(400).json({ status: 400 , message: error }));
      })
      .catch((error) => res.status(400).json({ status:400, message: error }));
    },

  insert(req, res) {
    return nomina
      .create({
        id: req.body.id,
        anio: req.body.año,
        nro: req.body.nro,
        rut: req.body.rut,
        nombre: req.body.nombre,
        bonificacion: req.body.bonificacion,
        comuna: req.body.comuna,
        fecha_acto_venta: req.body.fecha_acto_venta,
        bus_financiador: req.body.bus_financiador,
        status: false,
        bus_comuna: req.body.bus_comuna,
      })
      .then(nomina => {
        if (!nomina) {
          return res.status(404).send({ status: 403, message: 'Nomina Not Found' });
        } else {
          return res.status(201).send({ status: 403, message: 'Created' });
        }
      })
      .catch((error) => res.status(400).json({ status:400, message: error }));
    },
};