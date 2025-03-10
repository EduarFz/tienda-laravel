import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from '@/layouts/admin-layout';
import DispositivoCard from '@/components/DispositivoCard';

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
    dispositivos: Dispositivo[];
}

const Dashboard: React.FC<Props> = ({ dispositivos }) => {
    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = (id: number, addedToCart: boolean) => {
        if (addedToCart) {
            // Si el dispositivo ya estaba en el carrito, restar 1
            setCartCount((prevCount) => prevCount - 1);
        } else {
            // Si el dispositivo no estaba en el carrito, sumar 1
            setCartCount((prevCount) => prevCount + 1);
        }
    };

    return (
        <AdminLayout>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1 style={{ marginBottom: '20px', color: '#333' }}>Dashboard</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Dispositivos</h2>
                    <div style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', borderRadius: '4px' }}>
                        Carrito: {cartCount}
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {dispositivos.map((dispositivo) => (
                        <DispositivoCard
                            key={dispositivo.id}
                            dispositivo={dispositivo}
                            onAddToCart={(id, addedToCart) => handleAddToCart(id, addedToCart)}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;