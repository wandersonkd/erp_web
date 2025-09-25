const bcrypt = require('bcrypt');
const senha = 'admin123'; // <-- Coloque a senha que você quer usar aqui

bcrypt.hash(senha, 10).then(hash => {
  console.log('Seu hash bcrypt é:');
  console.log(hash);
});