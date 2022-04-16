const client = require('./client');


const create_table_query = `
CREATE TABLE IF NOT EXISTS users (
  email varchar,
  id varchar NOT NULL,
  name varchar,
  photo varchar,
  PRIMARY KEY (id)
);
`;


const create_notifications_query = `
CREATE TABLE IF NOT EXISTS users_notifications (
  user_id varchar NOT NULL,
  token varchar,
  FOREIGN KEY (user_id) REFERENCES users(id)
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
    client
      .query(create_notifications_query)
      .then(result => {
        console.log('notifications table created successfully');
      })
      .catch(e => console.error('notifications db connection error', e.stack))
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

const createUserNoticationsRow = (request, callback) => {
  const { user_id, token } = request;

  client.query(
    "INSERT INTO users_notifications (user_id, token) VALUES ($1, $2) RETURNING *",
    [user_id, token],
    (error, result) => {
      if (error) {
        throw error;
      }
      callback(error, result.rows[0]);
    }
  );
};

const updateUserNoticationsRow = (request, callback) => {
  const { user_id, token } = request;

  client.query(
    `UPDATE users_notifications set token = ${token} where user_id = ${user_id} RETURNING *`,
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

const selectUserNotifications = (id, callback) => {
  client.query(`select * from users_notifications where user_id = '${id}'`, (err, res) => {
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

const seletUserToken = (id, callback) => {
  client.query(`select * from users_notifications where id = '${id}%'`, (err, res) => {
    if(err) {
      throw err;
    } else {
      callback(err, res.rows);
    }
  })
}

module.exports = {
  createUserRow, selectUser, selectUserByName, seletUserToken, selectUserNotifications,createUserNoticationsRow, updateUserNoticationsRow
}
