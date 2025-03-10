import React, { useState } from 'react';

interface Dispositivo {
    id: number;
    modelo: string;
    marca: string;
    año: number;
    memoria_ram: string;
    almacenamiento: string;
    imagen: string;
    precio: number; // Agregar el campo precio
}

interface Props {
    dispositivo: Dispositivo;
    onAddToCart: (id: number, addedToCart: boolean) => void;
}

const DispositivoCard: React.FC<Props> = ({ dispositivo, onAddToCart }) => {
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        const newAddedToCart = !addedToCart;
        setAddedToCart(newAddedToCart);
        onAddToCart(dispositivo.id, newAddedToCart);
    };

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <img src={dispositivo.imagen} alt={dispositivo.modelo} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            <h3 style={{ margin: '8px 0' }}>{dispositivo.modelo}</h3>
            <p style={{ margin: '4px 0' }}>{dispositivo.marca}</p>
            <p style={{ margin: '4px 0' }}>{dispositivo.año}</p>
            <p style={{ margin: '4px 0' }}>{dispositivo.memoria_ram}</p>
            <p style={{ margin: '4px 0' }}>{dispositivo.almacenamiento}</p>
            <p style={{ margin: '4px 0', fontWeight: 'bold' }}>Precio: ${dispositivo.precio}</p> {/* Mostrar el precio */}
            <button
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '8px 4px',
                }}
                onClick={() => {
                    window.location.href = `/detalles/${dispositivo.id}`;
                }}
            >
                Ver más
            </button>
            {/* <button
                style={{
                    backgroundColor: addedToCart ? '#28a745' : '#dc3545',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '8px 4px',
                }}
                onClick={handleAddToCart}
            >
                {addedToCart ? 'Agregado' : 'Agregar al carrito'}
            </button> */}
        </div>
    );
};

export default DispositivoCard;