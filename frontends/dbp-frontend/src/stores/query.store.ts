import { useMutation } from 'react-query';
import axios from 'axios';
import * as process from 'process';
export function GetAllQuery() {
  return useMutation(
    'GetAllQuery',
    () => {
      return axios.request({
        method: 'get',
        url: process.env.NX_Backend + 'GetAll'
      });
    }
  );
}

export function AddCustomerQuery() {
  return useMutation(
    'AddCustomerQuery', (data:{
      id: number,
      name: string,
      lastName: string}) => {
      return axios.request({
        method: 'post',
        url: process.env.NX_Backend + 'AddCustomer',
        data: {
          id: data.id,
          name: data.name,
          lastName: data.lastName
        }
      });
    }
  );
}

export function UpdateCustomerQuery() {
  return useMutation(
    'UpdateCustomerQuery', (data:{
      id: number,
      name: string,
      lastName: string}) => {
      return axios.request({
        method: 'patch',
        url: process.env.NX_Backend + 'AddCustomer',
        data: {
          id: data.id,
          name: data.name,
          lastName: data.lastName
        }
      });
    }
  );
}

export function AddPicture() {
  return useMutation(
    'AddPictureQuery', (data:{
      id: number,
      name: string,
      lastName: string}) => {
      return axios.request({
        method: 'post',
        url: process.env.NX_Backend + 'AddPicture',
        data: {
          id: data.id,
          name: data.name,
          lastName: data.lastName
        }
      });
    }
  );
}

export function AddAttractionQuery() {
  return useMutation(
    'AddAttractionQuery', (data:{
      name: string,
      contactNumber: number,
      price: number}) => {
      return axios.request({
        method: 'post',
        url: process.env.NX_Backend + 'AddAttraction',
        data: {
          name: data.name,
          contactNumber: data.contactNumber,
          price: data.price
        }
      });
    }
  );
}

export function UpdateAttractionQuery() {
  return useMutation(
    'UpdateCustomerQuery', (data:{
      name: string,
      contactNumber: number,
      price: number}) => {
      return axios.request({
        method: 'patch',
        url: process.env.NX_Backend + 'AddAttraction',
        data: {
          name: data.name,
          contactNumber: data.contactNumber,
          price: data.price
        }
      });
    }
  );
}

export function AddReservationQuery() {
  return useMutation(
    'AddReservationQuery', (data:{
      customerID: number,
      attName: string,
      date: Date}) => {
      return axios.request({
        method: 'post',
        url: process.env.NX_Backend + 'AddReservation',
        data: {
          customerID: data.customerID,
          attName: data.attName,
          date: data.date.getUTCFullYear() + '/' + data.date.getUTCMonth() + '/' + data.date.getUTCDay()
        }
      });
    }
  );
}
export function GroupReservations() {
  return useMutation(
    'GroupReservationsQuery', (customerID: number) => {
      return axios.request({
        method: 'post',
        url: process.env.NX_Backend + 'GroupReservations',
        data: {
          customerID: customerID,
        }
      });
    }
  );
}

export function ReservationsByRangeQuery() {
  return useMutation(
    'ReservationsByRangeQuery', (data: { customerID: number,firstDate: Date, secondDate: Date}) => {
      return axios.request({
        method: 'post',
        url: process.env.NX_Backend + 'ReservationsByRange',
        data: {
          customerID: data.customerID,
          firstDate:  data.secondDate.getUTCFullYear() + '/' + data.secondDate.getUTCMonth() + '/' + data.secondDate.getUTCDay(),
          //firstDate:  data.firstDate.getUTCFullYear() + '/' + data.firstDate.getUTCMonth() + '/' + data.firstDate.getUTCDay(),
          secondDate:  data.firstDate.getUTCFullYear() + '/' + data.firstDate.getUTCMonth() + '/' + data.firstDate.getUTCDay()
          //secondDate:  data.secondDate.getUTCFullYear() + '/' + data.secondDate.getUTCMonth() + '/' + data.secondDate.getUTCDay()
        }
      });
    }
  );
}

export function GroupByAttractionQuery() {
  return useMutation(
    'GroupByAttractionQuery', (name: string) => {
      return axios.request({
        method: 'post',
        url: process.env.NX_Backend + 'GroupByAttraction',
        data: {
          name: name,
        }
      });
    }
  );}
