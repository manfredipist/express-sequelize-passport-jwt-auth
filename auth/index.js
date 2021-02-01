const passport = require('passport');

const config = require("../config")

const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const models = require('../models/').models
const UserModel = models.User

passport.use('register', new localStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',      
    passReqToCallback: true
  },
  async (req, email, password, callback) => {
    try {
      var user_payload = {
        email : email,
        password: password,
        name: req.body.name,
        surname: req.body.surname,
        number: req.body.number
      }
      const user = await UserModel.create(user_payload);
      return callback(null, user, "Registration Successful");

    } catch (error) {
      return callback(error, null);
    }
  }
)
);

passport.use('login', new localStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({where : { email: email } });

      if (!user) {
        return done(null, false, "User not found");
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(null, false, "Wrong Password" );
      }

      return done(null, user, "Login Succesful" );
    } catch (error) {
      return done(error);
    }
  }
)
);

passport.use(
new JWTstrategy(
  {
    jwtFromRequest: ExtractJWT.fromHeader('auth_token'),
    secretOrKey: config.auth_secret
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
)
);
