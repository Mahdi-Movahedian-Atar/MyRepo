import { Card } from 'primereact/card';
import { useStore } from '../stores/data.store';
import { Chart } from 'primereact/chart';

export function GroupByAttraction() {
  const {selectedAttraction, setSelectedAttraction } = useStore();

  return (
    <div className={'grid grid-cols-1 m-2 rounded-lg bg-gray-800 p-2 space-y-2 gap-2'}>
      <Card title={ selectedAttraction.attraction != undefined ? selectedAttraction.attraction : 'Please select an attraction'}>
        <Chart type='bar' data={{
          labels: selectedAttraction.names
          , datasets: [
            {
              label: 'Gross per TK',
              data: selectedAttraction.gross
            }
          ]
        }} />
      </Card>
    </div>
  );
}

export default GroupByAttraction;
