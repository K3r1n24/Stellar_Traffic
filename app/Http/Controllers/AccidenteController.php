<?php

namespace App\Http\Controllers;

use App\Models\Accidente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccidenteController extends Controller
{
    public function index()
    {
        $accidentes = Accidente::all();

        return view('accidentes.index', compact('accidentes'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tipo_accidente' => 'required|string',
            'fecha_incidente' => 'required|date',
            'hora_aproximada' => 'nullable|string',
            'gravedad' => 'nullable|string',
            'direccion' => 'nullable|string',
            'municipio' => 'nullable|string',
            'id_caso' => 'required|string|unique:accidentes,id_caso',
        ]);

        $data['id_usuario'] = Auth::id() ?? 1;
        
        $accidente = Accidente::create($data);

        return response()->json(['message' => 'Accidente registrado con éxito', 'data' => $accidente]);
    }
}
