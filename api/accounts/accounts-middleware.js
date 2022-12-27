const Accounts = require("./accounts-model")
const db = require("../../data/db-config")

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
  if (name === undefined || budget === undefined) {
    next({status: 400, message: "name and budget are required"})
  } else if ((name.trim().length < 3) || (name.trim().length > 100)) {
    next({status: 400,  message: "name of account must be between 3 and 100"})

  } else if (!(typeof budget === "number")) {
    next({status: 400,  message: "budget of account must be a number" })

  } else if ( budget < 0 || budget > 10 ** 6) {
    next({status: 400, message: "budget of account is too large or too small" })

  } else {
    next()
  }
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = async (req, res, next) => {
    const result = await db("accounts").where("name", req.body.name.trim()).first()
    if (result) {
      next({status: 400,  message: "name is taken"})
  
    } else {
      next()
    }
  
  // catch(error) {
  //   next(error)
  // }

  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  const {id} = req.params
  const account = await Accounts.getById(id);
  if (account) {
    req.account = account;
    next()
  } else {
    next({status: 404,  message: "account not found"})

  }
  // DO YOUR MAGIC
}
