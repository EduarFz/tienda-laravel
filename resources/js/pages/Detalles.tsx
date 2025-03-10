import React from 'react';
import { PageProps } from '@inertiajs/inertia-react';
import AppLayout from '@/layouts/app-layout';

interface Dispositivo {
    id: number;
    modelo: string;
    marca: string;
    año: number;
    camara_trasera: string;
    camara_delantera: string;
    procesador: string;
    memoria_ram: string;
    almacenamiento: string;
    tamaño_pantalla: string;
    resolución: string;
    color: string;
    peso: string;
    sistema_operativo: string;
    batería: string;
    imagen: string;
    precio: number;
}

interface DetallesProps extends PageProps {
    dispositivo: Dispositivo;
}

const Detalles: React.FC<DetallesProps> = ({ dispositivo }) => {
    return (
        <AppLayout>
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '20px', 
            fontFamily: 'Arial, sans-serif', 
            maxWidth: '800px', 
            margin: '0 auto',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
            {/* Imagen del dispositivo */}
            <img 
                src={dispositivo.imagen} 
                alt={dispositivo.modelo} 
                style={{ 
                    width: '100%', 
                    maxWidth: '300px', 
                    borderRadius: '10px', 
                    marginBottom: '20px' 
                }} 
            />

            {/* Nombre del dispositivo */}
            <h1 style={{ 
                fontSize: '2rem', 
                marginBottom: '20px', 
                color: '#333', 
                textAlign: 'center' 
            }}>
                {dispositivo.modelo}
            </h1>

            {/* Detalles del dispositivo */}
            <div style={{ 
                width: '100%', 
                textAlign: 'left', 
                backgroundColor: '#fff', 
                padding: '20px', 
                borderRadius: '10px', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
                <h2 style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '10px', 
                    color: '#555' 
                }}>
                    Detalles del Dispositivo
                </h2>

                {/* Lista de detalles */}
                <p><strong>Marca:</strong> {dispositivo.marca}</p>
                <p><strong>Año:</strong> {dispositivo.año}</p>
                <p><strong>Cámara Trasera:</strong> {dispositivo.camara_trasera}</p>
                <p><strong>Cámara Delantera:</strong> {dispositivo.camara_delantera}</p>
                <p><strong>Procesador:</strong> {dispositivo.procesador}</p>
                <p><strong>Memoria RAM:</strong> {dispositivo.memoria_ram}</p>
                <p><strong>Almacenamiento:</strong> {dispositivo.almacenamiento}</p>
                <p><strong>Tamaño de Pantalla:</strong> {dispositivo.tamaño_pantalla}</p>
                <p><strong>Resolución:</strong> {dispositivo.resolución}</p>
                <p><strong>Color:</strong> {dispositivo.color}</p>
                <p><strong>Peso:</strong> {dispositivo.peso}</p>
                <p><strong>Sistema Operativo:</strong> {dispositivo.sistema_operativo}</p>
                <p><strong>Batería:</strong> {dispositivo.batería}</p>
                <p><strong>Precio:</strong> ${dispositivo.precio}</p>
            </div>
        </div>
        </AppLayout>
    );
};

export default Detalles;