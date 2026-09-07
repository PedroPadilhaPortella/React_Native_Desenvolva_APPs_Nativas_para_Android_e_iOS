const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { authSecret } = require("../.env.local");

module.exports = (app) => {
  const signin = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).send("Dados incompletos");
      }

      const user = await app
        .db("users")
        .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
        .first();

      if (!user) {
        return res.status(400).send("Usuário não cadastrado!");
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res.status(401).send("A senha informada é inválida!");
      }

      const payload = { id: user.id, name: user.name, email: user.email };

      res.json({
        name: user.name,
        email: user.email,
        token: jwt.sign(payload, authSecret, { expiresIn: "7d" }),
      });
    } catch (err) {
      res.status(500).json({ error: "Erro ao autenticar usuário" });
    }
  };

  return { signin };
};
