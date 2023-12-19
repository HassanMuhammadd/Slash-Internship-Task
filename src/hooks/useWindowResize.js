import {useEffect, useState} from "react";

//hook for changing a state in the case of window resize, used in showing the filters differently depending on screen size
export function useWindowResize(setter,sizeLimit){

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const updateScreenWidth = () => {
		setScreenWidth(window.innerWidth);
	};

	useEffect(() => {
		window.onload = () => {
			if(window.innerWidth>sizeLimit)
			{
				setter(true);
			}

		}
		window.addEventListener('resize', updateScreenWidth);
		if (screenWidth > sizeLimit) {
			setter(true);
		}else
		setter(false)

		return () => {
			window.removeEventListener('resize', updateScreenWidth);
		};
	}, [screenWidth,setter,sizeLimit]);
	return screenWidth;
}