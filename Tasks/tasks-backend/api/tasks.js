const moment = require("moment");

module.exports = (app) => {
  const getTasks = (req, res) => {
    const maxDate = req.query.maxDate
      ? moment(req.query.maxDate).endOf("day").toDate()
      : moment().endOf("day").toDate();

    const query = app
      .db("tasks")
      .where({ userId: req.user.id })
      .where("estimateAt", "<=", maxDate)
      .orderBy("estimateAt");

    if (req.query.minDate) {
      query.where(
        "estimateAt",
        ">=",
        moment(req.query.minDate).startOf("day").toDate(),
      );
    }

    if (req.query.onlyPending === "true") {
      query.whereNull("doneAt");
    }

    query
      .then((tasks) => res.json(tasks))
      .catch((err) => res.status(400).json(err));
  };

  const save = (req, res) => {
    if (!req.body.desc.trim()) {
      return res.status(400).send("Descrição é um campo obrigatório");
    }

    req.body.userId = req.user.id;

    app
      .db("tasks")
      .insert(req.body)
      .returning("*")
      .then(([task]) => res.status(201).json(task))
      .catch((err) => res.status(400).json(err));
  };

  const remove = (req, res) => {
    app
      .db("tasks")
      .where({ id: req.params.id, userId: req.user.id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(204).send();
        } else {
          const msg = `Não foi encontrada task com id ${req.params.id}.`;
          res.status(400).send(msg);
        }
      })
      .catch((err) => res.status(400).json(err));
  };

  const toggleTask = (req, res) => {
    app
      .db("tasks")
      .where({ id: req.params.id, userId: req.user.id })
      .first()
      .then((task) => {
        if (!task) {
          const msg = `Task com id ${req.params.id} não encontrada.`;
          return res.status(400).send(msg);
        }

        const doneAt = task.doneAt ? null : new Date();

        app
          .db("tasks")
          .where({ id: req.params.id, userId: req.user.id })
          .update({ doneAt })
          .returning("*")
          .then(([task]) => res.status(201).json(task))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  };

  return { getTasks, save, remove, toggleTask };
};
