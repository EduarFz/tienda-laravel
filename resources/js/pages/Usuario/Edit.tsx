import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

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
    user: User;
}

const EditUsuario: React.FC<Props> = ({ user }) => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
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
        Inertia.put(`/users/${user.id}`, formData, {
            onSuccess: () => {
                // Redirigir a la lista de usuarios después de actualizar
                Inertia.visit('/users');
            },
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ marginBottom: '20px', color: '#333' }}>Editar Usuario</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Rol:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Actualizar
                    </button>
                    <button
                        type="button"
                        onClick={() => Inertia.visit('/users')}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUsuario;