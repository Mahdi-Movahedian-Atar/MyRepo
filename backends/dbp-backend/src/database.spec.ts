import process from "process";
import {
  AddAttraction,
  AddCustomer,
  AddReservations, GroupByAttraction,
  GroupReservations, ReservationsByRange,
  UpdateAttraction,
  UpdateCustomer
} from './database.sql';

describe("DataBaseTest", ()=>{
  it('Add Customer', function () {
    require('dotenv').config();
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(process.env.DATABASE_URL);
    db.serialize(()=>{

      db.run(AddCustomer,[2000,'a','a']);

      db.get("SELECT Name FROM Customers WHERE NationalID = ?",[200],(err, row) =>{
        db.close()
        expect(row.Name).toEqual("a")
      })
    });
  },5000);

  it('Update Customer', function () {
    require('dotenv').config();
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(process.env.DATABASE_URL);
    db.serialize(()=>{

      db.run(UpdateCustomer,['b','b',200]);

      db.get("SELECT Name FROM Customers WHERE NationalID = ?",[200],(err, row) =>{
        db.close()
        expect(row.Name).toEqual("b")
      })
    });
  },5000);

  it('Add Attraction', function () {
    require('dotenv').config();
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(process.env.DATABASE_URL);
    db.serialize(()=>{

      db.run(AddAttraction,['sss',200,200]);

      db.get("SELECT ContactNumber FROM Attractions WHERE Name = ?",['sss'],(err, row) =>{
        db.close()
        expect(row.Name).toEqual("a")
      })
    });
  },5000);

  it('Update Attraction', function () {
    require('dotenv').config();
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(process.env.DATABASE_URL);
    db.serialize(()=>{

      db.run(UpdateAttraction,[111,111,'sss']);

      db.get("SELECT Name FROM Customers WHERE NationalID = ?",['sss'],(err, row) =>{
        db.close()
        expect(row.ContactNumber).toEqual(111)
      })
    });
  },5000);

  it('Add Reservations', function () {
    require('dotenv').config();
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(process.env.DATABASE_URL);
    db.serialize(()=>{

      db.run(AddReservations,[1,"sss",Date.now().toString()]);

      db.all("SELECT CustomerID FROM Reservations WHERE AttName = ?",['sss'],(err, row) =>{
        db.close()
        expect(row[0].CustomerID).toEqual(1)
      })
    });
  },5000);

  it('Group Reservations', function () {
    require('dotenv').config();
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(process.env.DATABASE_URL);
    db.serialize(()=>{
      db.all(GroupReservations,[1],(err, row) =>{
        db.close()
        expect(row[0].ReservationCount).toEqual(4)
      })
    });
  },5000);

  it('Reservations By Range', function () {
    require('dotenv').config();
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(process.env.DATABASE_URL);
    db.serialize(()=>{
      db.all(ReservationsByRange,[1,"1702566079514","2702566079514"],(err, rows) =>{
        db.close()
        expect(rows[0].AttName).toEqual("sss")
      })
    });
  },5000);

  it('Group By Attraction', function () {
    require('dotenv').config();
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(process.env.DATABASE_URL);
    db.serialize(()=>{
      db.all(GroupByAttraction,["sss"],(err, rows) =>{
        db.close()
        expect(rows[0].CustommerName).toEqual("a")
      })
    });
  },5000);
})
