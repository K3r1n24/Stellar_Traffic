@extends('layouts.public')

@section('title', 'Stellar Trafic - Gestión eficiente del tránsito')

@section('content')
    <landing-public
        route-cobertura="{{ route('cobertura') }}"
        route-emergencias="{{ route('emergencias') }}"
        route-acerca-de="{{ route('acerca-de') }}"
        map-mockup-url="{{ asset('images/map_mockup.png') }}"
    ></landing-public>
@endsection
