const nomina = require('../models').nomina;
var sequelize = require('sequelize');

module.exports = {
  list(req, res) {
    let where = {};
    if (req.body.codigo != null && req.body.codigo != "") { where["id"] = req.body.codigo }
    if (req.body.año != null && req.body.año != "") { where["anio"] = req.body.año }
    if (req.body.nro != null && req.body.nro != "") { where["nro"] = req.body.nro }
    if (req.body.rut != null && req.body.rut != "") { where["rut"] = req.body.rut }
    if (req.body.nombre != null && req.body.nombre != "") { where["nombre"] = req.body.nombre }
    if (req.body.bonificacion != null && req.body.bonificacion != "") { where["bonificacion"] = req.body.bonificacion }
    if (req.body.comuna_valida != null && req.body.comuna_valida != "") { where["comuna_valida"] = req.body.comuna_valida }
    if (req.body.fecha_acto_venta != null && req.body.fecha_acto_venta != "") { where["fecha_acto_venta"] = req.body.fecha_acto_venta }
    if (req.body.estado != null && req.body.estado != "") { where["anio"] = req.body.estado }
    if (req.body.financiador != null && req.body.financiador != "") { where["anio"] = req.body.financiador }
    if (req.body.mes != null && req.body.mes != "") { where = sequelize.literal("EXTRACT(month FROM fecha_acto_venta) = "+req.body.mes)} 

    if ( req.query.limit == null) { req.query.limit = 3 }
    if ( req.query.offset == null) { req.query.offset = 1 }

    return nomina
    .findAndCountAll({
      where,
      limit: req.query.limit,
      offset: req.query.offset,
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
};