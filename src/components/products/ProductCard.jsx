import {useState} from "react";
import {formatNumber} from "../../services/helpers";
import Button from "../UI/Button";
import StarRating from "../UI/StarRating";

export default function ProductCard({name,description,category,brandName,rating,productVariation}) {
	const {price,quantity,ProductVarientImages} =  productVariation;
	const images = ProductVarientImages.map((image)=>image.image_path);
	const [activeImg,setActiveImg] = useState(images[0]);

	return (
	<div className="flex flex-col items-center w-full mx-auto cursor-pointer boxShadow hover:heavyBoxShadow  rounded-t-xl overflow-hidden">
		<div className="bg-white flex flex-col justify-center items-center py-6 px-4 w-full relative  rounded-t-xl ">

			<img src={activeImg} alt={name} className="object-contain w-32 h-32 rounded-md "/>

			{/* Picking an image from available images */}
			<div className="flex flex-row justify-center gap-3 mt-3">
				{
					images.map((image)=>{
						return <img key={image} src={image} alt={name} className='w-8 h-8 rounded-md ' onClick={(e)=>setActiveImg(e.target.src)}/>
					})
				}
			</div>

			{/* Card info */}

				<h2 className="text-2xl uppercase mt-6 w-full text-center truncate overflow-hidden text-ellipsis ">{name}</h2>
				<span className="opacity-60 w-full text-lg text-center truncate overflow-hidden text-ellipsis">{description}</span>
				<span className="opacity-50 text-sm w-full my-2 text-center truncate overflow-hidden text-ellipsis">Sold By {brandName}</span>
				<span className="text-xl font-bold w-full text-center truncate overflow-hidden text-ellipsis">EGP {formatNumber(price)}</span>

			{/* Will be filled if rating is more than 0 */}
			<StarRating rating={rating}/>
			<span className="text-sm opacity-60 w-full text-center truncate overflow-hidden text-ellipsis"> {category}</span>

			{/* Shows an indicator if the quantity is less than 10 */}
			{quantity < 10 && <span className="bg-red-500 text-white text-xs px-4 py-2 absolute top-0 right-0 rounded-tr-xl">Hurry Up! Only {quantity} left</span>}
		</div>
		<Button text='Add To Cart'/>
	</div>
	)
}
