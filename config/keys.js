//check if in development or production environment
if(process.env.NODE_ENV === 'production')
{
    module.exports = require('./keys_prod');
}else{
    module.exports = require('./keys_dev');

}