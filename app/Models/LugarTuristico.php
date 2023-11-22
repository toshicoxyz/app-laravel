<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LugarTuristico extends Model
{
    protected $fillable = [
        'nombre', 'descripcion', 'ubicacion', 'imagen', 'precio', 'region_id'
        // Agrega aquí los nombres de los campos que deseas asignar masivamente (mass assignment)
    ];

    // Aquí puedes definir relaciones con otros modelos si es necesario, por ejemplo:
    // Ejemplo de relación si tienes una tabla "regiones" y un lugar turístico pertenece a una región
    public function region()
    {
        return $this->belongsTo(Region::class);
    }
}
