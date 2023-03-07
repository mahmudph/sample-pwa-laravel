@extends('layout.master_layout')

<style>
    #content-qr-scanner {
        height: 100vh;
    }
</style>

@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                <a href="#" id="start" class="btn btn-info btn-sm">Scan Qr</a>
                <a href="#" id="stop" class="btn btn-danger btn-sm">Stop Qr</a>
            </div>
            <div class="card-body">

                <form method="post" id="form">
                    @csrf
                    <div class="form-group">
                        <div id="render"></div>
                        <select name="camera_id" id="cameras" class="form-control">
                            <option value="">Select Camera</option>
                        </select>
                    </div>

                    <div class="form-group pt-2 pb-2" id="form-content">
                        <label for="title">Title</label>
                        <input type="text" name="title" id="title" class="form-control" placeholder="title">
                    </div>
                    <div class="form-group pt-2 pb-2">
                        <label for="sub_title">Subtitle</label>
                        <input type="text" name="sub_title" id="sub_title" class="form-control" placeholder="sub_title">
                    </div>
                    {{-- <div class="form-group pt-2 pb-2">
                        <label for="category_id">Category</label>
                        <select name="category_id" id="category_id" class="form-control">
                            @foreach ($category as $item)
                                <option value="{{ $item->id }}">{{ $item->name }}</option>
                            @endforeach
                        </select>
                    </div> --}}
                    <div class="form-group pt-2 pb-2">
                        <label for="status">Status</label>
                        <select class="form-control" name="status">
                            <option value="1">Active</option>
                            <option value="2">Inactive</option>
                        </select>
                    </div>
                    <div class="form-group pt-2 pb-2">
                        <label for="author">Author</label>
                        <input type="text" name="author" id="author" class="form-control">
                    </div>
                    <div class="form-group pt-2" id="btn-content">
                        <button type="submit" id="submit" class="btn btn-sm btn-primary">Simpan</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
@endsection

@push('js')
    @vite('resources/js/scanner.js')
@endpush
