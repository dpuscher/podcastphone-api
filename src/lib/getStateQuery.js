module.exports = (column) =>
  `SELECT "state", COUNT(state) AS "state_count" FROM "Areas" WHERE ${column} = :value GROUP BY "state" ORDER BY "state_count" DESC LIMIT 1`;
