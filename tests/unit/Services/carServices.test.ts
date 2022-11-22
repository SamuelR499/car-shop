import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import { carsArray, carMock, updateMock } from './mocks/carsMocks';

describe('Testando a service de carService', function () {
  describe('Teste para a rota post "/cars"', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Deve criar um car com SUCESSO', async function () {
      const carInput: ICar = {
        model: 'tesla',
        year: 2030,
        color: 'Branco',
        status: true,
        buyValue: 20.0,
        doorsQty: 4,
        seatsQty: 2,
      };
    
      const carOutput: Car = new Car({
        id: '6348513f34c397abcad040b2',
        model: 'tesla',
        year: 2030,
        color: 'Branco',
        status: true,
        buyValue: 20.0,
        doorsQty: 4,
        seatsQty: 2,
      });
      sinon.stub(Model, 'create').resolves(carOutput);
      const service = new CarService();
      const result = await service.addCar(carInput);
  
      expect(result).to.be.deep.equal(carOutput);
    });

    it('Se não for preenchido os campo retorna null', async function () {
      const carInput: ICar = {
        model: 'tesla',
        year: 2030,
        color: 'Branco',
        status: true,
        buyValue: 20.0,
        doorsQty: 4,
        seatsQty: 2,
      };
    
      sinon.stub(Model, 'create').resolves(false);
      const service = new CarService();
      const result = await service.addCar(carInput);
  
      expect(result).to.be.equal(null);
    });
  });

  describe('Teste para a rota get "/cars"', function () {
    it('Deveria trazer todos os carros em um array de objetos', async function () {
      const carList = carsArray.map((car) => new Car(car));
      sinon.stub(Model, 'find').resolves(carList);
      const service = new CarService();
      const result = await service.getCars();
      expect(result).to.be.deep.equal(carList);
    });
  });

  describe('Teste para a rota get "/cars/:id"', function () {
    it('Em caso de sucesso devera retornar o objeto encontrado, pelo id', async function () {
      const car = new Car(carMock);
      sinon.stub(Model, 'findOne').resolves(carMock);
      const service = new CarService();
      const result = await service.getById('a377f5d31857dff63d3faa2b');
      expect(result).to.be.deep.equal(car);
    });

    it('Quando o id é inválida, devera lançar um erro "Invalid mongo id"', async function () {
      sinon.stub(Model, 'findOne').resolves(null);

      try {
        const service = new CarService();
        await service.getById('menosDe24Car');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('Em caso de id incorreto Deveria lançar um erro "Car not found"', async function () {
      sinon.stub(Model, 'findOne').resolves(null);

      try {
        const service = new CarService();
        await service.getById('esteIdIvalidoDeveDarErro');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
      }
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Teste para a rota update "/cars/:id"', function () {
    it('Em caso de sucesso deveria trazer o novo carro especifico, pelo id', async function () {
      const car = new Car(carMock);
      const service = new CarService();

      sinon.stub(Model, 'updateOne').resolves(updateMock);
      sinon.stub(Model, 'findOne').resolves(carMock);
      const result = await service.update(carMock.id, carMock);
      expect(result).to.be.deep.equal(car);
    });

    it('Quando o id é inválida, deveria lançar um erro "Invalid mongo id"', async function () {
      sinon.stub(Model, 'findOne').resolves(null);
      try {
        const service = new CarService();
        await service.update('menosDe24Car', carMock);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('Em caso de id incorreto Deveria lançar um erro "Car not found"', async function () {
      sinon.stub(Model, 'updateOne').resolves({
        acknowledged: true,
        modifiedCount: 0,
        upsertedId: '637bf2bd65e9c62bf204c7d1' as any,
        upsertedCount: 0,
        matchedCount: 0,
      });
      sinon.stub(Model, 'findOne').resolves(null);
      const carInput: ICar = {
        model: 'tesla',
        year: 2030,
        color: 'Branco',
        status: true,
        buyValue: 20.0,
        doorsQty: 4,
        seatsQty: 2,
      };

      try {
        const service = new CarService();
        await service.update('637bf2bd65e9c62bf204c7d1', carInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
      }
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
