import  {useState} from 'react'
import {useWindowResize} from '../../hooks/useWindowResize';
import FilterOptions from '../filters/FilterOptions';
import { useQuery } from '@tanstack/react-query';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import {useProducts} from '../../contexts/ProductsContext';
import Button from '../UI/Button';


export default function Products() {
	const [showFilters,setShowFilters] = useState(false);
	const screenWidth = useWindowResize(setShowFilters,1024);
	const {getProducts,filterProducts} = useProducts();

	//intial viewing limit of products - 12 Item Pagination
	const [limit,setLimit] = useState(12);

	//get the products
	const {data:products, isLoading, isError} = useQuery({
		queryKey: ['products'],
		queryFn:  getProducts,
	});

	//loading and error states
	if(isLoading) return <Loading/>

	if(isError)	return <Error/>

	return (
	<div className=' min-h-[calc(100vh-80px)] flex flex-col items-center md:items-start lg:flex-row p-4 bg-stone-100 sm:p-8 md:p-12 lg:p-16  gap-4'>

		{/* Filters tab goes to the side on large screens, on small screens it is hidden or shows on click at the top */}
		<div className="flex-none w-full text-center lg:w-1/5 ">
			{screenWidth<1024 && <button onClick={()=>setShowFilters(!showFilters)} className=''>{showFilters?'Hide':'Show'} Filters</button>}
			{(showFilters || screenWidth===1024)  && <FilterOptions products={products}/>}
		</div>

		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3	 w-4/5 md:w-full ms-0 lg:ms-8 gap-x-6 gap-y-8'>
			{/* Filter products and return the filtered components */}
			{filterProducts(products,limit)}

			{/* Show the load more button if the loaded products are less than the actual products */}
			{limit < products.length && <div className="col-span-1 sm:col-span-2 md:col-span-3 mx-auto">
				<Button text="Load More" onClick={() => setLimit(limit + 12)}>Load More</Button>
			</div>}
		</div>
	</div>
	)
}
