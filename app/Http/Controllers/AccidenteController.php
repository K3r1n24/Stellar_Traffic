<?php

namespace App\Http\Controllers;

use App\Models\Accidente;

class AccidenteController extends Controller
{
    public function index()
    {
        $accidentes = Accidente::all();

        return view('accidentes.index', compact('accidentes'));
    }
}
