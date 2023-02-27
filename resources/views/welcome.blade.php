@extends('layout.master_layout')

@push('css')
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
@endpush

@section('content')
    <div class="d-flex justify-content-center align-items-center" style="min-height:100vh">
        <a class="btn btn-sm btn-info" href="{{ route('home') }}">Home</a>
    </div>
@endsection

@push('js')
    <script>
        $(document).ready(function() {
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/users",
                method: "get",
                success: (data) => {
                    for (item of data) {
                        $(".content").append(`<li>${item.name}</li>`);
                    }
                },
            });
        });
    </script>
@endpush
