const validateTransaction = (req, res, next) => {
    const transaction = req.body;
    const properties = ["id", "item_name", "amount", "date","from", "category"];
    const missingProp = properties.find(prop => !Object.keys(transaction).includes(prop));

    if(!missingProp){
        next();
    } else {
        res.json({ error: `Transaction must contain ${missingProp}`});
    }
}

module.exports = { validateTransaction };