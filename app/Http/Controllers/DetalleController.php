<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dispositivo;
use Inertia\Inertia;

class DetalleController extends Controller
{
    // Mostrar los detalles de un dispositivo
    public function show($id)
    {
        // Obtener el dispositivo por su ID
        $dispositivo = Dispositivo::findOrFail($id);

        // Renderizar la vista Detalles.tsx con los datos del dispositivo
        return Inertia::render('Detalles', [
            'dispositivo' => $dispositivo,
        ]);
    }
}