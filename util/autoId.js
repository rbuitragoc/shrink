
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const number = '0123456789';

const generateId = function() {
  let prefix = '';
  for (let i = 0; i < 3; i++) {
    prefix += alpha.charAt(Math.floor(Math.random() * alpha.length));
  }
  let suffix = '';
  for (let i = 0; i < 2; i++) {
    suffix += number.charAt(Math.floor(Math.random() * number.length));
  }
  
  console.log('Generated random shrunk id; ' + prefix + suffix);
  return prefix + suffix;
}

module.exports = {
    getNewShrunkId: generateId,
}