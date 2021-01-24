const express = require("express");
const { Owner } = require("../db/models/index");

const router = express.Router();


router.get("/owners", function (req, res) {
    Owner.findAll({
    where: req.query,
  }).then((data) => {
    res.json(data);
  });
});

router.get("/owners/:id", function (req, res) {
  const id = req.params.id;

  Owner.findByPk(id).then((data) => {
    if (data) res.json(data);
    else res.sendStatus(404);
  });
});

router.delete("/owners/:id", function (req, res) {
  const id = req.params.id;

  Owner.destroy({
    where: {
      id,
    },
  }).then((data) => {
    if (data) res.sendStatus(204);
    else res.sendStatus(404);
  });
});

router.post("/owners", function (req, res) {
  const post = req.body;
  const YearPost= new Date(post.birthDate).getFullYear();
  const YearNow= new Date().getFullYear();
  const majeur = YearNow-YearPost;

  if (post.firstName === undefined || post.firstName === "") {
    res.status(400).json({
      firstName: " must not be empty",
    });
  } else if (post.lastName === undefined || post.lastName === "") {
    res.status(400).json({
      lastName: "must not be empty",
    });
  } else if (post.birthDate=== undefined || post.birthDate === "") {
    res.status(400).json({
      birthDate: "must not be empty",
    });
  }else if (post.LicenseType === undefined || post.LicenseType === "") {
    res.status(400).json({
      LicenseType: "must not be empty",
    });
  }else if (post.LicenseType != 'voiture' && post.LicenseType != 'moto' && post.LicenseType != 'bateau' && post.LicenseType != 'avion') {
    res.status(400).json({
      LicenseType: "not good license",
    });
  }else if (majeur<=18) {
    res.status(400).json({
      birthDate: "you don't have the age to drive",
    });
  } else {
    Owner.create(req.body).then((data) => res.status(201).json(data));
  }
});

router.put("/owners/:id", function (req, res) {
  const id = req.params.id;
  const put = req.body;
    Owner.update(req.body, { where: { id } }).then(([nbUpdated]) => {
    if (nbUpdated === 0) res.sendStatus(404);
    else if (put.LicenseType != 'voiture' && put.LicenseType != 'moto' && put.LicenseType != 'bateau' && put.LicenseType != 'avion') {
      res.status(400).json({
        LicenseType: "not good license to update",
      });
    }
    else
    Owner.findByPk(id).then((data) => {
        res.json(data);
      });
  });
});

module.exports = router;