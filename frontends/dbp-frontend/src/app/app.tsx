
import { PrimeReactProvider } from 'primereact/api';
import "frontends/dbp-frontend/src/styles.css"
import MainPage from '../pages/main-page';
import {  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <div>
          <MainPage />
        </div>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;

/*if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const { it, expect, beforeEach } = import.meta.vitest;
  let render: typeof import('@testing-library/react').render;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Welcome frontends-dbp-frontend/gi)).toBeTruthy();
  });
}*/
