const findById = (transactions, id) => {
    return transactions.find(trans => trans.id === id);
}

module.exports = { findById }