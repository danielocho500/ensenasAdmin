import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from '../firebase/firebase';
import { ref, uploadBytes, deleteObject } from "firebase/storage";

export const updateProduct = (productInfo, image, id) => {

    let extension = false;

    if (image) {
        extension = image.type.split('/')[1];
    }

    return new Promise((resolve, reject) => {

        updateDoc(doc(db, 'products', id), {
            ...productInfo
        })
            .then((result) => {
                if (image) {

                    //get the previous image
                    getDoc(doc(db, "products", id))
                        .then((result) => {

                            //delete image
                            const storageRef = ref(storage, `products/${result.data().image}`);

                            deleteObject(storageRef)
                                .then(() => {
                                    //upload new image

                                    const file = new File([image.slice(0, image.size, image.type)], `${id + '.' + extension}`, { type: image.type })

                                    uploadBytes(storageRef, file)
                                        .then(() => {
                                            resolve({
                                                ...productInfo,
                                                id
                                            });
                                        })
                                })
                        })

                }
                else
                    resolve({
                        ...productInfo,
                        id
                    })
            })
            .catch(error => {
                console.log(error);
                reject()
            })

    })
}