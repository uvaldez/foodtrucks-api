import NodeCache from 'node-cache';
import { DEFAULT_LIMIT, DEFAULT_OFFSET, CACHE_TTL } from './utils/constants.js';

const nodeCache = new NodeCache();

export const checkCachedData = (req, res, next) => {
  const cacheKey = getCacheKey(req);
  const cachedData = nodeCache.get(cacheKey);
  if (cachedData) {
    res.send(cachedData);
  } else {
    next();
  }
}

export const saveToCache = (key, data) => {
  // cache for one hour
  nodeCache.set(key, data, CACHE_TTL);
}


export const getCacheKey = (req) => {
  const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = req.query;
  let cacheKey = `${limit}:${offset}`;
  const { id } = req.params;
  if (id) {
    cacheKey = `${id}`;
  } else if (req.originalUrl.indexOf('search') > -1) {
    const { searchValue } = req.body;
    cacheKey = `${searchValue}`;
  }

  return cacheKey;
}