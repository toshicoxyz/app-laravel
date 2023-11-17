<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('dashboard.categoria.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $form = $request->all();
        $nombre = $form['nombre'];
        $descripcion = $form['descripcion'];

        DB::table('categoria')->insert([
            'nombre' =>  $nombre,
            'descripcion' => $descripcion
        ]);

        return response($form);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        $form = $request->all();

        $nuevosDatos = [
            'nombre' => $form['nombre'],
            'descripcion' => $form['descripcion'],
        ];

        DB::table('categoria')->where('id', $id)->update($nuevosDatos);

        return redirect()->back()->with('success',  "Se actualizo la categoria");
    }

    public function search(Request $request)
    {
        $search = $request->input('busqueda');

        // Utilizando LIKE en la consulta
        $data = DB::table('categoria')
            ->where('nombre', 'like', "%$search%")
            ->orWhere('descripcion', 'like', "%$search%")
            ->get();

        return response()->json($data);
    }

    public function searchHtml(Request $request)
    {
        $search = $request->input('busqueda');

        // Utilizando LIKE en la consulta
        $data = DB::table('categoria')
            ->where('nombre', 'like', "%$search%")
            ->orWhere('descripcion', 'like', "%$search%")
            ->get();
        return view('dashboard.categoria.search', ['data' => $data]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::table('categoria')->where('id', $id)->delete();
    }
}
