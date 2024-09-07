const getAllEmis=require('../controller/emi_controller').getAllEmis;
const calculateEMI=require('../controller/emi_controller').calculateEMI;
const getEmiById=require('../controller/emi_controller').getEmiById;

module.exports = app => {
    app.get('/api/emis', getAllEmis);
    app.post('/api/emis', calculateEMI);
    app.get('/api/emis/:id', getEmiById);

};