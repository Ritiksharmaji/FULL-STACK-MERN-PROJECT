import { useEffect, useState } from "react"

// creating a custome hook to define or fix the window size.
export const useWindowSize = () =>{
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])

    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', updateSize)

        return () => window.removeEventListener('resize', updateSize)
    }, [])

    // [] is dependecy array


    return {
        width: size[0],
        height: size[1]
    }
}