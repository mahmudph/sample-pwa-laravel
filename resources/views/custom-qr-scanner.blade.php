@extends('layout.master_layout')

@push('css')
    <style>
        .content {
            margin-left: 0px;
            margin-right: 0px;
            height: 100vh;
        }

        .content-qr {
            flex: 1;
        }

        .btn-content {
            flex: 0;
        }
    </style>
@endpush

@section('content')
    <div class="container-fluit">
        <div class="d-flex justify-content-center align-content-end content flex-column">
            <div id="content-qr">
                <div id="render"></div>
                <div class="content-information">
                    <div class="d-flex justify-content-center align-content-center flex-column p-3">
                        <i class="fa-regular fa-qrcode"></i>
                        <h3 class="text-center">Scan Qr Code</h3>
                        <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. A nemo atque optio,
                            ab ad
                            expedita officia
                            modi nesciunt placeat voluptatibus officiis nulla inventore. Cupiditate, perferendis!
                            Consequatur
                            suscipit debitis amet necessitatibus.</p>
                    </div>
                </div>
            </div>
            <div class="btn-content">
                <div class="d-grid gap-2 d-block p-4">
                    <button class="btn btn-primary btn-sm btn-block p-2" id="start">Start</button>
                    <button class="btn btn-danger btn-sm btn-block d-none p-2" id="stop">Stop</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    @vite('resources/js/custom-scanner.js')
@endpush
