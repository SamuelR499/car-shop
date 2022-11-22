import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import { motorcycleMock, motorcyclesArray, updateMock } from './mocks/motorcyclesMocks';

describe('Testando a service de motorcycleService', function () {
  describe('Teste para a rota post "/motorcycles"', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Deve criar uma motorcycle com SUCESSO', async function () {
      const motorcycleInput: IMotorcycle = {
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
    
      const motorcycleOutput: Motorcycle = new Motorcycle({
        id: '6348513f34c397abcad040b2',
        model: 'tesla',
        year: 2030,
        color: 'Branco',
        status: true,
        buyValue: 20.0,
        category: 'Street',
        engineCapacity: 600,
      });
      sinon.stub(Model, 'create').resolves(motorcycleOutput);
      const service = new MotorcycleService();
      const result = await service.create(motorcycleInput);
  
      expect(result).to.be.deep.equal(motorcycleOutput);
    });

    it('Se não for preenchido os campo retorna null', async function () {
      const motorcycleInput: IMotorcycle = {
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
    
      sinon.stub(Model, 'create').resolves(false);
      const service = new MotorcycleService();
      const result = await service.create(motorcycleInput);
  
      expect(result).to.be.equal(null);
    });
  });

  describe('Teste para a rota get "/motorcycles"', function () {
    it('Deveria trazer todas as motos em um array de objetos', async function () {
      const motorcycleList = motorcyclesArray.map((motorcycle) => new Motorcycle(motorcycle));
      sinon.stub(Model, 'find').resolves(motorcycleList);
      const service = new MotorcycleService();
      const result = await service.getMotorcycles();
      expect(result).to.be.deep.equal(motorcycleList);
    });
  });

  describe('Teste para a rota get "/motorcycles/:id"', function () {
    it('Em caso de sucesso devera retornar o objeto encontrado, pelo id', async function () {
      const motorcycle = new Motorcycle(motorcycleMock);
      sinon.stub(Model, 'findOne').resolves(motorcycle);
      const service = new MotorcycleService();
      const result = await service.getById('634852326b35b59438fbea2f');
      expect(result).to.be.deep.equal(motorcycle);
    });

    it('Quando o id é inválida, devera lançar um erro "Invalid mongo id"', async function () {
      sinon.stub(Model, 'findOne').resolves(null);

      try {
        const service = new MotorcycleService();
        await service.getById('menosDe24moto');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('Em caso de id incorreto Deveria lançar um erro "Motorcycle not found"', async function () {
      sinon.stub(Model, 'findOne').resolves(null);

      try {
        const service = new MotorcycleService();
        await service.getById('esteIdIvalidoDeveDarErro');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Teste para a rota update "/motorcycles/:id"', function () {
    it('Em caso de sucesso deveria trazer a nova moto especifica, pelo id', async function () {
      const motorcycle = new Motorcycle(motorcycleMock);
      const service = new MotorcycleService();

      sinon.stub(Model, 'updateOne').resolves(updateMock);
      sinon.stub(Model, 'findOne').resolves(motorcycle);
      const result = await service.update(motorcycleMock.id, motorcycleMock);
      expect(result).to.be.deep.equal(motorcycle);
    });

    it('Quando o id é inválida, deveria lançar um erro "Invalid mongo id"', async function () {
      sinon.stub(Model, 'findOne').resolves(null);
      try {
        const service = new MotorcycleService();
        await service.update('menosDe24moto', motorcycleMock);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('Em caso de id incorreto Deveria lançar um erro "Motorcycle not found"', async function () {
      sinon.stub(Model, 'updateOne').resolves({
        acknowledged: true,
        modifiedCount: 0,
        upsertedId: '637bf2bd65e9c62bf204c7d1' as any,
        upsertedCount: 0,
        matchedCount: 0,
      });
      sinon.stub(Model, 'findOne').resolves(null);
      const motorcycleInput: IMotorcycle = {
        model: 'Hoda cb 600f Hornet',
        year: 2010,
        color: 'Branca',
        status: true,
        buyValue: 20.1,
        category: 'Street',
        engineCapacity: 600,
      };

      try {
        const service = new MotorcycleService();
        await service.update('637bf2bd65e9c62bf204c7d1', motorcycleInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});