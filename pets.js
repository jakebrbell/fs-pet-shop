'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const index = Number(process.argv[3]);
    const pets = JSON.parse(data);

    if (index) {
      if (pets[index]) {
        console.log(pets[index]);
      }
      else {
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      }
    }
    else {
      console.log(pets);
    }
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }

    const age = Number(process.argv[3]);
    const kind = process.argv[4];
    const name = process.argv[5];

    if (age && kind && name) {
      const pets = JSON.parse(data);
      const pet = { age, kind, name };

      pets.push(pet);

      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }

        console.log(pet);
      });
    }
    else {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1);
    }
  });
}
else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', (updateErr, data) => {
    if (updateErr) {
      throw updateErr;
    }

    const index = Number(process.argv[3]);
    const age = Number(process.argv[4]);
    const kind = process.argv[5];
    const name = process.argv[6];

    if (index && age && kind && name) {
      const pets = JSON.parse(data);

      if (pets[index]) {
        const pet = { age, kind, name };

        pets[index] = pet;

        const petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, (writeErr) => {
          if (writeErr) {
            throw writeErr;
          }

          console.log(pet);
        });
      }
      else {
        console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
        process.exit(1);
      }
    }
    else {
      console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
      process.exit(1);
    }
  });
}
else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', (destroyErr, data) => {
    if (destroyErr) {
      throw destroyErr;
    }

    const index = Number(process.argv[3]);
    const pets = JSON.parse(data);

    if (index) {
      if (pets[index]) {
        const pet = pets.splice(index, 1);
        const petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, (writeErr) => {
          if (writeErr) {
            throw writeErr;
          }

          console.log(pet);
        });
      }
      else {
        console.error(`Usage: ${node} ${file} destroy INDEX`);
        process.exit(1);
      }
    }
    else {
      console.error(`Usage: ${node} ${file} destroy INDEX`);
      process.exit(1);
    }
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update |destroy]`);
  process.exit(1);
}
