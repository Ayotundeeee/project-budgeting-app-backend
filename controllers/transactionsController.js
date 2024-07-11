const express = require('express');
const { nanoid } = require("nanoid");
const transactions = express.Router();
const transactionsArray = require('../models/transactions')
const { validateTransaction } = require('../validations/transactionValidation')
const { findById } = require('../helpers/helpers')

// route for GET-ting all bookmarks
transactions.get('/', (req, res) => {
    res.json(transactionsArray);
})

// route for GET-ting bookmark by index
transactions.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params
    if(transactionsArray[arrayIndex]){
        res.json(transactionsArray[arrayIndex])
    } else {
        res.status(404).json({ error: "Transaction Not Found"})
    }
})

// route for searching by queries
// transactions.get('/')

// POST Route to Create new transaction;
transactions.post('/', validateTransaction, (req, res) => {
    const newTransaction = req.body;
    transactionsArray.push(newTransaction)
    res.json(transactionsArray[transactionsArray.length - 1])
})

// DELETE route to Remove existing transaction
transactions.delete('/:index', (req, res) => {
    const { index } = req.params;
    // const target = findById(transactionsArray, id);
    // const targetIdx = transactionsArray.indexOf(target);

    const transToDelete = transactionsArray[index]
    if(transToDelete){
        const deletedTransaction = transactionsArray.splice(index, 1)
        res.json(deletedTransaction[0])
    } else {
        res.json({error: `Transaction not found`})
    }
})

// PUT Route for Editing existing transaction
transactions.put('/:index', validateTransaction, (req, res) => {
    const { index } = req.params;
    // const target = findById(transactionsArray, id);
    // const arrayIndex = transactionsArray.indexOf(target);
    transactionsArray[index] = req.body;
    res.status(200).json(transactionsArray[index]);
})

module.exports = transactions;