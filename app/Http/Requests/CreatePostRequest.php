<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "img1" => "file|mimes:jpg,png,jpeg",
            "img2" => "file|mimes:jpg,png,jpeg",
            "img3" => "file|mimes:jpg,png,jpeg",
            "img4" => "file|mimes:jpg,png,jpeg",
            "img5" => "file|mimes:jpg,png,jpeg",
	        "content" => "string|min:3|max:255"
        ];
    }
}
