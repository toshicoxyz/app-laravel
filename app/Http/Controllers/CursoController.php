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
}
