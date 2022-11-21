import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';
import HttpException from '../Middleware/HTTPexception';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const mootorcycleList = await motorcycleODM.find();

    const result = mootorcycleList && mootorcycleList.map(
      (motorcycle) => this.createMotorcycleDomain(motorcycle),
    );
    return result;
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();

    if (id.length < 24) {
      throw new HttpException(422, 'Invalid mongo id');
    }
    
    const motorcycle = await motorcycleODM.findOne(id);
    if (!motorcycle) throw new HttpException(404, 'Motorcycle not found');

    return this.createMotorcycleDomain(motorcycle);
  }

  public async update(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    if (id.length < 24) {
      throw new HttpException(422, 'Invalid mongo id');
    }

    await motorcycleODM.update(id, motorcycle);

    const newMotorcycle = await motorcycleODM.findOne(id);
    if (!newMotorcycle) throw new HttpException(404, 'Motorcycle not found');
    
    return this.createMotorcycleDomain(newMotorcycle);
  }
}

export default MotorcycleService;