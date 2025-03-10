import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from '@/layouts/admin-layout';

// Definimos la interfaz para el tipo Dispositivo
interface Dispositivo {
    precio: number;
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
}

// Definimos las props que recibe el componente
interface Props {
    dispositivos: Dispositivo[];
}



const CrudDispositivos: React.FC<Props> = ({ dispositivos }) => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        modelo: '',
        marca: '',
        año: '',
        camara_trasera: '',
        camara_delantera: '',
        procesador: '',
        memoria_ram: '',
        almacenamiento: '',
        tamaño_pantalla: '',
        resolucion: '',
        color: [''],
        peso: '',
        sistema_operativo: '',
        bateria: '',
        imagen: '',
        precio: '', // Inicializar como string vacío en lugar de 0
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
    
        // Convertir el precio a número antes de enviarlo
        const data = {
            ...formData,
            precio: parseFloat(formData.precio), // Convertir el precio a número
        };
    
        // Enviar los datos al servidor usando Inertia.js
        Inertia.post('/dispositivos', data, {
            onSuccess: () => {
                // Recargar la lista de dispositivos después de agregar uno nuevo
                Inertia.reload();
                // Limpiar el formulario
                setFormData({
                    modelo: '',
                    marca: '',
                    año: '',
                    camara_trasera: '',
                    camara_delantera: '',
                    procesador: '',
                    memoria_ram: '',
                    almacenamiento: '',
                    tamaño_pantalla: '',
                    resolucion: '',
                    color: [''],
                    peso: '',
                    sistema_operativo: '',
                    bateria: '',
                    imagen: '',
                    precio: '', // Limpiar el campo precio
                });
            },
        });
    };

    // Función para eliminar un dispositivo
    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este dispositivo?')) {
            Inertia.delete(`/dispositivos/${id}`, {
                onSuccess: () => {
                    // Actualizar la lista de dispositivos después de eliminar
                    Inertia.reload();
                },
            });
        }
    };



    return (

        <AdminLayout>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                {/* Formulario para crear un nuevo dispositivo */}
                <div className="bg-white w-full py-6">
                    <div className="flex justify-center">
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl">
                            <h2 className="text-xl font-semibold text-center mb-4">Agregar Nuevo Dispositivo</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Campos del formulario */}

                                <input
    type="number"
    name="precio"
    placeholder="Precio"
    className="p-2 border rounded-lg w-full"
    value={formData.precio || ''} // Evita que aparezca 0 por defecto
    onChange={handleInputChange}
    required
/>
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
                                Agregar Dispositivo
                            </button>
                        </form>
                    </div>
                </div>

                {/* Tabla de dispositivos */}
                <h1 style={{ marginBottom: '20px', color: '#333' }}>Lista de Dispositivos</h1>
                <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Marca</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Modelo</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Año</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Memoria RAM</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Almacenamiento</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Precio</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {dispositivos.map((dispositivo) => (
                            <tr key={dispositivo.id} style={{ backgroundColor: '#fff', transition: 'background-color 0.3s' }}>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dispositivo.id}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dispositivo.marca}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dispositivo.modelo}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dispositivo.año}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dispositivo.memoria_ram}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{dispositivo.almacenamiento}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>${dispositivo.precio}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                    
                                    <button
                                        style={{
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            padding: '8px 12px',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            marginRight: '5px',
                                            transition: 'background-color 0.3s',
                                        }}
                                        onClick={() => Inertia.visit(`/dispositivos/${dispositivo.id}/edit`)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            padding: '8px 12px',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s',
                                        }}
                                        onClick={() => handleDelete(dispositivo.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default CrudDispositivos;