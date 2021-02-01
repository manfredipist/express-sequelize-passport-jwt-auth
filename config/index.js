module.exports = {
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' 
    ? process.env.PORT 
    :  9000,
  mariadb_host: process.env.NODE_ENV === 'production' 
    ? process.env.MARIADB_HOST
    : "localhost",
  mariadb_port: process.env.NODE_ENV === 'production' 
    ? process.env.MARIADB_PORT
    : "3306",
  mariadb_db: process.env.NODE_ENV === 'production' 
    ? process.env.MARIADB_DB
    : "ExpressSequelizePassport",
  mariadb_user: process.env.NODE_ENV === 'production' 
    ? process.env.MARIADB_USER
    : "root",
  mariadb_password: process.env.NODE_ENV === 'production' 
    ? process.env.MARIADB_PASS
    : "r00t",
  auth_secret: process.env.NODE_ENV === 'production' 
    ? process.env.AUTH_SECRET
    : "secret"
};