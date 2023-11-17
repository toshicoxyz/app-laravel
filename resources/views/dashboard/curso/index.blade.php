@extends('dashboard.layouts.app')

@section('titulo')
    Cursos | ISI Laravel
@endsection


@section('contenido')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Cursos</h1>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <!-- /.col-md-6 -->
                    <div class="col-lg-12">
                        <div class="card card-primary card-outline">
                            <div class="card-header">
                                <h5 class="m-0">Búsqueda de cursos</h5>
                            </div>
                            <div class="card-body">
                                <form class="form-inline">
                                    <label class="my-1 mr-2" for="busqueda">Nombre</label>
                                    <input type="text" class="form-control my-1 mr-sm-2" id="busqueda" name="busqueda"
                                        placeholder="Jane Doe">
                                    <button type="submit" class="btn btn-primary my-1">Buscar</button>
                                    <button onclick="modalCrear()" type="button"
                                        class="btn btn-success my-1 mx-1">Nuevo</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- /.col-md-6 -->
                </div>
                <div class="row">
                    <div class="col-12">
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
                                            <th>Imagen</th>
                                            <th>Activo</th>
                                            <th>Categoria Id</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($data as $item)
                                            <tr>
                                                <td>{{ $item->id }}</td>
                                                <td>{{ $item->nombre }}</td>
                                                <td>{{ $item->imagen }}</td>
                                                <td>{{ $item->activo }}</td>
                                                <td>{{ $item->categoria_id }}</td>
                                                <td>
                                                    <button onclick="modalEditar(1)" class="btn btn-warning">Editar</button>
                                                    <button onclick="confirmarEliminar(1)"
                                                        class="btn btn-danger">Eliminar</button>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->

                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content -->
    </div>
@endsection



@section('modales')
    <div class="modal fade" id="modal-agregar" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" id="modal-agregar-contenido">
                <div class="modal-header">
                    <h4 class="modal-title">Registrar persona</h4>
                </div>
                <form action="" id="formulario-crear" autocomplete="off">
                    <div class="modal-body">
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label" for="apellido_paterno">Apellido paterno</label>
                            <div class="col-sm-8">
                                <input type="text" name="apellido_paterno" id="apellido_paterno" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label" for="apellido_materno">Apellido materno</label>
                            <div class="col-sm-8">
                                <input type="text" name="apellido_materno" id="apellido_materno" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label" for="nombres">Nombres</label>
                            <div class="col-sm-8">
                                <input type="text" name="nombres" id="nombres" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label" for="fecha_nacimiento">Fecha de nacimiento</label>
                            <div class="col-sm-8">
                                <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" class="form-control" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><i
                                class="fas fa-window-close"></i> Cerrar
                        </button>
                        <button id="btn-submit" type="submit" class="btn btn-primary"><i class="fas fa-save"></i>
                            Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-editar" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" id="modal-editar-contenido">
                <div class="modal-header">
                    <h4 class="modal-title">Editar persona</h4>
                </div>
                <form action="" id="formulario-editar" autocomplete="off">
                    <div class="modal-body">
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label" for="apellido_paterno">Apellido paterno</label>
                            <div class="col-sm-8">
                                <input type="text" name="apellido_paterno" id="apellido_paterno" class="form-control"
                                    value="Apellido paterno persona" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label" for="apellido_materno">Apellido materno</label>
                            <div class="col-sm-8">
                                <input type="text" name="apellido_materno" id="apellido_materno" class="form-control"
                                    value="Apellido paterno persona" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label" for="nombres">Nombres</label>
                            <div class="col-sm-8">
                                <input type="text" name="nombres" id="nombres" class="form-control"
                                    value="Nombres persona" />
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
                                class="fas fa-window-close"></i> Cerrar
                        </button>
                        <button id="btn-submit" type="submit" class="btn btn-primary"><i class="fas fa-save"></i>
                            Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection



@section('javascript')
    <script>
        $(function() {
            $('#example2').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true,
                "columnDefs": [{
                    targets: 4,
                    orderable: false,
                    searchable: false
                }]
            });
        });

        document.getElementById('formulario-crear').addEventListener('submit', function(evento) {
            evento.preventDefault();
            guardar();
        });

        document.getElementById('formulario-editar').addEventListener('submit', function(evento) {
            evento.preventDefault();
            actualizar();
        });

        function modalCrear() {
            $('#modal-agregar').modal('show');
        }

        function guardar() {
            $('#modal-agregar').modal('hide');
            toastr.success('Registrado correctamente');
        }

        function modalEditar(id) {
            $('#modal-editar').modal('show')
        }

        function actualizar() {
            $('#modal-editar').modal('hide');
            toastr.success('Actualizado correctamente');
        }

        function confirmarEliminar(id) {
            Swal.fire({
                title: '¿Está seguro?',
                text: "Este cambio no se puede deshacer!",
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '<i class="far fa-trash-alt"></i> Si, eliminar!',
                cancelButtonText: '<i class="far fa-window-close"></i> Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    toastr.success('Eliminado correctamente')
                }
            })
        }
    </script>
@endsection
