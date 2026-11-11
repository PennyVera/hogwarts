import * as repository from "../repositories/houses.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";

// get all houses
export async function getAllHouses(req, res) {
  const allHouses = await repository.getAllHouses();
  if (allHouses.length === 0) {
    throw new HTTPError(404, "Houses not found");
  }
  res.status(200).json(allHouses);
}

// get single house
export async function getSingleHouse(req, res) {
  const id = req.params.id;
  const house = await repository.getSingleHouse(id);

  if (house.rowCount === 0) {
    throw new HTTPError(404, "House not found");
  }

  return res.status(200).json(house.rows[0]);
}
