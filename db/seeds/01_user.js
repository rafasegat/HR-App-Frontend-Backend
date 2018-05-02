
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, email: 'rafasegat@gmail.com', password:'1' },
        {id: 2, email: 'raf@fivecreative.com.au', password: '1' }
      ]);
    });
};
