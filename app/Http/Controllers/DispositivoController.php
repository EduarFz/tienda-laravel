<?php

namespace App\Http\Controllers;

use App\Models\Dispositivo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DispositivoController extends Controller
{

   
    


    // Método para mostrar la lista de dispositivos
    public function index()
    {
        $dispositivos = Dispositivo::all();
        return Inertia::render('Dispositivos/CrudDispositivos', [
            'dispositivos' => $dispositivos,
        ]);
    }

    public function edit($id)
{
     // Buscar el dispositivo por ID
     $dispositivo = Dispositivo::find($id);

     // Si el dispositivo no existe, redirigir con un mensaje de error
     if (!$dispositivo) {
         return redirect()->route('cruddispositivos.index')->with('error', 'Dispositivo no encontrado');
     }
 
     // Convertir el campo "color" de JSON a array
     $dispositivo->color = json_decode($dispositivo->color, true) ?? [];
 
     // Pasar el dispositivo a la vista de edición
     return Inertia::render('Dispositivos/EditDispositivo', [
         'dispositivo' => $dispositivo,
     ]);
}



    // Método para mostrar el formulario de creación
    public function create()
    {
        return Inertia::render('CrudDispositivos/Create');
    }

     // Método para manejar la creación de dispositivos
     public function store(Request $request)
{       
    // dd($request->all()); 


    $request->validate([
        'modelo' => 'required|string|max:255',
        'marca' => 'required|string|max:255',
        'año' => 'required|integer',
        'memoria_ram' => 'required|string',
        'almacenamiento' => 'required|string',
        'precio' => 'required|numeric', // Validar el campo precio
    ]);

    // Convertir el array de colores a JSON
    $data = $request->all();
    $data['color'] = json_encode($request->color);

    // Asegurarse de que el precio sea un número
    $data['precio'] = (float) $request->precio;

    // Crear el dispositivo
    Dispositivo::create($data);

    return redirect()->route('cruddispositivos.index');


}

     public function update(Request $request, $id)
{
    // Buscar el dispositivo por ID
    $dispositivo = Dispositivo::find($id);

    // Si el dispositivo no existe, redirigir con un mensaje de error
    if (!$dispositivo) {
        return redirect()->route('cruddispositivos.index')->with('error', 'Dispositivo no encontrado');
    }

    // Validar los datos del formulario
    $request->validate([
        'modelo' => 'required|string|max:255',
        'marca' => 'required|string|max:255',
        'año' => 'required|integer',
        'memoria_ram' => 'required|string',
        'almacenamiento' => 'required|string',
        'precio' => 'required|numeric', // Validar el campo precio
    ]);

    // Convertir el array de colores a JSON
    $data = $request->all();
    $data['color'] = json_encode($request->color);

    // Actualizar el dispositivo
    $dispositivo->update($data);

    // Redirigir a la lista de dispositivos con un mensaje de éxito
    return redirect()->route('cruddispositivos.index')->with('success', 'Dispositivo actualizado correctamente');
}


     // Método para manejar la eliminación de dispositivos
    public function destroy($id)
    {
        $dispositivo = Dispositivo::find($id);
        $dispositivo->delete();

        return redirect()->route('cruddispositivos.index');
    }
}