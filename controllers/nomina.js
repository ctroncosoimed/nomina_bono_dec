const nomina = require('../models').nomina;
var sequelize = require('sequelize');

module.exports = {
  list(req, res) {
    let where = {};
    if (req.query.codigo != null && req.query.codigo != "") { where["id"] = req.query.codigo }
    if (req.query.año != null && req.query.año != "") { where["anio"] = req.query.año }
    if (req.query.nro != null && req.query.nro != "") { where["nro"] = req.query.nro }
    if (req.query.rut != null && req.query.rut != "") { where["rut"] = req.query.rut }
    if (req.query.nombre != null && req.query.nombre != "") { where["nombre"] = req.query.nombre }
    if (req.query.bonificacion != null && req.query.bonificacion != "") { where["bonificacion"] = req.query.bonificacion }
    if (req.query.comuna != null && req.query.comuna != "") { where["comuna"] = req.query.comuna }
    if (req.query.bus_comuna != null && req.query.bus_comuna != "") { where["bus_comuna"] = req.query.bus_comuna }
    if (req.query.fecha_acto_venta != null && req.query.fecha_acto_venta != "") { where["fecha_acto_venta"] = req.query.fecha_acto_venta }
    if (req.query.bus_financiador != null && req.query.bus_financiador != "") { where["bus_financiador"] = req.query.bus_financiador }
    if (req.query.mes != null && req.query.mes != "") { where = sequelize.literal("EXTRACT(month FROM fecha_acto_venta) = "+req.query.mes)} 

    if ( req.query.limit == null ) { req.query.limit = 3 }
    if ( req.query.offset == null ) { req.query.offset = 0 }

    return nomina
    .findAndCountAll({
      where,
      limit: parseInt(req.query.limit),
      offset: parseInt(req.query.offset),
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