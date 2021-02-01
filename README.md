# express-sequelize-passport-jwt-auth
Authentication boilerplate based on ExpressJS, Sequelize, Passport, JsonWebToken and MariaDB

## Contents

-   [Install](#install)
-   [API](#api)
-   [License](#license)
-   [Donate](#donate)

## Getting Started - install

Before running the project it's **mandatory** to have a **MariaDB** server running with a **schema** called **'ExpressSequelizePassport'**

1. Configure your environment on *conf/index.js* file

2. Run the following command on the root folder:
```sh
npm install
```
3. Finally launch the server
```sh
node index.js
```

## API

<table role="table">
 <thead>
  <tr align="center"><th>HTTP Method</th><th>Service</th><th>Description</th></tr>
 </thead>
 <tbody>

  <tr>
   <td>POST</td>
   <td>/basic/register</td>
   <td>Register an account. You must pass the following parameters:
     <ul>
      <li><a>name</a>: String</li>
     </ul>
     <ul>
      <li><a>surname</a>: String</li>
     </ul>
     <ul>
      <li><a>number</a>: String</li>
     </ul>
     <ul>
      <li><a>email</a>: String</li>
     </ul>
     <ul>
      <li><a>password</a>: String</li>
     </ul>
   </td>
  </tr>

  <tr>
   <td>POST</td>
   <td>/basic/login</td>
   <td>Login an user and return a jwt. You must pass the following parameters:
     <ul>
      <li><a>email</a>: String</li>
     </ul>
     <ul>
      <li><a>password</a>: String</li>
     </ul>
   </td>
  </tr>

   <td>GET</td>
   <td>/auth/secure</td>
   <td>Return a success message in case of valid authentication. You must pass an header called "auth_token" to the request
   </td>
  </tr>

 </tbody>
</table>

You can download an example of Postman collection [here](docs/express-sequelize-passport_collection.json)


## License
express-sequelize-passport-jwt-auth is licensed under the

GNU Affero General Public License v3.0

## Donate

If you've found this project useful, please consider to donate me a coffee

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate?hosted_button_id=KLP7YU6F9HHTY)
