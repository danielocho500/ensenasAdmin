import React, { useContext, useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Swal from 'sweetalert2';
import { modalContext } from '../../context/modalContext';
import { uploadProduct } from '../../helpers/uploadProduct';
import { useForm } from '../../hooks/useForm';
import { updateProduct } from '../../helpers/updateProducts';

export const ProductModal = ({ setData }) => {

    const { activeModal, setActiveModal, actualProduct } = useContext(modalContext);

    const [values, handleInputChange, reset, setValues] = useForm({
        title: 'a',
        precio: 0,
        categoria: 'a',
        color: 'a',
        description: 'a',
        forma: 'a',
        medida: 'a'
    })

    const { title, precio, categoria, color, description, forma, medida } = values;

    const [buttonAble, setButtonAble] = useState(true);

    useEffect(() => {
        reset();

        if (actualProduct) {
            setValues({
                title: actualProduct.title,
                precio: actualProduct.precio,
                categoria: actualProduct.categoria,
                color: actualProduct.color,
                description: actualProduct.description,
                forma: actualProduct.forma,
                medida: actualProduct.medida
            });
        }

        setButtonAble(true);

    }, [activeModal])

    const [file, setFile] = useState(false);

    const closeModal = () => {
        setActiveModal(false);
        setFile(false);
        setButtonAble(true);
    }

    const handleModify = () => {
        if(file && !["image/png", "image/jpeg", "image/jpg", "image/jfif"].includes(file.type)){
            Swal.fire({
                title: 'Formato incorrecto de imagen',
                icon: 'error'
            })

            return;
        }

        setButtonAble(false);

        updateProduct(values, file, actualProduct.id)
        .then((values) => {
            Swal.fire({
                title: `${title} fue modificado correctamente`,
                icon: 'success'
            })

            setActiveModal(false);

            setData(oldData => {
                return oldData.map(element => {
                    if(element.id === values.id){
                        return {
                            ...values
                        }
                    }
                    else
                        return element;
                })
            })
        })
        .finally(() => {
            setButtonAble(true);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (precio < 0) {
            Swal.fire({
                title: 'El precio no puede ser negativo',
                icon: 'error'
            })

            updateProduct();

            return;
        }

        if(actualProduct){
            handleModify();
            return;
        }

        if (!["image/png", "image/jpeg", "image/jpg", "image/jfif"].includes(file.type)) {
            Swal.fire({
                title: 'Formato incorrecto de imagen',
                icon: 'error'
            })

            return;
        }

        setButtonAble(false);

        uploadProduct({ ...values }, file)
            .then((values) => {
                Swal.fire({
                    title: `${values.title} fue agregado correctamente`,
                    icon: 'success'
                })

                setActiveModal(false);

                setData(oldData => {
                    return [values, ...oldData];
                })
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() =>{
                setButtonAble(true);
            })

    }

    const fileChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <Modal
            isOpen={activeModal}
        >
            <ModalHeader>
                {
                    (actualProduct)
                        ? `Modificar - ${actualProduct.title}`
                        : "Agregar producto"
                }
            </ModalHeader>

            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Titulo del producto</label>
                        <input type="text" className="form-control" id="title" placeholder="Titulo" name='title' onChange={handleInputChange} value={title} required />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="precio">Precio</label>
                        <input type='number' className="form-control" id="precio" placeholder="precio" name='precio' onChange={handleInputChange} value={precio} required />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="categoria">Categoria</label>
                        <input type='text' className="form-control" id="categoria" placeholder="categoria" name='categoria' onChange={handleInputChange} value={categoria} required />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="color">Color</label>
                        <input type='text' className="form-control" id="color" placeholder="color" name='color' onChange={handleInputChange} value={color} required />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="category">Descripción</label>
                        <input type='text' className="form-control" id="category" placeholder="categoria" name='description' onChange={handleInputChange} value={description} required />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="category">Forma</label>
                        <input type='text' className="form-control" id="category" placeholder="categoria" name='forma' onChange={handleInputChange} value={forma} required />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="category">Medida</label>
                        <input type='text' className="form-control" id="category" placeholder="categoria" name='medida' onChange={handleInputChange} value={medida} required />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="image">Imagen</label>
                        <input type='file' accept="image/png, image/jpeg, image/jpg, image/jfif" className="form-control" id="image" placeholder="imagen" name='image' onChange={fileChange}/>
                        {
                            (actualProduct) &&<small id="emailHelp" className="form-text text-muted">Si no seleccionas una imagen, se mantendrá la que ya se ha subido</small>
                        }
                    </div>


                    <button type="submit" className="btn btn-primary mt-4" id="confirm" disabled={!buttonAble}>
                        {
                            (actualProduct)
                                ? "Confirmar modificación"
                                : "Agregar"
                        }
                    </button>

                    <button type='button' className="btn btn-danger mt-4 mx-2" onClick={closeModal} id="cancel" disabled={!buttonAble}> Cancelar </button>
                </form>


            </ModalBody>
        </Modal>
    )
}
