<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $users = User::all(); // Recupera todos los usuarios
        // return view('users.index', compact('users')); // Pasa los usuarios a la vista

        $users = User::all(); // Obtiene todos los registros de la tabla 'users'
        return Inertia::render('Usuario', [ // Pasa los datos al componente React
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         // Validar los datos del formulario
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8',
        'role' => 'required|in:user,admin',
    ]);

    // Crear el usuario
    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password), // Hashear la contraseña
        'role' => $request->role,
    ]);

    // Redirigir a la lista de usuarios
    return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Buscar el usuario por ID
    $user = User::find($id);

    // Si el usuario no existe, redirigir con un mensaje de error
    if (!$user) {
        return redirect()->route('users.index')->with('error', 'Usuario no encontrado');
    }

    // Pasar el usuario a la vista de edición
    return Inertia::render('Usuario/Edit', [
        'user' => $user,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // // Buscar el usuario por ID
    $user = User::find($id);

    // Si el usuario no existe, redirigir con un mensaje de error
    if (!$user) {
        return redirect()->route('users.index')->with('error', 'Usuario no encontrado');
    }

    // Validar los datos del formulario
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'password' => 'nullable|string|min:8',
        'role' => 'required|in:user,admin',
    ]);

    // Actualizar el usuario
    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'password' => $request->password ? bcrypt($request->password) : $user->password,
        'role' => $request->role,
    ]);

    // Redirigir a la lista de usuarios con un mensaje de éxito
    return redirect()->route('users.index')->with('success', 'Usuario actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id); // Busca el usuario por ID
        $user->delete(); // Elimina el usuario
    
        return redirect()->route('users.index'); // Redirige a la lista de usuarios


        
    }
}
