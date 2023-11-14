@extends('dashboard.layouts.app')

@section('titulo')
    Categorias de curso Laravel
@endsection


@section('contenido')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Categorías de cursos</h1>
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
                                <h5 class="m-0">Búsqueda de categorías de cursos</h5>
                            </div>
                            <div class="card-body">
                                <form class="form-inline" action="" method="GET" id="formulario-busqueda"
                                    onsubmit="event.preventDefault(); search();">
                                    <label class="my-1 mr-2" for="busqueda">Nombre</label>
                                    <input type="text" class="form-control my-1 mr-sm-2" id="busqueda" name="busqueda"
                                        placeholder="">
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
                    <div class="col-12" id="listado">
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
                    <h4 class="modal-title">Crear Categoria</h4>
                </div>
                <form action="{{ route('categoria.create') }}" id="formulario-crear" autocomplete="off"
                    onsubmit="event.preventDefault(); create();">
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
@endsection



@section('javascript')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            search(); // Llama a la función search() una vez que el documento haya cargado
        });

        function search() {
            const busqueda = document.getElementById('busqueda').value;

            // http://localhost/isilaravel/public/dashboard/categoria/search
            // zyggy laravel
            const ruta = "{{ route('categoria.search') }}";

            // promesas
            axios.get(ruta, {
                    params: {
                        'busqueda': busqueda
                    }
                }).then(function(respuesta) {
                    const codigo_html = respuesta.data;
                    $('#listado').html(codigo_html);
                })
                .catch(function() {
                    toastr.error('Error al realizar búsqueda de categorías');
                });
        }

        function create() {
            let formulario = document.getElementById('formulario-crear');
            let datosDelFormulario = new FormData(formulario);
            console.log(datosDelFormulario);
            // http://localhost/isilaravel/public/dashboard/categoria/create
            // zyggy laravel
            const ruta = "{{ route('categoria.create') }}";

            // promesas
            axios.post(ruta, datosDelFormulario).then(function(respuesta) {
                    search();
                    toastr.success('Actualizado correctamente');
                })
                .catch(function(e) {
                    console.error(e)
                    toastr.error('Error al crear categoría');
                });
        }

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

        function modalCrear() {
            $('#modal-agregar').modal('show');
        }

        function guardar() {
            $('#modal-agregar').modal('hide');
            // toastr.success('Registrado correctamente');
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
