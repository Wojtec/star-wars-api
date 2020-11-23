import NodeCache from "node-cache";

export class Cache {
  public cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

  public get = async (key: string | number, storeFunction: Function) => {
    const value = await this.cache.get(key);

    if (value) {
      return value;
    }

    const store = await storeFunction();
    if (store) {
      this.cache.set(key, store);
      return store;
    }
  };

  public delete = (keys: string) => {
    this.cache.del(keys);
  };

  public flush = () => {
    this.cache.flushAll();
  };
}
