const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const prm = mongoose.Promise = require('bluebird');

const NotasSchema = new Schema({
  nota: {
    type: Number,
    required: [true, 'Nota é obrigatória!']
  }
});

const Nota = mongoose.model('nota', NotasSchema);

Nota.count({}, (err, count) => {
  if(count == 0){
      const initData = [
          { nota: "100" },
          { nota: "50" },
          { nota: "20" },
          { nota: "10" }
      ];

      prm.all(initData.map(i => new Nota(i).save()))
          .then(() => console.log('Notas salvas!'))
          .catch((err) => console.log('Error: ' + err))
          .finally(process.exit);
     }
 });

module.exports = Nota;
