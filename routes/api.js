const express = require('express');
const router = express.Router();
const Nota = require('../models/nota');

//Cálculo de notas com o método GET
router.get('/notas', (req, res, next) => {
  let valor = req.query.vlrSaque;
  let qtdNotas = 0;
  let result = [];

  Nota.count({}, (count) => { const tam = count; });

  Nota.find({}, { "nota": 1,"_id": 0 }, (err, notas) => {

    notas = notas.map((item, i, arr) => {
       qtdNotas = Math.trunc(valor/item.nota);
       valor %= item.nota;

       if (arr.length - 1 === i) {
        if(valor < item.nota && valor != 0)
            result.push("Nota indisponível: R$" + valor);
      }

       result.push(' R$' + item.nota + ': ' + qtdNotas);
       return result;
     });

    if(err)
      res.sendStatus(err);

      res.send(result);
   })
});

//Depósito de notas (POST)
router.post('/notas', (req, res, next) => {
  Nota.create(req.body).then((nota) => {
    res.send(nota);
  }).catch(next);
});

module.exports = router;
