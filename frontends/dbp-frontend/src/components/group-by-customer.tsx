import {Image} from 'primereact/image';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { useStore } from '../stores/data.store';
import { Simulate } from 'react-dom/test-utils';
import { ReservationsByRangeQuery } from '../stores/query.store';
import { useEffect, useRef, useState } from 'react';
import process from 'process';


export function GroupByCustomer() {
  const {selectedCustomer, setSelectedCustomer } = useStore();
  const { mutate } = ReservationsByRangeQuery();

  let [Dates, setDates] = useState<Date[]>()

  return (
    <div className={'grid grid-cols-2 m-2 rounded-lg bg-gray-800 p-2 space-y-2 gap-2'}>
      <div>
        <Card title={ selectedCustomer.customer != undefined ?
          selectedCustomer.customer.name + ' ' + selectedCustomer.customer.lastname + '\n' + selectedCustomer.customer.nationalID :
          'Please select' + ' an customer' }>
          <div className={'w-96'}>
            <Image src={selectedCustomer.customer?.image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </Card>
      </div>
      <div className={'grid grid-cols-1'}>
        <Calendar value={Dates} style={{flexGrow: 1}} selectionMode='range' onChange={(e)=> {
          // @ts-ignore
          if (selectedCustomer.customer != undefined && Dates != undefined && e.value.length == 2){
            // @ts-ignore
            mutate({ customerID: selectedCustomer.customer.nationalID, firstDate: e.value[0], secondDate: e.value[1] },{onSuccess: (data) => {
                // @ts-ignore
                let nationalID = selectedCustomer.customer.nationalID;
                // @ts-ignore
                let name = selectedCustomer.customer.name;
                // @ts-ignore
                let lastName = selectedCustomer.customer.lastname;
                let atts: string[] = [];
                let times: number[] = [];
                for (let i = 0; i < data.data.length; i++) {
                  // @ts-ignore
                  if(atts.indexOf(data.data[i].AttName) != -1) {
                    times[atts.indexOf(data.data[i].AttName)] += 1;
                  }else {
                    atts.push(data.data[i].AttName);
                    times.push(1);
                  }
                }
                setSelectedCustomer({nationalID: nationalID, name: name, lastname: lastName, image: process.env.NX_Backend + 'assets/' + nationalID + '.png'},atts,times)
              }});}// @ts-ignore
          setDates(e.value);
        }}/>

        <Chart type='bar' data={{
          labels: selectedCustomer.places
          , datasets: [
            {
              label: 'Times reserved',
              data: selectedCustomer.timesReserved
            }
          ]
        }} />
      </div>
    </div>
  );

}

export default GroupByCustomer;
