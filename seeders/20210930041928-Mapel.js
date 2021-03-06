'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('Mapels', [
       {
        nama_mapel: "Matematika",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        nama_mapel: "Bahasa Indonesia",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
         nama_mapel: "Ilmu Pengetahuan Alam",
         createdAt : new Date(),
         updatedAt : new Date()
       },
       {
        nama_mapel: "Ilmu Pengetahuan Sosial",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        nama_mapel: "Bahasa Inggris",
        createdAt : new Date(),
        updatedAt : new Date()
      }
     ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Mapel',null,{});
  }
};
