import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from '@/layouts/admin-layout';

// Definimos la interfaz para el tipo User
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

// Definimos las props que recibe el componente
interface Props {
    users: User[];
}

const Usuario: React.FC<Props> = ({ users }) => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    // Función para manejar cambios en los campos del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Enviar los datos al servidor usando Inertia.js
        Inertia.post('/users', formData, {
            onSuccess: () => {
                // Recargar la lista de usuarios después de agregar uno nuevo
                Inertia.reload();
                // Limpiar el formulario
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'user',
                });
            },
        });
    };

    // Función para eliminar un usuario
    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            Inertia.delete(`/users/${id}`, {
                onSuccess: () => {
                    // Actualizar la lista de usuarios después de eliminar
                    Inertia.reload();
                },
            });
        }
    };

    return (
        <AdminLayout>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Formulario para crear un nuevo usuario */}
            <div className="bg-white w-full py-6">
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-96">
                        <h2 className="text-xl font-semibold text-center mb-4">Crear Usuario Nuevo</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                className="p-2 border rounded-lg w-full"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="p-2 border rounded-lg w-full"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                className="p-2 border rounded-lg w-full"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <select
                                name="role"
                                className="p-2 border rounded-lg w-full"
                                value={formData.role}
                                onChange={handleInputChange}
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                        >
                            Crear Usuario Nuevo
                        </button>
                    </form>
                </div>
            </div>

            {/* Tabla de usuarios */}
            <h1 style={{ marginBottom: '20px', color: '#333' }}>Lista de Usuarios</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Nombre</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Contraseña</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Rol</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} style={{ backgroundColor: '#fff', transition: 'background-color 0.3s' }}>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.id}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.password}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.role}</td>
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
                                    onClick={() => Inertia.visit(`/users/${user.id}/edit`)}
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
                                    onClick={() => handleDelete(user.id)}
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

export default Usuario;