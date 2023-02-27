@extends('layout.master_layout')


@section('content')
    <div class="row d-flex align-items-center justify-content-center" style="min-height: 100vh">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">Add News</div>
                <div class="card-body">
                    <form id="form-add" action="{{ }}">
                        @csrf
                        @method('post')
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" name="title" id="" value="{{ old('title') }}"
                                placeholder="insert title" class="form-control @error('title') 'is-invalid' @enderror">
                            @error('title')
                                <div class="invalid-feedback">
                                    {{ $message }}
                                </div>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="sub_title">Sub title</label>
                            <input type="text" name="sub_title" id="" value="{{ old('sub_title') }}"
                                placeholder="insert sub title"
                                class="form-control @error('sub_title') 'is-invalid' @enderror">
                            @error('sub_title')
                                <div class="invalid-feedback">
                                    {{ $message }}
                                </div>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="category_id">Category</label>
                            <select name="category_id" class="form-control  @error('category_id') 'is-invalid' @enderror"
                                id="categories">
                                <option>Select Category</option>
                            </select>
                            @error('category_id')
                                <div class="invalid-feedback">
                                    {{ $message }}
                                </div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="status">Status</label>
                            <select name="status" class="form-control @error('status') 'is-invalid' @enderror">
                                <option value="2">Active</option>
                                <option value="3">Inactive</option>
                            </select>
                            @error('status')
                                <div class="invalid-feedback">
                                    {{ $message }}
                                </div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="author">Author</label>
                            <input type="text" name="author" id="" value="{{ old('author') }}"
                                placeholder="Input your author"
                                class="form-control @error('author') 'is-invalid' @enderror">
                            @error('author')
                                <div class="invalid-feedback">
                                    {{ $message }}
                                </div>
                            @enderror
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-sm btn-primary" name="simpan">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection


@push('js')
    <script>
        $(document).ready(function() {
            $.ajax({
                url: "{{ route('categories') }}",
                method: 'GET',
                success: (data) => {
                    var res = data.map((item) => {
                        return {
                            'id': item.id,
                            'text': item.name
                        }
                    });

                    $('#categories').select2({
                        data: data.map((item) => {
                            return {
                                'id': item.id,
                                'text': item.name
                            }
                        }),
                    });
                }
            })
        });
    </script>
@endpush
