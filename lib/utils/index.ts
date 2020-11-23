import { Fetch } from "../actions";

export class Utils {
  private fetch: Fetch = new Fetch();
  private minPeople: number = 1;

  //Get hero number
  public getHero = async (): Promise<object | undefined> => {
    try {
      const people: any = await this.fetch.getPeople();
      const { count }: { count: number } = people;
      const heroId: number = Math.floor(
        Math.random() * (count - this.minPeople) + this.minPeople
      );
      const setHero = await this.fetch.findHero(heroId);

      return setHero;
    } catch (err) {
      console.log(err);
    }
  };

  public compareId = (heroUrl: Array<string> | string, id: string) => {
    if (Array.isArray(heroUrl)) {
      const heroId = heroUrl.map((url) => {
        const urlSplit = url.split("/");
        const heroId = urlSplit[urlSplit.length - 2];
        return heroId;
      });
      const compareId = heroId.indexOf(id.toString()) >= 0;
      return compareId;
    } else {
      const urlSplit = heroUrl.split("/");
      const heroId = urlSplit[urlSplit.length - 2];
      return heroId === id ? true : false;
    }
  };
}
