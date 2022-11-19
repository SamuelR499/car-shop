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
    const carLIst = await carODM.getCars();
    const result = carLIst.map((car) => this.createCarDomain(car));
    return result;
  }

  public async getById(id: string) {
    const carODM = new CarODM();

    if (id.length < 24) {
      throw new HttpException(422, 'Invalid mongo id');
    }

    const car = await carODM.getById(id);

    if (!car) {
      throw new HttpException(404, 'Car not found');
    }

    return this.createCarDomain(car);
  }

  public async update(id: string, car: ICar) {
    const carODM = new CarODM();

    if (id.length < 24) {
      throw new HttpException(422, 'Invalid mongo id');
    }

    await carODM.update(id, car);
    const newCar = await carODM.getById(id);
    if (!newCar) {
      throw new HttpException(404, 'Car not found');
    }
    
    return this.createCarDomain(newCar);
  }
}

export default CarService;