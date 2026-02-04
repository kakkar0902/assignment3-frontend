import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
<StrictMode>
<QueryClientProvider client={queryClient}>
<BrowserRouter>
<AppRoutes /> { /* Children prop component */}
</BrowserRouter>
<ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
</StrictMode>,

)
 