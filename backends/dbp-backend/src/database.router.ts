import { Router } from 'express';
import {
  AddAttractionValidation,
  AddCustomerValidation,
  AddReservationValidation, GroupByAttractionValidation,
  GroupReservationsValidation, ReservationsByRangeValidation
} from './database.validator';
import { accountController } from './database.controller';
import { upload } from './database.helpers';

export const databaseRouter: Router = Router();

databaseRouter.get('/GetAll', accountController.GetAll);
databaseRouter.post('/AddPicture',upload.single('file') ,accountController.AddPicture);
databaseRouter.post('/AddCustomer',AddCustomerValidation,accountController.AddCustomer);
databaseRouter.patch('/AddCustomer',AddCustomerValidation,accountController.UpdateCustomer);
databaseRouter.post('/AddAttraction',AddAttractionValidation,accountController.AddAttraction);
databaseRouter.patch('/AddAttraction',AddAttractionValidation,accountController.UpdateAttraction);
databaseRouter.post('/AddReservation',AddReservationValidation,accountController.AddReservation);
databaseRouter.post('/GroupReservations',GroupReservationsValidation,accountController.GroupReservations);
databaseRouter.post('/ReservationsByRange',ReservationsByRangeValidation,accountController.ReservationsByRange);
databaseRouter.post('/GroupByAttraction',GroupByAttractionValidation,accountController.GroupByAttraction);
