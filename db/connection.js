const client = require('./client');


const create_table_query = `
CREATE TABLE IF NOT EXISTS users (
  email varchar,
  id varchar,
  name varchar,
  photo varchar
);
`;


const create_notifications_query = `
CREATE TABLE IF NOT EXISTS users_notifications (
  user_id int,
  token varchar
);
`;

const get_user_query = `
CREATE TABLE IF NOT EXISTS users (
  email varchar,
  id varchar,
  name varchar,
  photo varchar
);
`;

client
  .query(create_table_query)
  .then(result => {
    console.log('table created successfully');
  })
  .catch(e => console.error('db connection error', e.stack))


const createUserRow = (request, callback) => {
  const { email, id, name, photo } = request;

  client.query(
    "INSERT INTO users (email, id, name, photo) VALUES ($1, $2, $3, $4) RETURNING email, id, name, photo",
    [email, id, name, photo],
    (error, result) => {
      if (error) {
        throw error;
      }
      callback(error, result.rows[0]);
    }
  );
};

const selectUser = (id, callback) => {
  client.query(`select * from users where id = '${id}'`, (err, res) => {
    if(err) {
      throw err;
    } else {
      callback(err, res.rows[0]);
    }
  })
}

const selectUserByName = (name, callback) => {
  client.query(`select * from users where name ILIKE '${name}%'`, (err, res) => {
    if(err) {
      throw err;
    } else {
      callback(err, res.rows);
    }
  })
}

module.exports = {
  createUserRow, selectUser, selectUserByName
}
