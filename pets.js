'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var index = Number(process.argv[3]);
    var pets = JSON.parse(data);

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
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var age = Number(process.argv[3]);
    var kind = process.argv[4];
    var name = process.argv[5];

    if (age && kind && name) {
      var pets = JSON.parse(data);
      var pet = {
        age: age,
        kind: kind,
        name: name
      };
      pets.push(pet);

      var petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, function(writeErr) {
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
  fs.readFile(petsPath, 'utf8', function(updateErr, data) {
    if (updateErr) {
      throw updateErr;
    }

    var index = Number(process.argv[3]);
    var age = Number(process.argv[4]);
    var kind = process.argv[5];
    var name = process.argv[6];

    if (index && age && kind && name) {
      var pets = JSON.parse(data);

      if (pets[index]) {
        var pet = {
          age: age,
          kind: kind,
          name: name
        };
        pets[index] = pet;

        var petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
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
  fs.readFile(petsPath, 'utf8', function(destroyErr, data) {
    if (destroyErr) {
      throw destroyErr;
    }

    var index = Number(process.argv[3]);
    var pets = JSON.parse(data);

    if (index) {
      if (pets[index]) {
        var pet = pets.splice(index, 1);
        var petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
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
