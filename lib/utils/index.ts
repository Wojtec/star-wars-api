import { Fetch } from "../actions";

export class Utils {
  private fetch: Fetch = new Fetch();
  private minPeople: number = 1;

  //Get hero number
  public getHero = async (): Promise<object> => {
    const people: any = await this.fetch.getPeople();
    const { count }: { count: number } = people;
    const heroId: number = Math.floor(
      Math.random() * (count - this.minPeople) + this.minPeople
    );
    const setHero = await this.fetch.findHero(heroId);

    return setHero;
  };
}
