import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import { carsArray, carMock } from './carsMocks';

describe('testando a service de carService', function () {
  describe('teste para a rota post "/cars"', function () {
    it('deve criar um car com SUCESSO', async function () {
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
  });

  describe('teste para a rota get "/cars"', function () {
    it('deveria trazer todos os carros em um array de objetos', async function () {
      const carList = carsArray.map((car) => new Car(car));
      sinon.stub(Model, 'find').resolves(carList);
      const service = new CarService();
      const result = await service.getCars();
      expect(result).to.be.deep.equal(carList);
    });
  });

  describe('teste para a rota get "/cars/:id"', function () {
    it('Em caso de sucesso deveria trazer um carro especifico pelp id', async function () {
      const car = new Car(carMock);
      sinon.stub(Model, 'findOne').resolves(carMock);
      const service = new CarService();
      const result = await service.getById('a377f5d31857dff63d3faa2b');
      expect(result).to.be.deep.equal(car);
    });

    it(' em caso de falha Deveria lançar uma exceção quando o id é inválida', async function () {
      sinon.stub(Model, 'findOne').resolves({});

      try {
        const service = new CarService();
        await service.getById('invalid31857dff63d3faa2b');
      } catch (error) {
        expect((error as Error).message).not.to.be.equal('Invalid Key!');
      }
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});
