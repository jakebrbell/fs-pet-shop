'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, '../pets.json');

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get((_req, res, next) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        return next(err);
      }

      const pets = JSON.parse(petsJSON);

      res.send(pets);
    });
  })
  .post((req, res, next) => {
    fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
      if (readErr) {
        return next(readErr);
      }

      const pets = JSON.parse(petsJSON);
      const age = Number.parseInt(req.body.age);
      const { kind, name } = req.body;

      if (Number.isNaN(age) || !kind || !name) {
        return res.sendStatus(400);
      }

      const pet = { age, kind, name };

      pets.push(pet);

      const newPetsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
        if (writeErr) {
          return next(writeErr);
        }

        res.send(201, pet);
      });
    });
  });

router.route('/:id')
  .get((req, res, next) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        return next(err);
      }

      const id = Number.parseInt(req.params.id);
      const pets = JSON.parse(petsJSON);

      if (id < 0 || id >= pets.length || Number.isNaN(id)) {
        return res.sendStatus(404);
      }

      res.send(pets[id]);
    });
  })
  .put((req, res, next) => {
    fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
      if (readErr) {
        return next(readErr);
      }

      const id = Number.parseInt(req.params.id);
      const pets = JSON.parse(petsJSON);

      if (Number.isNaN(id) || id < 0 || id >= pets.length) {
        return res.sendStatus(404);
      }

      const age = Number.parseInt(req.body.age);
      const { kind, name } = req.body;

      if (Number.isNaN(age) || !kind || !name) {
        return res.sendStatus(400);
      }

      const pet = { age, kind, name };

      pets[id] = pet;

      const newPetsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
        if (writeErr) {
          return next(writeErr);
        }

        res.send(pet);
      });
    });
  })
  .patch((req, res, next) => {
    // eslint-disable-next-line max-statements
    fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
      if (readErr) {
        return next(readErr);
      }

      const id = Number.parseInt(req.params.id);
      const pets = JSON.parse(petsJSON);

      if (Number.isNaN(id) || id < 0 || id >= pets.length) {
        return res.sendStatus(404);
      }

      if (!req.body.age && !req.body.kind && !req.body.name) {
        return res.sendStatus(400);
      }

      const age = Number.parseInt(req.body.age || pets[id].age);
      const kind = req.body.kind || pets[id].kind;
      const name = req.body.name || pets[id].name;

      if (Number.isNaN(age)) {
        return res.sendStatus(400);
      }

      const pet = { age, kind, name };

      pets[id] = pet;

      const newPetsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
        if (writeErr) {
          return next(writeErr);
        }

        res.send(pet);
      });
    });
  })
  .delete((req, res, next) => {
    fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
      if (readErr) {
        return next(readErr);
      }

      const id = Number.parseInt(req.params.id);
      const pets = JSON.parse(petsJSON);

      if (Number.isNaN(id) || id < 0 || id >= pets.length) {
        return res.sendStatus(404);
      }

      const pet = pets.splice(id, 1)[0];
      const newPetsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
        if (writeErr) {
          return next(writeErr);
        }

        res.send(pet);
      });
    });
  });

module.exports = router;
