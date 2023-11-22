<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('regions', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->string('ubicacion')->nullable();
            $table->string('imagen')->nullable();
            $table->integer('poblacion')->nullable();
            $table->string('clima')->nullable();
            // Agrega otros campos necesarios para tu tabla
            $table->timestamps();
        });

        Schema::create('lugar_turisticos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->string('ubicacion')->nullable();
            $table->string('imagen')->nullable();
            $table->integer('precio')->nullable();
            $table->unsignedBigInteger('region_id');
            // Agrega otros campos necesarios para tu tabla
            $table->timestamps();

            $table->foreign('region_id')->references('id')->on('regions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('regiones');
        Schema::dropIfExists('lugares_turisticos');
    }
};
