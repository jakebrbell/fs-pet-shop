'use strict';

const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const fs = require('fs');
const http = require('http');
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      throw err;
    }

    const index = Number(req.url.substr(req.url.lastIndexOf('pets/') + 5));
    const pets = JSON.parse(petsJSON);
    const petJSON = JSON.stringify(pets[index]);
    const petRegExp = /^\/pets\/(.*)$/;

    if (req.method === 'GET' && req.url === '/pets') {
      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    }
    else if (req.method === 'GET' && req.url.match(petRegExp) && pets[index]) {
      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    }
    else if (req.method === 'POST' && req.url === '/pets') {
      var newPet = '';

      req.on('data', function(data) {
        newPet += data.toString();
      });
      req.on('end', function() {
        var newPetParsed = JSON.parse(newPet);
        newPetParsed.age = Number(newPetParsed.age);
        pets.push(newPetParsed);

        const newPetsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
          if (writeErr) {
            throw writeErr;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(newPetParsed);
        });
      });
    }
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not found');
    }
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});









// else if(req.method === 'POST' && req.url === '/pets') {
//   let bodyJSON = '';
//
//   req.on('data', function(chunk) {
//     bodyJSON += chunk.toString();
//   });
//
//   req.on('end', () => {
//     fs.readFile(petsPath, 'utf8', (readErr, data) => {
//       if (readErr) {
//         throw readErr;
//       }
//
//       const body = JSON.parse(bodyJSON);
//       const pets = JSON.parse(data);
//       const age = Number.parseInt(body.age);
//       const kind = body.kind;
//       const name = body.name;
//
//       if (Number.isNaN(age) || !kind || !name) {
//         res.statusCode = 400;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Bad Request');
//
//         return;
//       }
//
//       const pet = {age, kind, name };
//
//       pets.push(pet);
//
//       const petJSON = JSON.stringify(pet);
//       const petsJSON = JSON.stringify(pets);
//
//       fs.writeFile(petsPath, petsJSON, (writeErr) => {
//         if (writeErr) {
//           throw writeErr;
//         }
//
//         res.setHeader('Content-Type', 'application/json');
//         res.end(petJSON);
//       });
//     });
//   });
// }
