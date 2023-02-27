@extends('layout.master_layout')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    @if (\Session::has('success'))
                        <div class="alert alert-success p-3 m-2" role="alert">
                            {!! \Session::get('success') !!}
                        </div>
                    @endif
                    <div class="card-header d-flex justify-content-between align-items-end">
                        <h1>Data News </h1>
                        <div class="float-right col-md-6">
                            <a href="{{ route('add-news') }}" class="btn btn-sm btn-primary ">Add News With ajax</a>
                            <a href="{{ route('add-news-no-ajax') }}" class="btn btn-sm btn-info">Add News Without ajax</a>
                            <a href="{{ route('scanner') }}" class="btn btn-sm btn-secondary">Scan Qr Code</a>
                            <a href="{{ route('custom-scanner') }}" class="btn btn-sm btn-primary">Scan With Custom QR</a>
                        </div>

                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-stiped table-hovered" id="datatable">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>Sub Title</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Author</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($news as $key => $news_item)
                                        <tr>
                                            <td>{{ $key + 1 }}</td>
                                            <td>{{ $news_item->title }}</td>
                                            <td>{{ $news_item->sub_title }}</td>
                                            <td>{{ $news_item->category->name }}</td>
                                            <td>{{ $news_item->status }}</td>
                                            <td>{{ $news_item->author }}</td>
                                            <td>
                                                <a href='{{ route('delete-news', $news_item->id) }}'
                                                    class='btn btn-danger btn-sm'>delete</a>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
        $(document).ready(function() {
            $('#datatable').DataTable();
        })
    </script>
@endpush
