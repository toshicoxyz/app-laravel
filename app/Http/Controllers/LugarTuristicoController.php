<?php

namespace App\Http\Controllers;

use App\Models\LugarTuristico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LugarTuristicoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('busqueda');
        $lugaresTuristicos = LugarTuristico::where('nombre', 'like', "%$search%")
            ->orWhere('descripcion', 'like', "%$search%")
            ->get();
        return response()->json($lugaresTuristicos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        $region = LugarTuristico::create($request->all());
        return response()->json($region, 201);
    }

    public function update(string $id, Request $request, LugarTuristico $region)
    {
        try {
            DB::table('lugar_turisticos')->where('id',  $id)->update($request->all());

            return response()->json($region, 200);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::table('lugar_turisticos')->where('id', $id)->delete();
            // Region::destroy($region->id);
            return response()->json(null, 204);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }
}
