import { createContext, useState } from "react";

export const modalContext = createContext();

export function ModalProvider({children}){

    const [actualProduct, setActualProduct] = useState(false);
    const [activeModal, setActiveModal] = useState(false);


    return(
        <modalContext.Provider value={{actualProduct, setActualProduct,activeModal, setActiveModal}}>
            {children}
        </modalContext.Provider>
    )
}