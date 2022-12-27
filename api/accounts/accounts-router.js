const router = require('express').Router()
const Accounts = require("./accounts-model")
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require("./accounts-middleware")


router.get('/', async (req, res, next) => {
  const result = await Accounts.getAll()
  try {
    res.status(200).json(result)
  }
  catch(error) {
    next(error)
  }
  // DO YOUR MAGIC
})

router.get('/:id', checkAccountId , (req, res, next) => {
  const {id} = req.params
  if (req.account) {
    res.status(200).json(req.account)
  } else {
    next(error)
  }
  // const result = await Accounts.getById(id)
  // try {
  //     res.status(200).json(result)
  // }
  // catch(error) {
  //   next(error)
  // }
  // DO YOUR MAGIC
})

router.post('/', checkAccountPayload, checkAccountNameUnique ,async (req, res, next) => {
  const {name, budget} = req.body
 
    const account = await Accounts.create({name: name.trim(), budget:budget})
    try {
      res.status(201).json(account)
    }
    catch(error) {
      next(error)
    
  }
  // DO YOUR MAGIC
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  const {name, budget} = req.body
  const {id} = req.params
  const account = await Accounts.updateById(id, {name: name.trim(), budget:budget})
  try {
    res.status(200).json(account)
  }
  catch(error) {
    next(error)
  
} 
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  const {id} = req.params
  const account = await Accounts.deleteById(id)
  try {
    res.status(200).json(account)
  }
  catch(error) {
    next(error)
  
} 
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({message: err.message || "error with request"})
})

module.exports = router;
