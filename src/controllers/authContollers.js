const handleResponse = require("../helpers/response.helpers");
const { hash, verifyHash } = require("../helpers/index2.helpers");
const UserService = require("../services/userService");
const moment = require("moment");
const logger = require("../configs/logger.config");
const { generateJwtToken } = require("../helpers/jwt.helpers.js");

class AuthController {
  // Register a User
  async register(req, res) {
    try {
      const { email, password } = req.body;
      logger.info(`${email} --- ${password}`);

      const passwordHash = await hash(password);

      const createData = {
        ...req.body,
        password: passwordHash,
      };

      const user = await UserService.create(createData);

      // generate token
      const token = await generateJwtToken({
        userId: user?._id,
        role: user?.role,
        tokenExpiry: moment(Date.now()).add(15, "minutes"),
      });

      return handleResponse(
        201,
        "user registered successfully",
        { user, token },
        res
      );
    } catch (e) {
      console.log(e);
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  // Log In User
  async login(req, res) {
    logger.debug("Logging in user");
    try {
      const { email, password } = req.body;

      const user = await UserService.findOne(
        {
          email,
        },
        "+password"
      );

      console.log(user);

      if (!user) {
        return handleResponse(400, "invalid email or password", {}, res);
      }

      const passwordMatch = await verifyHash(user.password, password);

      if (!passwordMatch) {
        return handleResponse(400, "invalid email or password");
      }

      // generate token
      const token = await generateJwtToken({
        userId: user?._id,
        email: user.email,
        role: user?.role,
      });

      console.log(token);

      return handleResponse(200, "login successful", { user, token }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }
}

module.exports = new AuthController();
