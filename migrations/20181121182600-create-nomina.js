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
      comuna_valida: {
        type: Sequelize.BOOLEAN
      },
      fecha_acto_venta: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      financiador: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('nominas');
  }
};