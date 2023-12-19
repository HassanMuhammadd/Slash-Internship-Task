//formatting number into a price
export function formatNumber(num){
	const formatted_price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
	return formatted_price.slice(1);
}

//changing the background highlighted area from the slider
export function handleInputChange(e) {
	let target = e.target
	if (e.target.type !== 'range') {
		target = document.getElementById('range')
	}
	const min = target.min
	const max = target.max
	const val = target.value
	let percentage = (val - min) * 100 / (max - min)

	if (document.documentElement.dir === 'rtl') {
		percentage = (max - val)
	}

	target.style.backgroundSize = percentage + '% 100%'
}