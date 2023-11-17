<div class="card">
    <div class="card-header">
        <h3 class="card-title">Resultado de búsqueda</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
        <table id="example2" class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Activo</th>
                    <th>Descripcion</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($data as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>{{ $item->nombre }}</td>
                        <td>{{ $item->activo }}</td>
                        <td>{{ $item->descripcion }}</td>
                        <td>
                            <button onclick="modalEditar('{{ $item->id }}')"
                                class="btn btn-sm btn-warning">Editar</button>

                            <form action="{{ route('categoria.destroy', ['id' => $item->id]) }}" method="post"
                                onsubmit="return confirm('¿Estás seguro de eliminar esta categoría?')">
                                @csrf
                                @method('delete')
                                <button type="submit" class="btn btn-sm btn-danger">Eliminar categoría</button>
                            </form>
                            {{-- <a href="{{ route('categoria.destroy', ['id' => $item->id]) }}">Eliminar categoría</a> --}}
                        </td>
                    </tr>
                @endforeach
            </tbody>
            {{-- <tfoot>
                <tr>
                    <th>Nombre</th>
                    <th>Activo</th>
                    <th>Descripcion</th>
                    <th>Opciones</th>
                </tr>
            </tfoot> --}}
        </table>
    </div>
    <!-- /.card-body -->
</div>
<!-- /.card -->


<div class="modal fade" id="modal-editar" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" id="modal-editar-contenido">
            <div class="modal-header">
                <h4 class="modal-title">Editar persona</h4>
            </div>
            <form action="{{ route('categoria.edit', ['id' => $item->id]) }}" method="POST" id="formulario-editar"
                autocomplete="off" onsubmit="event.preventDefault(); edit();">
                @csrf
                @method('PUT')
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label" for="nombres">Nombre</label>
                        <div class="col-sm-8">
                            <input type="text" name="nombre" id="nombre" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label" for="descripcion">Descripcion</label>
                        <div class="col-sm-8">
                            <input type="text" name="descripcion" id="descripcion" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label" for="fecha_nacimiento">Fecha de nacimiento</label>
                        <div class="col-sm-8">
                            <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" class="form-control"
                                value="2021-06-01" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><i
                            class="fas fa-window-close"></i>
                        Cerrar
                    </button>
                    <button id="btn-submit" type="submit" class="btn btn-primary"><i class="fas fa-save"></i>
                        Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</div>


<script>
    let categoriaId = null;

    function modalEditar(id) {
        categoriaId = id;
        $('#modal-editar').modal('show')
    }

    function edit() {
        if (categoriaId) {
            let formulario = document.getElementById('formulario-editar');
            let datosDelFormulario = new FormData(formulario);

            const ruta = `categoria/edit/${categoriaId}`;

            // promesas
            axios.post(ruta, datosDelFormulario).then(function(respuesta) {
                    // search();
                    $('#modal-editar').modal('hide');
                    toastr.success('Actualizado correctamente');
                })
                .catch(function(e) {
                    console.error(e)
                    $('#modal-editar').modal('hide');
                    toastr.error('Error al crear categoría');
                });
        } else {
            console.error('ID de categoría no disponible');
        }
    }
</script>
