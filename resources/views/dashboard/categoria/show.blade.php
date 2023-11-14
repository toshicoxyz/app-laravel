@extends('dashboard.layouts.app')

@section('titulo')
    Ver
@endsection

@section('contenido')
    <!-- Enlace a la vista de índice -->
    <a href="{{ route('categoria.index') }}">Ir a la lista de categorías</a>

    <!-- Enlace para crear una nueva categoría -->
    <a href="{{ route('categoria.create') }}">Crear nueva categoría</a>

    <!-- Formulario para enviar datos y almacenar una nueva categoría -->
    <form action="{{ route('categoria.store') }}" method="post">
        @csrf
        <!-- ... campos del formulario ... -->
        <button type="submit">Guardar categoría</button>
    </form>

    <!-- Enlace para ver detalles de una categoría específica -->
    <a href="{{ route('categoria.show', ['id' => $categoria->id]) }}">Ver detalles de la categoría</a>

    <!-- Enlace para editar una categoría específica -->
    <a href="{{ route('categoria.edit', ['id' => $categoria->id]) }}">Editar categoría</a>

    <!-- Formulario para enviar datos y actualizar una categoría específica -->
    <form action="{{ route('categoria.update', ['id' => $categoria->id]) }}" method="post">
        @csrf
        @method('put')
        <!-- ... campos del formulario ... -->
        <button type="submit">Actualizar categoría</button>
    </form>

    <!-- Formulario para enviar datos y eliminar una categoría específica -->
    <form action="{{ route('categoria.destroy', ['id' => $categoria->id]) }}" method="post">
        @csrf
        @method('delete')
        <button type="submit">Eliminar categoría</button>
    </form>
@endsection
