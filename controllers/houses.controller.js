import * as housesRepository from "../repositories/houses.repository.js";

// get all houses
export const getAllHouses = async (req, res) => {
  try {
    const allHouses = await housesRepository.getAllHouses();
    res.json(allHouses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// get single house
export const getSingleHouse = async (req, res) => {
  try {
    const one = await housesRepository.getSingleHouse(req.params.id);
    if (one.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error" });
  }
};
