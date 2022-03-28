import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import Swal from 'sweetalert2'


export const login = async (password) => {
    return new Promise((respond, reject) => {
        signInWithEmailAndPassword(auth, "danielnochess@gmail.com", password)
        .then(() => {
            Swal.fire({
                title: "Contraseña correcta",
                icon: "success"
            })

            respond();

        })
        .catch(() => {
            Swal.fire({
                title: "No se pudo iniciar sesión",
                icon: "error"
            })

            reject();
        })
    })
}