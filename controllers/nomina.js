const nomina = require('../models').nomina;
var sequelize = require('sequelize');
var validator = require('validator');

module.exports = {
  list(req, res) {
    let where = {};
    if (req.query.codigo != null && req.query.codigo != "") { 
      if (!validator.isAlphanumeric(req.query.codigo)) { return res.json({status: 403, message: 'Params codigo only Number or Letters'}) };
      where["id"] = req.query.codigo 
    }  
    
    if (req.query.anio != null && req.query.anio != "") { 
      if (!validator.isNumeric(req.query.anio)) { return res.json({status: 403, message: 'Params anio only Number'}) };
      where["anio"] = req.query.anio 
    }
    
    if (req.query.nro != null && req.query.nro != "") { 
      if (!validator.isNumeric(req.query.nro)) { return res.json({status: 403, message: 'Params nro only Number'}) };
      where["nro"] = req.query.nro 
    }
    
    if (req.query.rut != null && req.query.rut != "") { 
      where["rut"] = validator.toString(req.query.rut)
    }
    
    if (req.query.nombre != null && req.query.nombre != "") { 
      if (!validator.isAlpha(req.query.nombre)) { return res.json({status: 403, message: 'Params nombre only Letters'}) };
      where["nombre"] = req.query.nombre 
    }
    
    if (req.query.bonificacion != null && req.query.bonificacion != "") { 
      if (!validator.isNumeric(req.query.bonificacion)) { return res.json({status: 403, message: 'Params bonificacion only Number'}) };
      where["bonificacion"] = req.query.bonificacion 
    }
    
    if (req.query.comuna != null && req.query.comuna != "") { 
      where["comuna"] = req.query.comuna 
    }
    
    if (req.query.bus_comuna != null && req.query.bus_comuna != "") { 
      if (!validator.isAlpha(req.query.bus_comuna)) { return res.json({status: 403, message: 'Params bus_comuna only Letters'}) };
      where["bus_comuna"] = req.query.bus_comuna 
    }
    
    if (req.query.fecha_acto_venta != null && req.query.fecha_acto_venta != "") { 
      if (!validator.isDate(req.query.fecha_acto_venta)) { return res.json({status: 403, message: 'Params fecha_acto_venta only Date'}) };
      where["fecha_acto_venta"] = req.query.fecha_acto_venta 
    }
    
    if (req.query.bus_financiador != null && req.query.bus_financiador != "") { 
      if (!validator.isAlpha(req.query.bus_financiador)) { return res.json({status: 403, message: 'Params bus_financiador only Letters'}) };
      where["bus_financiador"] = req.query.bus_financiador 
    }
    
    if (req.query.mes != null && req.query.mes != "") { 
      if (!validator.isNumeric(req.query.mes)) { return res.json({status: 403, message: 'Params mes only Number'}) };
      where[""] = sequelize.literal("EXTRACT(month FROM fecha_acto_venta) = "+req.query.mes)
    }
    
    if (req.query.status != null && req.query.status != "") { 
      where["status"] = req.query.status 
    }
    
    if ( req.query.limit == null ) { req.query.limit = 3 
    }else{
      if (!validator.isNumeric(req.query.limit)) { return res.json({status: 403, message: 'Params limit only Number'}) };
      var limit = validator.toInt(req.query.limit)
    }
    
    if ( req.query.offset == null ) { req.query.offset = 0 
    }else{
      if (!validator.isNumeric(req.query.offset)) { return res.json({status: 403, message: 'Params offset only Number'}) };
      var offset = validator.toInt(req.query.offset)
    }

    return nomina
    .findAndCountAll({
      where,
      limit: limit,
      offset: offset,
    })
    .then(nomina => {
     if(nomina.count <= 0){
      res.status(200).json({status: 403, message: "No records found" });
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
        anio: req.body.anio,
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
          return res.status(404).send({ status: 403, message: 'Unable to save' });
        } else {
          return res.status(201).send({ status: 201, message: 'Created' });
        }
      })
      .catch((error) => res.status(400).json({ status:400, message: error.parent.sqlMessage }));
    },
};