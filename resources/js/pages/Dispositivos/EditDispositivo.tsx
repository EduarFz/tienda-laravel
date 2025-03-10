import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from '@/layouts/admin-layout';

// Definimos la interfaz para el tipo Dispositivo
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
    resolucion: string;
    color: string[];
    peso: string;
    sistema_operativo: string;
    bateria: string;
    imagen: string;
    precio: number;
}

// Definimos las props que recibe el componente
interface Props {
    dispositivo: Dispositivo;
}

const EditDispositivo: React.FC<Props> = ({ dispositivo }) => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        modelo: dispositivo.modelo,
        marca: dispositivo.marca,
        año: dispositivo.año,
        camara_trasera: dispositivo.camara_trasera,
        camara_delantera: dispositivo.camara_delantera,
        procesador: dispositivo.procesador,
        memoria_ram: dispositivo.memoria_ram,
        almacenamiento: dispositivo.almacenamiento,
        tamaño_pantalla: dispositivo.tamaño_pantalla,
        resolucion: dispositivo.resolucion,
        color: dispositivo.color || [], // Inicializar como array vacío si no hay datos
        peso: dispositivo.peso,
        sistema_operativo: dispositivo.sistema_operativo,
        bateria: dispositivo.bateria,
        imagen: dispositivo.imagen,
        precio: dispositivo.precio || 1, // Agregar el campo precio
    });

    // Función para manejar cambios en los campos del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Función para manejar cambios en el campo de colores (array)
    const handleColorChange = (index: number, value: string) => {
        const newColors = [...formData.color];
        newColors[index] = value;
        setFormData({
            ...formData,
            color: newColors,
        });
    };

    // Función para agregar un nuevo campo de color
    const addColorField = () => {
        setFormData({
            ...formData,
            color: [...formData.color, ''],
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Enviar los datos al servidor usando Inertia.js
        Inertia.put(`/dispositivos/${dispositivo.id}`, formData, {
            onSuccess: () => {
                // Redirigir a la lista de dispositivos después de actualizar
                Inertia.visit('/cruddispositivos');
            },
        });
    };

    return (
        <AdminLayout>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1 style={{ marginBottom: '20px', color: '#333' }}>Editar Dispositivo</h1>
                <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Campos del formulario */}
                        <input
                            type="text"
                            name="modelo"
                            placeholder="Modelo"
                            className="p-2 border rounded-lg w-full"
                            value={formData.modelo}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="precio"
                            placeholder="Precio"
                            className="p-2 border rounded-lg w-full"
                            value={formData.precio}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="marca"
                            placeholder="Marca"
                            className="p-2 border rounded-lg w-full"
                            value={formData.marca}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="año"
                            placeholder="Año"
                            className="p-2 border rounded-lg w-full"
                            value={formData.año}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="camara_trasera"
                            placeholder="Cámara Trasera"
                            className="p-2 border rounded-lg w-full"
                            value={formData.camara_trasera}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="camara_delantera"
                            placeholder="Cámara Delantera"
                            className="p-2 border rounded-lg w-full"
                            value={formData.camara_delantera}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="procesador"
                            placeholder="Procesador"
                            className="p-2 border rounded-lg w-full"
                            value={formData.procesador}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="memoria_ram"
                            placeholder="Memoria RAM"
                            className="p-2 border rounded-lg w-full"
                            value={formData.memoria_ram}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="almacenamiento"
                            placeholder="Almacenamiento"
                            className="p-2 border rounded-lg w-full"
                            value={formData.almacenamiento}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="tamaño_pantalla"
                            placeholder="Tamaño de Pantalla"
                            className="p-2 border rounded-lg w-full"
                            value={formData.tamaño_pantalla}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="resolucion"
                            placeholder="Resolución"
                            className="p-2 border rounded-lg w-full"
                            value={formData.resolucion}
                            onChange={handleInputChange}
                        />
                        {/* Campo de colores (array) */}
                        {formData.color.map((color, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Color ${index + 1}`}
                                className="p-2 border rounded-lg w-full"
                                value={color}
                                onChange={(e) => handleColorChange(index, e.target.value)}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={addColorField}
                            className="p-2 bg-blue-500 text-white rounded-lg"
                        >
                            Agregar Color
                        </button>
                        <input
                            type="text"
                            name="peso"
                            placeholder="Peso"
                            className="p-2 border rounded-lg w-full"
                            value={formData.peso}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="sistema_operativo"
                            placeholder="Sistema Operativo"
                            className="p-2 border rounded-lg w-full"
                            value={formData.sistema_operativo}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="bateria"
                            placeholder="Batería"
                            className="p-2 border rounded-lg w-full"
                            value={formData.bateria}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="imagen"
                            placeholder="URL de la Imagen"
                            className="p-2 border rounded-lg w-full"
                            value={formData.imagen}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                    >
                        Actualizar Dispositivo
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default EditDispositivo;