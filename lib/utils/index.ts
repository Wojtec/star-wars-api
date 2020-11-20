import { Fetch } from "../actions";

export class Utils {
  private fetch: Fetch = new Fetch();
  private minPeople: number = 1;

  public getHero = async () => {
    const people: any = await this.fetch.getPeople();
    const { count }: { count: number } = people;
    console.log(count);
    const setHero = Math.floor(
      Math.random() * (count - this.minPeople) + this.minPeople
    );
    console.log(setHero);
    return setHero;
  };
}
