import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private engineCapacity: number;
  private category: string;

  constructor(moto: IMotorcycle) {
    super(moto);
    this.id = moto._id;
    this.model = moto.model;
    this.year = moto.year;
    this.color = moto.color;
    this.buyValue = moto.buyValue;
    this.status = moto.status || false;
    this.engineCapacity = moto.engineCapacity;
    this.category = moto.category;
  }

  public getEngineCapacity(): number {
    return this.engineCapacity;
  }
  public setEngineCapacity(value: number) {
    this.engineCapacity = value;
  }
  public getCategory(): string {
    return this.category;
  }
  public setCategory(value: string) {
    this.category = value;
  }
}

export default Motorcycle;