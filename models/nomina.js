'use strict';
module.exports = (sequelize, DataTypes) => {
  const nomina = sequelize.define('nomina', {
    id: { primaryKey: true , type: DataTypes.STRING },
    anio: DataTypes.INTEGER,
    nro: DataTypes.INTEGER,
    rut: DataTypes.STRING,
    nombre: DataTypes.STRING,
    bonificacion: DataTypes.INTEGER,
    comuna: DataTypes.BOOLEAN,
    fecha_acto_venta: DataTypes.DATE,
    bus_financiador: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    bus_comuna: DataTypes.STRING
  }, {});
  nomina.associate = function(models) {
    // associations can be defined here
  };
  return nomina;
};