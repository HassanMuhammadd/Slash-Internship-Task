import  {useState} from 'react'
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';


export default function FilterOption({title,names,value,onChange}) {
	const [show,setShow] = useState(false);

	return (
		<>
		{/* The header of the filter and the icon showing on it */}
		<div onClick={()=>setShow(!show)} className={` ${show?'active':''} text-start cursor-pointer border-b-2  border-[var(--main)] hover:bg-[var(--main)]  p-3 transition-all duration-100 flex flex-row justify-between items-center`}>
			<h6>{title}</h6>
			{show ? <IoIosArrowUp /> : <IoIosArrowDown />}
		</div>
			{/* The actual content of the filter coming from the categories of the products */}
			<div className={`${show ? 'block' : 'hidden'} px-3 mb-2`}>
				{names.map((name,index)=>{
				return (
						<div key={index} className='my-1 flex items-center gap-1'>
							<input type="radio" id={name} name={title} value={names[index]} className='cursor-pointer ' onClick={(e)=>onChange(e.target.value)} checked={names[index]==value}/>
							<label htmlFor={name} className='cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap'>{name}</label><br/>
						</div>
						)
				})}
			</div>
		</>
	)
}
