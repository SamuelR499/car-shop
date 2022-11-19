import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import HttpException from '../Middleware/HTTPexception';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async addCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getCars() {
    const carODM = new CarODM();
    const carList = await carODM.find();
    const result = carList && carList.map((car) => this.createCarDomain(car));
    return result;
  }

  public async getById(id: string) {
    const carODM = new CarODM();

    if (id.length < 24) {
      throw new HttpException(422, 'Invalid mongo id');
    }

    const car = await carODM.findOne(id);

    return this.createCarDomain(car);
  }

  public async update(id: string, car: ICar) {
    const carODM = new CarODM();

    if (id.length < 24) {
      throw new HttpException(422, 'Invalid mongo id');
    }

    const newCar = await carODM.update(id, car);
    if (!newCar) {
      throw new HttpException(404, 'Car not found');
    }
    
    return this.createCarDomain(newCar);
  }
}

export default CarService;