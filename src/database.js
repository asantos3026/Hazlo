const databaseName = process.env.NODE_ENV === 'test' ? 'hazlodbTest' : 'hazlodb'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)
const faker = require('faker')

module.exports = {
  pgp: pgp,
  db: db,

  getUserById: function(userId){
    const sql = `
      SELECT
        *
      FROM
        users
      WHERE
        id=$1
      LIMIT 1
    `
    const variables = [userId]
    return db.oneOrNone(sql, variables)
  },

  createTodo: function(attributes){
    const sql = `
      INSERT INTO
        todos (user_id, title, work, completed, created_at)
      VALUES
        ($1, $2, $3, $4, now())
      RETURNING
        *
    `
     const variables = [
      attributes.userId,
      attributes.title,
      attributes.work,
      false,
      attributes.created_at
    ] 
    return db.oneOrNone(sql, variables)
  },

  completeTodo: function(todoId){
    const sql = `
      UPDATE 
        todos
      SET
        completed=true 
      WHERE 
        id=$1
    `
    const variables = [todoId]
    return db.oneOrNone(sql, variables)
  },

  uncompleteTodo: function(todoId){
    const sql = `
      UPDATE 
        todos
      SET
        completed=false
      WHERE 
        id=$1
    `
    const variables = [todoId]
    return db.oneOrNone(sql, variables)
  },

  updateTodo: function(todoId, attributes){
    const sql = `
      UPDATE
        todos
      SET
        title=$2, work=$3
      WHERE
        id=$1
    `
    const variables = [
      todoId,
      attributes.title,
      attributes.work
    ]
    console.log('0-------->', sql, variables)
    return db.none(sql, variables)
  },

  deleteTodo: function(todoId) {
    const sql = `
      DELETE 
      FROM
        todos
      WHERE 
        id=$1
    `
    const variables = [todoId]
    return db.none(sql, variables)
  },

  createUser: function(attributes){
    const sql = `
      INSERT INTO
        users (email, password, avatar_url, created_at)
      VALUES
        ($1, $2, $3, now())
      RETURNING
        *
    `
    const variables = [
      attributes.email,
      attributes.password,
      attributes.avatar_url,
    ]
    console.log('????', sql, variables)
    return db.oneOrNone(sql, variables)

  },

  authenticateUser: function(credentials){
    const sql = `
      SELECT
        *
      FROM
        users
      WHERE
        email=$1
      AND
        password=$2
      LIMIT
        1
    `
    const variables = [
      credentials.email,
      credentials.password
    ]
    return db.oneOrNone(sql, variables)
  },

  getOneTodoById: function(todoId){
    const sql = `
      SELECT
        *
      FROM
        todos
      WHERE 
        id=$1
    `
    return db.one(sql, [todoId])
  },

  getAllTodosByUserId: function(userId){
    const sql = `
      SELECT
        *
      FROM
        todos
      WHERE
        user_id=$1
      ORDER BY
        created_at ASC,
        id DESC
    `
    return db.manyOrNone(sql, [userId])
  },

  getWorkTodosByUserId: function(userId){
    const sql = `
      SELECT
        *
      FROM
        todos
      WHERE
        user_id=$1 
      AND
        work=true
      `
      return db.manyOrNone(sql, [userId])
  },

  getPersonalTodosByUserId: function(userId){
    const sql = `
      SELECT
        *
      FROM
        todos
      WHERE
        user_id=$1
      AND
        work=false
    `
    return db.manyOrNone(sql, [userId])
  }
}
