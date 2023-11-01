'use strict';


const bcryptjs = require('bcryptjs');

const salt = bcryptjs.genSaltSync(10);
let password = bcryptjs.hashSync('123', salt);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      firstname: 'Fernando',
      lastname: 'Rodriguez',
      email: 'rodriguez@gmail.com',
      password,
      isActive: true,
      status: true,
      role_id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  {
    firstname: 'Jose',
    lastname: 'Hernandez',
    email: 'hernandez@gmail.com',
    password,
    isActive: true,
    status: true,
    role_id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
