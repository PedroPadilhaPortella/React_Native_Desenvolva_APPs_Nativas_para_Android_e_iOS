const bcrypt = require("bcrypt");

module.exports = (app) => {
  const save = async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      
      await app.db("users").insert({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: hash,
      });

      res.status(204).send();

    } catch (err) {
      res.status(400).json(err);
    }
  };

  return { save };
};
