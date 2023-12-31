import styles from './image.module.css';
import validation from "./validation";
import { useState, useEffect } from "react";

const Image = ({ name, value, onChange }) => {
    // Estado local para almacenar el valor de la URL de la imagen
    const [userData, setUserData] = useState({
        image: value || "", // El estado inicial es el valor proporcionado o un string vacío si no se provee ninguno
    });

    // Estado local para manejar los errores de validación
    const [errors, setErrors] = useState({});

  
    // Función que se ejecuta cada vez que hay cambios en el input de la imagen
    const handleChange = (event) => {
        const { value } = event.target;

        // Actualiza el estado de userData con el nuevo valor ingresado en el input
        setUserData({
            ...userData,
            image: value, // Actualiza el campo 'image' en 'userData' con el valor del input
        });
        // Realiza la validación de la URL y actualiza los errores
        const userValidated = validation({ image: value });
        setErrors(userValidated);
        // Envia el valor actualizado al componente padre mediante la función onChange
        onChange(value);
    };

    // Efecto que se ejecuta cuando cambia el estado de userData
    useEffect(() => {
        // Verifica si el valor de la imagen no está vacío para realizar la validación
        if (userData.image.trim() !== '') {
            const userValidated = validation(userData); // Realiza la validación de la imagen
            setErrors(userValidated); // Actualiza los errores con el resultado de la validación
        }
    }, [userData]);

    return (
        <div className= {styles.container}>
            <div className= {styles.label}><label htmlFor="image">url</label></div>
            <input className= {styles.imageinput}
                id="image"
                type="text"
                name={name}
                placeholder="URL dell'immagine"
                value={userData.image} // Valor del input es el estado actual de 'image' en 'userData'
                onChange={handleChange} // Función que se ejecuta cuando cambia el input
            />
            {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
        </div>
    );
};

export default Image;
