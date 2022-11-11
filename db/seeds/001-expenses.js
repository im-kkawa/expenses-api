/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('expenses').del();
  await knex('expenses').insert([
    {
      id: 1,
      date: 20221101,
      category: '交際費',
      note: '会社の飲み会',
      deposit: 0,
      withdrawal: 5000,
    },
    {
      id: 2,
      date: 20221101,
      category: '給料',
      note: '10月分給料',
      deposit: 300000,
      withdrawal: 0,
    },
    {
      id: 3,
      date: 20221102,
      category: '食費',
      note: '外食',
      deposit: 0,
      withdrawal: 1000,
    },
    {
      id: 4,
      date: 20221102,
      category: '食費',
      note: '数日分のまとめ買い',
      deposit: 0,
      withdrawal: 3000,
    },
    {
      id: 5,
      date: 20221102,
      category: '娯楽費',
      note: '書籍の購入',
      deposit: 0,
      withdrawal: 2000,
    },
  ]);
};
