<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('compra_dispositivo', function (Blueprint $table) {
        $table->foreignId('compra_id')->constrained()->onDelete('cascade');
        $table->foreignId('dispositivo_id')->constrained()->onDelete('cascade');
        $table->integer('cantidad');
        $table->primary(['compra_id', 'dispositivo_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compra_dispositivo');
    }
};
