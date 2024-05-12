import fetch from "node-fetch";
const foodTrucksDataUrl = 'https://data.sfgov.org/api/id/rqzj-sfat.json';

/**
 * Get all food trucks
 * @param {number} limit to limit the number of food trucks
 * @param {number} offset for pagination
 * @returns {Array} Returns an array of food trucks
 */
export const getAllFoodTrucks = async (offset, limit) => {
  const params = new URLSearchParams({
    $query: `select *, :id offset ${offset} limit ${limit}`,
  });

  const response = await fetch(`${foodTrucksDataUrl}?${params}`);
  return response.json();
}

/**
 * Get a food truck by objectid
 * @param {number} id objectid of the food truck
 * @returns {Object | undefined} Returns food truck or undefined if is not found
 */
export const getFoodTruckById = async (id) => {
  const params = new URLSearchParams({
    $query: `select *, :id where (\`objectid\` = ${id})`,
  });
  const response = await fetch(`${foodTrucksDataUrl}?${params}`);
  return response.json();
}

/**
 * Get food truck if found, performs search fooditems and applicant fields, example 'taco' (food type) or 'Truly' (food truck name)
 * @param {string} searchValue value of the search
 * @returns {Array} Returns an array of food trucks if any is found or empty array if not found
 */
export const searchFoodTruck =  async (searchValue) => {
  const params = new URLSearchParams({
    $query: `select *, :id where ((contains(upper(\`fooditems\`), upper('${searchValue}'))) or (contains(upper(\`applicant\`), upper('${searchValue}'))))`,
  });
  const response = await fetch(`${foodTrucksDataUrl}?${params}`);
  return response.json();
}
