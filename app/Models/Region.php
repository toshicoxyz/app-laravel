<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'ubicacion', // Puede ser una coordenada geográfica, dirección, etc.
        'imagen', // URL o ruta de la imagen representativa de la región
        'poblacion', // Cantidad de habitantes de la región
        'clima', // Descripción del clima de la región
    ];

    // Definición de relación: una región puede tener muchos lugares turísticos
    public function lugaresTuristicos()
    {
        return $this->hasMany(LugarTuristico::class);
    }
}
