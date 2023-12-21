import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import 'express-fileupload'
import {
  AddAttraction,
  AddCustomer,
  AddReservations, GroupByAttraction,
  GroupReservations, ReservationsByRange,
  UpdateAttraction,
  UpdateCustomer
} from './database.sql';
import { GetAllPromise, GetRunPromise } from './database.helpers';

class DatabaseController {
  public async AddPicture(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file;

      // Check if a file was provided
      if (!file) {
        return res.status(400).send('No file uploaded.').json(req);
      }

      // File details (e.g., name, size, mimetype)
      const fileInfo = {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      };

      res.json({ success: true, message: 'File uploaded successfully', file: fileInfo });
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
  public async GetAll(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({
        Customers: await GetAllPromise("SELECT * FROM Customers", []),
        Attractions: await GetAllPromise("SELECT * FROM Attractions", []),
        Reservations: await GetAllPromise("SELECT * FROM Reservations", [])
      });

    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
  public async AddCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      res.status(200).json(await GetRunPromise(AddCustomer,[req.body.id,req.body.name,req.body.lastName]))

      return res;

    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
  public async UpdateCustomer(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return res.status(200).json(await GetRunPromise(UpdateCustomer,[req.body.name,req.body.lastName,req.body.id]));

    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
  public async AddAttraction(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return res.status(200).json(await GetRunPromise(AddAttraction,[req.body.name,req.body.contactNumber,req.body.price]));

    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
  public async UpdateAttraction(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return res.status(200).json(await GetRunPromise(UpdateAttraction,[req.body.contactNumber,req.body.price,req.body.name]));

    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
  public async AddReservation(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return res.status(200).json(await GetRunPromise(AddReservations,[req.body.customerID,req.body.attName,(new Date(req.body.date)).getTime().toString()]));
    } catch (e) {
      return res.json({ warning: 'Internal Server Error'}).status(500);
    }
  }
  public async GroupReservations(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return res.status(200).json(await GetAllPromise(GroupReservations,[req.body.customerID]));
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
  public async ReservationsByRange(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return res.status(200).json(
        await GetAllPromise(ReservationsByRange,
          [req.body.customerID,(new Date(req.body.secondDate)).getTime().toString(),(new Date(req.body.firstDate)).getTime().toString()]));
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
  public async GroupByAttraction(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      return res.status(200).json(
        await GetAllPromise(GroupByAttraction,
          [req.body.name]));
    } catch (e) {
      return res.json({ warning: 'Internal Server Error' }).status(500);
    }
  }
}

export const accountController = new DatabaseController();
