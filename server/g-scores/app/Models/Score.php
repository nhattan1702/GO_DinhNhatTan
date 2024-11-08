<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_number',
        'math',
        'literature',
        'foreign_language',
        'physics',
        'chemistry',
        'biology',
        'history',
        'geography',
        'civic_education',
        'foreign_language_code',
    ];

    public static function rules()
    {
        return [
            'registration_number' => 'required|string|unique:scores|max:255',
            'math' => 'nullable|numeric|min:0|max:10',
            'literature' => 'nullable|numeric|min:0|max:10',
            'foreign_language' => 'nullable|numeric|min:0|max:10',
            'physics' => 'nullable|numeric|min:0|max:10',
            'chemistry' => 'nullable|numeric|min:0|max:10',
            'biology' => 'nullable|numeric|min:0|max:10',
            'history' => 'nullable|numeric|min:0|max:10',
            'geography' => 'nullable|numeric|min:0|max:10',
            'civic_education' => 'nullable|numeric|min:0|max:10',
            'foreign_language_code' => 'nullable|string|max:2',
        ];
    }
}
