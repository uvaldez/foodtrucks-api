import express from 'express';
import cors from 'cors';
import { isNumber } from './utils/index.js';
import FoodTruck from './services/foodTruck/index.js';
import { checkCachedData, getCacheKey, saveToCache } from './middleware.js';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from './utils/constants.js';

const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.listen(
  PORT,
  () => console.log(`Application running at port: ${PORT}`),
);

const foodTruckService = new FoodTruck();
/**
 * /food-trucks?limit=100&offset=0
 * Get all food trucks
 */
app.get('/food-trucks', checkCachedData, async (req, res) => {
  const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = req.query;
  if (!isNumber(parseInt(limit, 10)) || !isNumber(parseInt(offset, 10))) {
    res.status(400).send({
      message: 'Invalid Request',
    });
    return;
  }
  try {
    const data = await foodTruckService.getAllFoodTrucks(offset, limit);
    const cacheKey = getCacheKey(req);
    await saveToCache(cacheKey, data);
    res.status(200).send(data);
    return;
  } catch(e){
    res.status(500).send({ message: e.message });
    return;
  }
});

/**
 * /food-trucks/123
 * Get food truck by id
 */
app.get('/food-trucks/:id', checkCachedData, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await foodTruckService.getFoodTruckById(id);
    if (!data) {
      res.status(404).send({
        message: `Food truck id ${id} not found`,
      });
      return;
    }
    const cacheKey = getCacheKey(req);
    await saveToCache(cacheKey, data);
    res.status(200).send(data);
    return;
  } catch (e) {
    res.status(500).send({ message: e.message });
    return;
  }
});

/**
 * /food-trucks/search
 * body: { searchValue: 'taco' }
 * Search food truck
 */
app.post('/food-trucks/search', checkCachedData, async (req, res) => {
  const { searchValue } = req.body;
  if (!searchValue) {
    res.status(400).send({
      message: 'Invalid Request',
    });
    return;
  }
  try {
    const data = await foodTruckService.searchFoodTruck(searchValue);
    const cacheKey = getCacheKey(req);
    await saveToCache(cacheKey, data);
    res.status(200).send(data);
    return;
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }
});
