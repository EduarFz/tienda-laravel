import React, { useState } from 'react';
import { PageProps } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
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

interface Comentario {
    id: number;
    contenido: string;
    user: {
        id: number;
        name: string;
        role: string;
    };
}

interface DetallesProps extends PageProps {
    dispositivo: Dispositivo;
    comentarios: Comentario[];
    auth: {
        user: {
            id: number;
            role: string;
        };
    };
}

const Detalles: React.FC<DetallesProps> = ({ dispositivo, comentarios, auth }) => {
    const { post, put, delete: destroy, processing, data, setData } = useForm({
        contenido: '',
    });

    const [editandoComentarioId, setEditandoComentarioId] = useState<number | null>(null);
    const [contenidoEditado, setContenidoEditado] = useState('');
    const [contenido, setContenido] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/detalles/${dispositivo.id}/comentarios`, {
            preserveScroll: true, // Mantener la posición de la página
            onSuccess: () => setData('contenido', ''), // Limpiar el campo de texto después de enviar
        });
    };

    const editcomentario = (contenido: string) => {
        setContenidoEditado(contenido);
        setData('contenido', contenido);
    };
    
    const setContenidoInput = (contenido: string) => {
        setContenido(contenido);
        setData('contenido', contenido);
    }
    const handleEditarComentario = (comentarioId: number, contenido: string) => {
        setEditandoComentarioId(comentarioId);
        setContenidoEditado(contenido);
    };

    const handleActualizarComentario = (comentarioId: number) => {
        put(`/comentarios/${comentarioId}`, {
           
            preserveScroll: true,
            onSuccess: () => setEditandoComentarioId(null),
        });
    };

    const handleEliminarComentario = (comentarioId: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            destroy(`/comentarios/${comentarioId}`, {
                preserveScroll: true,
            });
        }
    };

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
                marginBottom: '20px',
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

            {/* Sección de comentarios */}
            <div style={{ 
                width: '100%', 
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
                    Comentarios
                </h2>

                {/* Formulario para agregar comentario */}
                <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                    <textarea 
                    name='contenido2'
                        value={contenido}
                        onChange={(e) => setContenidoInput(e.target.value)}
                        placeholder="Escribe tu comentario..." 
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            border: '1px solid #ddd', 
                            marginBottom: '10px' 
                        }} 
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={processing}
                        style={{ 
                            backgroundColor: '#007bff', 
                            color: 'white', 
                            padding: '10px 20px', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                        }}
                    >
                        {processing ? 'Enviando...' : 'Agregar Comentario'}
                    </button>
                </form>

                {/* Lista de comentarios */}
                {comentarios.length > 0 ? (
                    comentarios.map((comentario) => (
                        <div key={comentario.id} style={{ 
                            padding: '10px', 
                            borderBottom: '1px solid #ddd', 
                            marginBottom: '10px' 
                        }}>
                            {/* Mostrar el contenido del comentario */}
                            {editandoComentarioId === comentario.id ? (
                                <div>
                                    <textarea
                                    name='editcontenido'
                                        value={contenidoEditado}
                                        onChange={(e) => editcomentario(e.target.value)}
                                        style={{ 
                                            width: '100%', 
                                            padding: '10px', 
                                            borderRadius: '5px', 
                                            border: '1px solid #ddd', 
                                            marginBottom: '10px' 
                                        }}
                                    />
                                    <button
                                        onClick={() => handleActualizarComentario(comentario.id)}
                                        style={{ 
                                            backgroundColor: '#28a745', 
                                            color: 'white', 
                                            padding: '8px 16px', 
                                            border: 'none', 
                                            borderRadius: '5px', 
                                            cursor: 'pointer', 
                                            marginRight: '10px' 
                                        }}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={() => setEditandoComentarioId(null)}
                                        style={{ 
                                            backgroundColor: '#dc3545', 
                                            color: 'white', 
                                            padding: '8px 16px', 
                                            border: 'none', 
                                            borderRadius: '5px', 
                                            cursor: 'pointer' 
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p>{comentario.contenido}</p>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Por: {comentario.user.name}</p>

                                    {/* Botones de editar y eliminar (solo para el creador o admin) */}
                                    {(auth.user.id === comentario.user.id || auth.user.role === 'admin') && (
                                        <div style={{ marginTop: '10px' }}>
                                            <button
                                                onClick={() => handleEditarComentario(comentario.id, comentario.contenido)}
                                                style={{ 
                                                    backgroundColor: '#ffc107', 
                                                    color: 'white', 
                                                    padding: '8px 16px', 
                                                    border: 'none', 
                                                    borderRadius: '5px', 
                                                    cursor: 'pointer', 
                                                    marginRight: '10px' 
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleEliminarComentario(comentario.id)}
                                                style={{ 
                                                    backgroundColor: '#dc3545', 
                                                    color: 'white', 
                                                    padding: '8px 16px', 
                                                    border: 'none', 
                                                    borderRadius: '5px', 
                                                    cursor: 'pointer' 
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No hay comentarios aún.</p>
                )}
            </div>
        </div>
        </AppLayout>
    );
};

export default Detalles;