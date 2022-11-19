import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;

  constructor(vehicle: IVehicle) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.buyValue = vehicle.buyValue;
    this.status = vehicle.status || false;
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
}

export default Vehicle;