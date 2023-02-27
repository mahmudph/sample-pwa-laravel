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
                    <div class="d-flex justify-content-center align-content-center flex-column p-3 text-center">
                        <i class="fa fa-10x fa-qrcode" style="font-size: 58px;"></i>
                        <h3>Scan Qr Code</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A nemo atque optio,
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
                    <div class="d-flex justify-content-center align-content-center">
                        <div class="col-10 col-md-3">
                            <button class="btn btn-primary btn-sm btn-block p-2 w-100" id="start">Start</button>
                        </div>
                    </div>
                    <div class="container d-none" id="btn-action">
                        <div class="row">
                            <div class="col-6 col-md-6">
                                <button class="btn btn-danger btn-sm btn-block p-2 w-100" id="stop">Stop</button>
                            </div>
                            <div class="col-6 col-md-6">
                                <button class="btn btn-info btn-sm btn-block p-2 w-100" id="upload">Select File</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    @vite('resources/js/custom-scanner.js')
@endpush
