
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const NUMBER = '0123456789';

const generateId = function() {
  let prefix = '';
  for (let i = 0; i < 3; i++) {
    prefix += ALPHA.charAt(Math.floor(Math.random() * ALPHA.length));
  }
  let suffix = '';
  for (let i = 0; i < 2; i++) {
    suffix += NUMBER.charAt(Math.floor(Math.random() * NUMBER.length));
  }
  
  return prefix + suffix;
}

module.exports = {
  getNewShrunkId: generateId,
}