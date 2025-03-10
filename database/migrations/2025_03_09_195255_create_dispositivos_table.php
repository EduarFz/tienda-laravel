<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDispositivosTable extends Migration
{
    public function up()
    {
        Schema::create('dispositivos', function (Blueprint $table) {
            $table->id(); // Columna "id" (autoincremental)
            $table->string('modelo'); // Modelo del dispositivo
            $table->string('marca'); // Marca del dispositivo
            $table->integer('año'); // Año de lanzamiento
            $table->text('camara_trasera')->nullable(); // Especificaciones de la cámara trasera
            $table->text('camara_delantera')->nullable(); // Especificaciones de la cámara delantera
            $table->string('procesador')->nullable(); // Procesador
            $table->string('memoria_ram'); // Memoria RAM
            $table->string('almacenamiento'); // Almacenamiento
            $table->string('tamaño_pantalla')->nullable(); // Tamaño de la pantalla
            $table->string('resolucion')->nullable(); // Resolución de la pantalla
            $table->json('color')->nullable(); // Colores disponibles (usamos JSON para almacenar un array)
            $table->string('peso')->nullable(); // Peso del dispositivo
            $table->string('sistema_operativo')->nullable(); // Sistema operativo
            $table->string('bateria')->nullable(); // Batería
            $table->string('imagen')->nullable(); // URL de la imagen del dispositivo
            $table->timestamps(); // Columnas "created_at" y "updated_at"
        });
    }

    public function down()
    {
        Schema::dropIfExists('dispositivos');
    }
}