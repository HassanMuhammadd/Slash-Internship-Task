import {createContext, useContext, useEffect, useState} from "react";
import ProductCard from "../components/products/ProductCard";

const ProductContext = createContext();

function ProductsProvider({children})
{
	const [category,setCategory] = useState('all');
	const [maxPrice,setMaxPrice] = useState('0');
	const [rating,setRating] = useState(0);
	//effect to get the maximum price to be used in the price slider
	useEffect(()=>{
		async function assignValueToMaxPrice(){
			const products = await getProducts();
			setMaxPrice(()=>calculateMaxProductPrice(products));
		}
		assignValueToMaxPrice();
	},[])


	//getting the minimum product price
	function calculateMinProductPrice(products){
		let minPrice = 1000000;
		for(let i=0;i<products.length;i++){
			for(let j = 0;j<products[i].ProductVariations.length;j++)
			{
				if(products[i].ProductVariations[j].price < minPrice){
					minPrice = products[i].ProductVariations[j].price;
				}
			}

		}
		return minPrice;
	}

	//getting the maximum product price
	function calculateMaxProductPrice(products){
		let maxPrice = 0;
		for(let i=0;i<products.length;i++){
			for(let j = 0;j<products[i].ProductVariations.length;j++)
			{
				if(products[i].ProductVariations[j].price > maxPrice){
					maxPrice = products[i].ProductVariations[j].price;
				}
			}

		}
		return maxPrice;
	}

	//API Call to fetch the data
	async function getProducts(){

		const URL = `https://slash-backend.onrender.com/product`;
		try
		{
			const res = await fetch(URL);

			if (!res.ok) {
				throw new Error('Error fetching products');
			}
			const data = await res.json();
			return data.data;

		}catch (error) {
			console.error(error.message);
			return [];
		}
	}

	//extracting categories from the products
	function getCategories(products)
	{
		if(!products)
			return;
		const categories = [];

		for (let i = 0; i < products.length; i++) {
			//checking if category is already pushed in the array
			if(products[i].SubCategories && !categories.includes(products[i].SubCategories.name))
			{
				categories.push(products[i].SubCategories.name);
			}
		}
		return categories;
	}

	function filterProducts(products,limit){
		const components = products.map((product)=>{
			//Filtering out categories not picked by user
			if(product.SubCategories.name !== category && category !== 'all')
			{
				return null
			}
			//filtering out the products with rating < rating picked by user
			if(product.product_rating < rating)
			{
				return null
			}

			return product.ProductVariations.map((prod, index) => {
					//filtering out the products with price > maxPrice picked by user
					if(prod.price > maxPrice )
					{
						return null
					}
					return <ProductCard
							key={index}
							name={product.name}
							description={product.description}
							category={product.SubCategories.name}
							brandName={product.Brands.brand_name}
							rating = {product.product_rating}
							productVariation={prod}
							/>
			})
		})
		return components.slice(0,limit);
	}


	return<ProductContext.Provider value={{
		category,
		setCategory,
		rating,
		setRating,
		maxPrice,
		setMaxPrice,
		getProducts,
		getCategories,
		calculateMinProductPrice,
		calculateMaxProductPrice,
		filterProducts,
	}}>
		{children}
	</ProductContext.Provider>
}

//hook to validate the usage of the context
function useProducts(){
	const context = useContext(ProductContext);
	if(context ===undefined)
		throw new Error("Wrong usage position.")
	return context;
}

export {useProducts,ProductsProvider}