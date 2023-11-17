<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CursoController extends Controller
{
    public function index()
    {
        $search = "";

        $data = DB::table('curso')
            ->where('nombre', 'like', "%$search%")
            ->orWhere('imagen', 'like', "%$search%")
            ->get();
        return view('dashboard.curso.index', ['data' => $data]);
        // return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $form = $request->all();

        DB::table('curso')->insert([
            'nombre' => $form['nombre'],
            'imagen' => $form['imagen'],
            'precio' => $form['precio'],
            "categoria_id" => $form['categoria_id'],
        ]);
        // return view('dashboard.categoria.create');
        // return redirect()->back()->with('success',  $nombre);
        // return response()->json($datosFormulario);
        return response($form);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return response($request);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        $form = $request->all();

        $nuevosDatos = [
            'nombre' => $form['nombre'],
            'imagen' => $form['imagen'],
            'precio' => $form['precio'],
        ];

        DB::table('curso')->where('id', $id)->update($nuevosDatos);

        return redirect()->back()->with('success',  "Se actualizo la categoría");
    }

    public function search(Request $request)
    {
        $search = $request->input('busqueda');

        // Utilizando LIKE en la consulta
        $data = DB::table('curso')
            ->where('nombre', 'like', "%$search%")
            ->get();
        // $users = DB::table("categoria")->get();
        // return view('dashboard.categoria.search', ['data' => $data]);
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::table('curso')->where('id', $id)->delete();
    }
}
