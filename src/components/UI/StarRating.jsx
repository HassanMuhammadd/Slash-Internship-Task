import star from '../../assets/star.png'
import voidStar from '../../assets/voidStar.png'
export default function StarRating({rating}) {

    return (
		<div className='bg-white text-black px-3 py-2 rounded-3 flex flex-row justify-center items-center'>
		{
			Array.from({length: 5}, (_,idx) => {
				return <img className='stars'
						src={idx<rating?star.src:voidStar.src}
						alt="star"
						key={idx}
						/>
				})
		}
			<span className='ms-2 font-bold align-middle'>{rating.toFixed(1)}</span>
		</div>
    )
}
