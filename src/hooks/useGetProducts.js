import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase/firebase";


export const useGetProducts = () => {
    
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getDocs(collection(db, "products"))
        .then(data => {
            const products = []

            data.forEach((doc) => {
                products.push({
                    ...doc.data(),
                    id: doc.id
                } );
            });

            setData(products);
        })
        .catch((error) => {
            setError(error);
        } )
        .finally(() => {
            setLoading(false);
        })
    }, [])

    return {data, setData, loading, error}
}