import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

// rotas de cars
routes.post('/cars', (req, res, next) => new CarController(req, res, next).create());
routes.get('/cars', (req, res, next) => new CarController(req, res, next).getCars());
routes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getById());
routes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).update());

// rotas de motocycles
routes.post('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).create());

routes.get('/motorcycles', (req, res, next) => 
  new MotorcycleController(req, res, next).getMotorcycles());

routes.get('/motorcycles/:id', (req, res, next) => 
  new MotorcycleController(req, res, next).getById());

routes.put('/motorcycles/:id', (req, res, next) => 
  new MotorcycleController(req, res, next).update());

export default routes;