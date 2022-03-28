import { doc,deleteDoc, getDoc } from "firebase/firestore";
import { db, storage } from '../firebase/firebase';
import { ref, deleteObject } from "firebase/storage";

export const deleteProduct = (productInfo) => {

    return new Promise((resolve, reject) => {
        //get image
        getDoc(doc(db, "products", productInfo.id))
        .then((result) => {
            const image = result.data().image
            const storageRef = ref(storage, `products/${image}`);
            
            //delete image
            deleteObject(storageRef)
            .then(() => {
                //delete product
                deleteDoc(doc(db, 'products', productInfo.id))
                .then(() => {
                    resolve(productInfo.id);
                })
            })
        })
        .catch(() => {
            reject()
        })
    })
}