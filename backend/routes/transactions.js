const { addIncome, getIncomes, deleteIncome } = require('../controllers/income')


const router = require('express').Router()

router.get('/', (req,res)=>{
    res.send("Hello world!!")
})

router.post('/add-income', addIncome) 
// adding the nedpoint for get the datas
        .get('/get-incomes', getIncomes)
        .delete('/delete-income/:id', deleteIncome)

module.exports = router;