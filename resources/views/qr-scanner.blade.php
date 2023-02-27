@extends('layout.master_layout')

<style>
    #content-qr-scanner {
        height: 100vh;
    }
</style>

@section('content')
    <div class="d-flex justify-content-center align-content-center" id="content-qr-scanner">
        <div class="align-self-center">
            <div id="render"></div>
        </div>
    </div>
@endsection

@push('js')
    @vite('resources/js/scanner.js')
@endpush
