
export default function Button({ text, onClick }) {
	return (
		<button onClick={onClick} className='bg-[var(--main)] w-full text-black text-sm font-bold py-5 px-3  hover:bg-[var(--mainHeavy)] transition-all duration-100 '>
			<span className='uppercase'>{text}</span>
		</button>
	)
}
