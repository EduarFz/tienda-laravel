<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comentario;
use App\Models\Dispositivo;
use Inertia\Inertia;

class DetalleController extends Controller
{
    // Mostrar los detalles de un dispositivo y sus comentarios
    public function show($id)
    {
        // Obtener el dispositivo por su ID
        $dispositivo = Dispositivo::findOrFail($id);

        // Obtener los comentarios asociados al dispositivo
        $comentarios = Comentario::where('dispositivo_id', $id)
            ->with('user') // Cargar la relación con el usuario
            ->get();

        // Renderizar la vista Detalles.tsx con los datos del dispositivo y los comentarios
        return Inertia::render('Detalles', [
            'dispositivo' => $dispositivo,
            'comentarios' => $comentarios,
        ]);
    }

    // Crear un comentario
    public function storeComentario(Request $request, $id)
    {
        // Validar los datos del formulario
        $request->validate([
            'contenido' => 'required|string|max:500',
        ]);

        // Crear el comentario
        Comentario::create([
            'contenido' => $request->contenido,
            'dispositivo_id' => $id,
            'user_id' => auth()->id(), // Asignar el ID del usuario autenticado
        ]);

        // Redirigir de vuelta a la página del dispositivo
        return redirect()->back();
    }

    // Editar un comentario
    public function updateComentario(Request $request, $id)
{
    // Validar los datos del formulario
    $request->validate([
        'contenido' => 'required|string|max:500',
    ]);

    // Obtener el comentario por su ID
    $comentario = Comentario::findOrFail($id);

    // Verificar si el usuario tiene permiso para editar el comentario
    if (auth()->id() === $comentario->user_id || auth()->user()->role === 'admin') {
        // Actualizar el comentario
        $comentario->update([
            'contenido' => $request->contenido,
        ]);

        return redirect()->back();
    }

    // Si no tiene permiso, redirigir con un mensaje de error
    return redirect()->back()->with('error', 'No tienes permiso para editar este comentario.');
}

    // Eliminar un comentario
    public function destroyComentario($id)
{
    // Obtener el comentario por su ID
    $comentario = Comentario::findOrFail($id);

    // Verificar si el usuario tiene permiso para eliminar el comentario
    if (auth()->id() === $comentario->user_id || auth()->user()->role === 'admin') {
        // Eliminar el comentario
        $comentario->delete();

        return redirect()->back();
    }

    // Si no tiene permiso, redirigir con un mensaje de error
    return redirect()->back()->with('error', 'No tienes permiso para eliminar este comentario.');
}
}