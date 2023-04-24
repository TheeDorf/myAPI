import query from "../db/utils.js";

const findAll = async () => {
  return query("SELECT ClientId, FirstName, LastName, Sport FROM clients");
};

const findOne = async (id) => {
  return query("SELECT ClientID, FirstName, LastName, Sport FROM clients WHERE ClientID = ?", [
    id
  ]);
};

const addOne = async (client) => {
    return await query("INSERT INTO clients SET ?", [client]);
  };
  
  const updateOne = async (id, client) => {
    return await query("UPDATE clients SET ? WHERE ClientID = ?", [
      client,
      id,
    ]);
  };
  
  const removeOne = async (id) => {
    return await query("DELETE FROM clients WHERE ClientID = ?", [id]);
  };

  export default {
    findAll,
    findOne,
    addOne,
    updateOne,
    removeOne,
  };