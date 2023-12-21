import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Attraction, Customer, Reservation, useStore } from '../stores/data.store';
import { Button } from 'primereact/button';
import {
  AddAttractionQuery,
  AddCustomerQuery, AddReservationQuery,
  GetAllQuery, GroupByAttractionQuery, GroupReservations,
  UpdateAttractionQuery,
  UpdateCustomerQuery
} from '../stores/query.store';
import process from 'process';
import { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload'
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import GroupByCustomer from '../components/group-by-customer';
import GroupByAttraction from '../components/group-by-attraction';

export interface MainPageProps {}
//Get
let customers: Customer[] = []
let attractions: Attraction[] = []
let reservations: Reservation[] = []

let customersID:number[] = [];
let attractionNames:string[] = [];

// @ts-ignore
function setData(mutate){
  reservations = []
  attractions = []
  customers = []
  customersID = []
  attractionNames = []

  mutate(undefined, {
    // @ts-ignore
    onSuccess: (data) => {
      // @ts-ignore
      data.data.Customers.forEach((customer) => {
        customers.push({
          nationalID: customer.NationalID, name: customer.Name, lastname: customer.LastName,
          image: process.env.NX_Backend + 'assets/' + customer.NationalID + '.png'
        });
        customersID.push(customer.NationalID)
      });

      // @ts-ignore
      data.data.Attractions.forEach((attraction) => {
        attractions.push({
          attName: attraction.Name, phone: attraction.ContactNumber, price: attraction.PricePerKT
        });
        attractionNames.push(attraction.Name)
      });

      // @ts-ignore
      data.data.Reservations.forEach((reservation) => reservations.push({
        nationalID: reservation.CustomerID, attName: reservation.AttName,
        date: (new Date(+reservation.Date)).toDateString()
      }));
    }
  })
}

//Customer

let nName: string | undefined;
let nLastName: string | undefined;
let nId: number | undefined;

//Attraction

let aName: string | undefined;
let aPrice: number | undefined;
let aPhone: number | undefined;

//Attraction
let rDate: Date | undefined;

//Main
function _getAllQuery(){
  const { mutate } = GetAllQuery();
  return mutate;
}
function _addCustomerQuery(){
  const { mutate } = AddCustomerQuery();
  return mutate;
}
function _updateCustomerQuery(){
  const { mutate } = UpdateCustomerQuery();
  return mutate;
}
function _addAttractionQuery(){
  const { mutate } = AddAttractionQuery();
  return mutate;
}
function _updateAttractionQuery(){
  const { mutate } = UpdateAttractionQuery();
  return mutate;
}
function _addReservationQuery(){
  const { mutate } = AddReservationQuery();
  return mutate;
}

function _groupReservations(){
  const { mutate } = GroupReservations();
  return mutate;
}

function _groupByAttractionQuery(){
  const { mutate } = GroupByAttractionQuery();
  return mutate;
}

export function MainPage(props: MainPageProps) {
  const [isUploadble, setIsUploadble] = useState<boolean>(true);
  const [uploadFiles, setUploadFiles] = useState();
  const [rCustomer  , setRCustomer] = useState<number | undefined>(undefined);
  const [rAttraction , setRAttraction] = useState(undefined);

  const { set , setSelectedCustomer, setSelectedAttraction} = useStore();
  const getAllQuery  = _getAllQuery();
  const addCustomerQuery  = _addCustomerQuery();
  const updateCustomerQuery  = _updateCustomerQuery();
  const addAttractionQuery  = _addAttractionQuery();
  const updateAttractionQuery  = _updateAttractionQuery();
  const addReservationQuery  = _addReservationQuery();
  const groupReservations  = _groupReservations();
  const groupByAttractionQuery  = _groupByAttractionQuery();

  useEffect(()=>{
    setData(getAllQuery);
    set(customers,attractions,reservations);
  },[])

  return (
    <div>
      <div className={'w-full grid xl:grid-cols-3 grid-cols-1'}>
        <div className={'m-2 rounded-lg bg-gray-800 p-2 space-y-2'}>
          <div>
            <DataTable scrollable scrollHeight='25rem' stripedRows header={'Customers'} value={customers}
                       selectionMode='single' tableStyle={{ minWidth: '20rem' }}
                       onRowSelect={(e) => {
                         groupReservations(e.data.nationalID,{onSuccess: (data) => {
                             let nationalID = e.data.nationalID;
                             let name = e.data.name;
                             let lastName = e.data.lastName;
                             let atts: string[] = [];
                             let times: number[] = [];
                             for (let i = 0; i < data.data.length; i++) {
                               // @ts-ignore
                               atts.push(data.data[i].AttName);
                               // @ts-ignore
                               times.push(data.data[i].ReservationCount);
                             }
                             setSelectedCustomer({nationalID: nationalID, name: name, lastname: lastName, image: process.env.NX_Backend + 'assets/' + nationalID + '.png'},atts,times)
                           }})
                       }}>
              <Column field='image' body={(data) =>
                <Avatar image={data.image} size={'large'} shape='circle' />} header='Image'></Column>
              <Column field='nationalID' sortable={true} header='National ID'></Column>
              <Column field='name' sortable={true} header='Name'></Column>
              <Column field='lastname' sortable={true} header='Lastname'></Column>
            </DataTable>
            <div className={'flex gap-2 mt-2 mb-2'}>
              <FileUpload url={process.env.NX_Backend + 'AddPicture'} mode='basic' accept={'*/' + nId + '.png'}
                          disabled={isUploadble}
                          onSelect={(files) => {
                            if (nId == undefined || customers.length == 0) setIsUploadble(true);
                            for (const customersKey of customers) {
                              if (customersKey.nationalID == nId) {
                                // @ts-ignore
                                if (files != undefined && files[0] != undefined) {
                                  // @ts-ignore
                                  files[0].name = nId + '.png';
                                  // @ts-ignore
                                  setUploadFiles(files);
                                }
                                setIsUploadble(false);
                                return;
                              }
                            }
                            setIsUploadble(true);
                          }} name={'file'} auto
                          onUpload={() => {
                            setData(getAllQuery);
                            set(customers, attractions, reservations);
                          }} />
              <Button label={'Add or Update'} onClick={() => {
                if (nId != undefined)
                  for (const customersKey of customers) {
                    if (customersKey.nationalID == nId) {
                      // @ts-ignore
                      if (nName == undefined) nName = customersKey.name;
                      if (nLastName == undefined) nLastName = customersKey.lastname;
                      updateCustomerQuery({ id: nId, name: nName, lastName: nLastName }, {
                        onSuccess: (_) => {
                          nName = undefined;
                          nLastName = undefined;
                          setData(getAllQuery);
                          set(customers, attractions, reservations);
                        }
                      });
                      return;
                    }
                  }
                if (nName != undefined && nLastName != undefined) {
                  // @ts-ignore
                  addCustomerQuery({ id: nId, name: nName, lastName: nLastName }, {
                    onSuccess: (_) => {
                      nName = undefined;
                      nLastName = undefined;
                      setData(getAllQuery);
                      set(customers, attractions, reservations);
                    }
                  });
                }
              }} />
              <InputNumber style={{ flexGrow: 1 }} max={9999999999} min={1000000000}
                           value={nId}
                           placeholder={'National ID'}
                           onValueChange={(e) => {
                             if (typeof e.value === 'number') nId = e.value;
                             else nId = undefined;
                             if (nId == undefined || customers.length == 0) setIsUploadble(true);
                             for (const customersKey of customers) {
                               if (customersKey.nationalID == nId) {
                                 // @ts-ignore
                                 if (uploadFiles != undefined && uploadFiles[0] != undefined) uploadFiles[0].name = nId + '.png';
                                 setIsUploadble(false);
                                 return;
                               }
                             }
                             setIsUploadble(true);
                           }} />
            </div>
            <div className={'flex gap-2 mt-2 mb-'}>
              <InputText style={{ flexGrow: 1 }} placeholder={'First Name'} value={nName} onChange={(e) => {
                if (typeof e.target.value === 'string') nName = e.target.value;
                else nName = undefined;
              }} />
              <InputText style={{ flexGrow: 1 }} placeholder={'Last Name'} value={nLastName} onChange={(e) => {
                if (typeof e.target.value === 'string') nLastName = e.target.value;
                else nLastName = undefined;
              }} />
            </div>
          </div>
        </div>
        <div className={'m-2 rounded-lg bg-gray-800 p-2 space-y-2'}>
          <div>
            <DataTable scrollable scrollHeight='25rem' stripedRows header={'Reservation'} value={reservations}
                       tableStyle={{ minWidth: '20rem' }}>
              <Column field='attName' sortable={true} header='Attractions Name'></Column>
              <Column field='nationalID' sortable={true} header='Customer ID'></Column>
              <Column field='date' sortable={true} header='Date'></Column>
            </DataTable>
            <div className={'flex gap-2 mt-2 mb-2'}>
              <Button label={'Add'} onClick={() => {
                if (rDate != undefined && rCustomer != undefined && rAttraction != undefined) {
                  // @ts-ignore
                  addReservationQuery({ customerID: rCustomer, attName: rAttraction, date: rDate }, {
                    onSuccess: () => {
                      rDate = undefined;
                      setData(getAllQuery);
                      set(customers, attractions, reservations);
                    }
                  });
                }
              }} />
              <Dropdown placeholder={'Customer'} options={customersID} value={rCustomer}
                        onChange={(e) => setRCustomer(e.value)} />
              <Dropdown placeholder={'Attraction'} options={attractionNames} value={rAttraction}
                        onChange={(e) => setRAttraction(e.value)} />
              <Calendar style={{ flexGrow: 1 }} placeholder={'Reservation Date'} value={rDate} onChange={(e) => {
                if (e.value) rDate = e.value;
                else rDate = undefined;
              }} />
            </div>
          </div>
        </div>
        <div className={'m-2 rounded-lg bg-gray-800 p-2 space-y-2'}>
          <div>
            <DataTable selectionMode='single' scrollable scrollHeight='25rem' stripedRows header={'Attractions'} value={attractions}
                       tableStyle={{ minWidth: '20rem' }} onRowSelect={(e) => {
                         console.log(e.data)
              groupByAttractionQuery(e.data.attName,{onSuccess: (data) => {
                  let attName = e.data.attName;
                  let customers: string[] = [];
                  let gross: number[] = [];
                  for (let i = 0; i < data.data.length; i++) {
                    // @ts-ignore
                    customers.push(data.data[i].CustomerName + '\n' + data.data[i].CustomerLastName);
                    // @ts-ignore
                    gross.push(data.data[i].TotalCost);
                  }
                  setSelectedAttraction(attName,customers,gross)
                }})
            }}>
              <Column field='attName' sortable={true} header='Attractions Name'></Column>
              <Column field='price' sortable={true} header='Price per 1k T'></Column>
              <Column field='phone' sortable={true} header='Phone number'></Column>
            </DataTable>
              <div className={'flex gap-2 mt-2 mb-2'}>
              <Button style={{ flexGrow: 1 }} label={'Add or Update'} onClick={() => {
                if (aName != undefined)
                  for (const attractionKey of attractions) {
                    if (attractionKey.attName == aName) {
                      // @ts-ignore
                      if (aPhone == undefined) aPhone = attractionKey.phone;
                      if (aPrice == undefined) aPrice = attractionKey.price;
                      updateAttractionQuery({ name: aName, contactNumber: aPhone, price: aPrice }, {
                        onSuccess: (_) => {
                          aPhone = undefined;
                          aPrice = undefined;
                          setData(getAllQuery);
                          set(customers, attractions, reservations);
                        }
                      });
                      return;
                    }
                  }
                if (aPrice != undefined && aPhone != undefined) {
                  // @ts-ignore
                  addAttractionQuery({ name: aName, contactNumber: aPhone, price: aPrice }, {
                    onSuccess: (_) => {
                      aPhone = undefined;
                      aPrice = undefined;
                      setData(getAllQuery);
                      set(customers, attractions, reservations);
                    }
                  });
                }
              }} />
                <InputText style={{ flexGrow: 1, flex: 1 }} placeholder={'Attraction'} value={aName}
                           onChange={(e) => {
                             if (typeof e.target.value === 'string') aName = e.target.value;
                             else aName = undefined;
                           }} />
              </div>
              <div className={'flex gap-2 mt-2 mb-2'}>
                <InputNumber style={{ flexGrow: 1, flex: 1 }} value={aPrice} placeholder={'Price per TK'}
                             onValueChange={(e) => {
                               if (typeof e.target.value === 'number') aPrice = e.target.value;
                               else aPrice = undefined;
                             }} />
                <InputNumber style={{ flexGrow: 1, flex: 1 }} max={9999999999} min={9000000000} value={aPhone}
                             placeholder={'PhoneNumber'}
                             onValueChange={(e) => {
                               if (typeof e.target.value === 'number') aPhone = e.target.value;
                               else aPhone = undefined;
                             }} />
            </div>
          </div>
        </div>
      </div>
      <div className={'w-full grid xl:h-fit xl:grid-cols-5 grid-cols-1'}>
        <div className={'col-span-3'}>
        <GroupByCustomer />
        </div>
        <div className={'col-span-2'}>
          <GroupByAttraction />
        </div>
      </div>
    </div>
  );

}

export default MainPage;
