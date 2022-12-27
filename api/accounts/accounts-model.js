const db = require("../../data/db-config")

const getAll =  () => {
  const result =  db("accounts");
  return result;
}

const getById =  id => {
  const account =  db("accounts").where("id", id).first();
  return account;
}

const create = async account => {
  const [id] = await db("accounts").insert(account)
  const result = await getById(id)
  return result
  // DO YOUR MAGIC
}

const updateById = async (id, account) => {
  const entryId = await db("accounts").where("id", id).update(account)
  const result = await getById(entryId)
  return result
  // DO YOUR MAGIC
}

const deleteById = async id => {
  const deleteId = await db("accounts").where("id", id).del()
  const result = await getById(deleteId)
  return result
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
