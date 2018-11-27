'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nominas', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      anio: {
        type: Sequelize.INTEGER
      },
      nro: {
        type: Sequelize.INTEGER
      },
      rut: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      bonificacion: {
        type: Sequelize.INTEGER
      },
      comuna: {
        type: Sequelize.BOOLEAN
      },
      comuna: {
        type: Sequelize.BOOLEAN
      },             
      bus_comuna: {
        type: Sequelize.DATE
      },
      bus_financiador: {
        type: Sequelize.STRING
      },
      fecha_acto_venta: {
        type: Sequelize.DATE
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.BOOLEAN
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('nominas');
  }
};