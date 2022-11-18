import ICar from '../Interfaces/ICar';

class Car {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.buyValue = car.buyValue;
    this.status = car.status || false;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public setId(value: string | undefined) {
    this.id = value;
  }

  public getModel(): string {
    return this.model;
  }
  public setModel(value: string) {
    this.model = value;
  }

  protected getYear(): number {
    return this.year;
  }
  protected setYear(value: number) {
    this.year = value;
  }
  protected getColor(): string {
    return this.color;
  }
  protected setColor(value: string) {
    this.color = value;
  }

  protected getStatus(): boolean {
    return this.status;
  }
  protected setStatus(value: boolean) {
    this.status = value;
  }

  protected getBuyValue(): number {
    return this.buyValue;
  }
  protected setBuyValue(value: number) {
    this.buyValue = value;
  }

  public getDoorsQty(): number {
    return this.doorsQty;
  }
  public setDoorsQty(value: number) {
    this.doorsQty = value;
  }

  public getSeatsQty(): number {
    return this.seatsQty;
  }
  public setSeatsQty(value: number) {
    this.seatsQty = value;
  }
}

export default Car;
