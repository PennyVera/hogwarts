import * as repository from "../repositories/houses.repository.js";
import HTTPError from "../errorhandler/HTTPError.js";

// get all houses
export const getAllHouses = async (req, res) => {
  const allHouses = await repository.getAllHouses();
  res.json(allHouses);
};

// get single house
export const getSingleHouse = async (req, res) => {
  const id = req.params.id;
  const house = await repository.getSingleHouse(id);

  if (house.rows[0]) {
    return res.status(200).json(house.rows[0]);
  }

  throw new HTTPError(404, "House not found");
};
