<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dispositivo extends Model
{
    use HasFactory;

    protected $fillable = [
        'modelo',
        'marca',
        'año',
        'camara_trasera',
        'camara_delantera',
        'procesador',
        'memoria_ram',
        'almacenamiento',
        'tamaño_pantalla',
        'resolucion',
        'color',
        'peso',
        'sistema_operativo',
        'bateria',
        'imagen',
        'precio', // Asegúrate de que el campo precio esté aquí
    ];

    public function comentarios()
{
    return $this->hasMany(Comentario::class);
}

}