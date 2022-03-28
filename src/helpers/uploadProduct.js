import { doc, collection, addDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db, storage } from '../firebase/firebase';
import { ref, uploadBytes } from "firebase/storage";

export const uploadProduct = (productInfo, image) => {

    const productsRef = collection(db, 'products');

    let extension = image.type.split('/')[1];

    return new Promise((resolve, reject) => {
        addDoc(productsRef, productInfo)
            .then(result => {
                const name = result.id + '.' + extension
                updateDoc(doc(db, 'products', result.id), {
                    image: result.id + '.' + extension
                })
                    .then(() => {
                        const storageRef = ref(storage, `products/${name}`);

                        const file = new File([image.slice(0, image.size, image.type)], name, { type: image.type })

                        uploadBytes(storageRef, file)
                            .then(() => {
                                resolve({
                                    ...productInfo,
                                    id: result.id
                                });
                            })
                    })
            })
            .catch((error) => {
                Swal.fire('An error ocurred', "error");
                reject(error);
            })
    })
}