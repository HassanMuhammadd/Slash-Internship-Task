import FilterOption from '../filters/FilterOption';
import {formatNumber, handleInputChange} from '../../services/helpers';
import {useProducts} from '../../contexts/ProductsContext';
import {useEffect, useState} from 'react';

//ratings array [1 : 5]
const ratings = Array.from({length: 5}, (_,idx) => idx+1);

export default function FilterOptions({products}) {

	const { getCategories,
			category,
			setCategory,
			rating,
			setRating,
			maxPrice,
			setMaxPrice,
			calculateMinProductPrice,
			calculateMaxProductPrice } = useProducts();

	const [categories,setCategories] = useState([]);

	//getting the categories
	useEffect(()=>{

		const categories = getCategories(products);
		setCategories(categories);

	},[products]);


	//getting min and max product price to be used in the slider
	const minProductPrice = calculateMinProductPrice(products);
	const maxProductPrice = calculateMaxProductPrice(products);


	function handleCategoryChange(e){

		if(e===category)
			setCategory('all');
		else
			setCategory(e);
	}
	function handleRatingChange(e){
		if(e===rating)
			setRating(0)
		else
			setRating(e)
	}

	return (
	<div className='bg-white py-8 px-2 rounded-md boxShadow w-4/5 sm:w-2/5 md:w-full mx-auto'>

		<h4 className='text-center mb-6'>Filters</h4>
		<div className='flex flex-col px-4'>

			<FilterOption title="Brand Category" names={categories} value={category} onChange={(e)=>handleCategoryChange(e)} />
			<FilterOption title="Rating" names={ratings} value={rating} onChange={(e)=>handleRatingChange(e)} />

			<label className='mt-4 mb-2 ps-3 text-start' htmlFor='range'>Max price</label>
			<input
			id='range'
			type='range'
			min={minProductPrice}
			max={maxProductPrice}
			value={maxPrice}
			onChange={(e)=>{
				setMaxPrice(e.target.value);
				handleInputChange(e)}
			}/>

			<span className='text-xs ms-3 mt-2 text-start'>EGP {formatNumber(Number(maxPrice))}</span>
		</div>
	</div>
	)
}
