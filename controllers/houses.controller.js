import * as repository from "../repositories/houses.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";

// get all houses
export async function getAllHouses(req, res) {
  const all = await repository.getAllHouses();
  return res.status(200).json(all);
}

// get single house
export async function getSingleHouse(req, res) {
  const id = req.params.id;
  const single = await repository.getSingleHouse(id);

  if (single.rowCount === 0) {
    throw new HTTPError(404, "House not found");
  }
  return res.status(200).json(single.rows[0]);
}
