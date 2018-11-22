'use strict';
module.exports = (sequelize, DataTypes) => {
  const nomina = sequelize.define('nomina', {
    id: { primaryKey: true , type: DataTypes.STRING },
    anio: DataTypes.INTEGER,
    nro: DataTypes.INTEGER,
    rut: DataTypes.STRING,
    nombre: DataTypes.STRING,
    bonificacion: DataTypes.INTEGER,
    comuna_valida: DataTypes.BOOLEAN,
    fecha_acto_venta: DataTypes.DATE,
    estado: DataTypes.BOOLEAN,
    financiador: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  nomina.associate = function(models) {
    // associations can be defined here
  };
  return nomina;
};