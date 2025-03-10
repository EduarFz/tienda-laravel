<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Usuarios</title>
</head>
<body>
    <div>
        <h1>Usuarios</h1>
        @foreach ($users as $user)
            <div>
                <p>ID: {{ $user->id }}</p>
                <p>Nombre: {{ $user->name }}</p>
                <p>Email: {{ $user->email }}</p>
                <hr>
            </div>
        @endforeach
    </div>
</body>
</html>