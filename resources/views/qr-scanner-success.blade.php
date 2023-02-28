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
                <div class="content-information">
                    <div class="d-flex justify-content-center align-content-center flex-column p-3 text-center">
                        <i class="fa fa-check-circle" style="font-size:58px"></i>
                        <h3>Scan Qr Code Result</h3>
                        <h6 id="result"></h6>
                        <p class="col-md-6 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. A nemo atque
                            optio,
                            ab ad
                            expedita officia
                            modi nesciunt placeat voluptatibus officiis nulla inventore. Cupiditate, perferendis!
                            Consequatur
                            suscipit debitis amet necessitatibus.</p>
                    </div>
                    <div class="p-2">
                        <div class="d-flex justify-content-center align-content-center">
                            <div class="col-10 col-md-3">
                                <button class="p-2 btn btn-sm btn-danger w-100 text-center" id="reset">Ulangi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    @vite('resources/js/scan-result.js')
@endpush
