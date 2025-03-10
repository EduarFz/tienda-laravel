<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dispositivo;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //

    public function index()
    {
        // Obtener todos los dispositivos
        $dispositivos = Dispositivo::all();

        // Pasar los dispositivos a la vista del dashboard
        return Inertia::render('Dashboard', [
            'dispositivos' => $dispositivos,
        ]);
    }

}
