import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Products from '../products/Products';
import {ProductsProvider} from '../../contexts/ProductsContext';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 10 * 1000, // 10 minutes
		}
	}
});

export default function ProductsQueryProvider() {

	//The Holder of the products, including the context provider and query provider

	return (
	<ProductsProvider>
		<QueryClientProvider client={queryClient}>
			<Products/>
		</QueryClientProvider>
	</ProductsProvider>
	)
}
