import NodeCache from "node-cache"; // Import node cache from package.

// Export class Cache.
export class Cache {
  // Set time for cache mechanism.
  public cache = new NodeCache({ stdTTL: 60 * 60 * 24 });
  // Method get cache with two parameters, key and callback storefunction.
  public get = async (key: string | number, storeFunction: Function) => {
    // Get data from cache by key parameter.
    const value = await this.cache.get(key);
    // If value is true return data from cache.
    if (value) {
      return value;
    }
    // If cache doesn't have data, call a callback to get data and store in cache.
    const store = await storeFunction();
    if (store) {
      this.cache.set(key, store);
      return store;
    }
  };
  // Delete data from cache by key.
  public delete = (keys: string) => {
    this.cache.del(keys);
  };
  // Delete all data from cache.
  public flush = () => {
    this.cache.flushAll();
  };
}
