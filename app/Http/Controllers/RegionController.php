<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RegionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('busqueda');

        $regiones = Region::where('nombre', 'like', "%$search%")
            ->orWhere('descripcion', 'like', "%$search%")
            ->get();
        return response()->json($regiones);
    }


    public function create(Request $request)
    {
        $region = Region::create($request->all());
        return response()->json($region, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, Request $request, Region $region)
    {
        try {
            DB::table('regions')->where('id',  $id)->update($request->all());

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
            DB::table('regions')->where('id', $id)->delete();
            // Region::destroy($region->id);
            return response()->json(null, 204);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }
}
