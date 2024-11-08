<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Score;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Exception;

class ScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filePath = database_path('diem_thi_thpt_2024.csv');

        if (!file_exists($filePath)) {
            Log::error("CSV file not found at path: $filePath");
            return;
        }

        $file = fopen($filePath, "r");
        $isHeader = true;

        try {
            while (($data = fgetcsv($file, 1000, ",")) !== false) {
                if ($isHeader) {
                    $isHeader = false;
                    continue;
                }

                $validator = Validator::make([
                    'registration_number' => $data[0],
                    'math' => $data[1],
                    'literature' => $data[2],
                    'foreign_language' => $data[3],
                    'physics' => $data[4],
                    'chemistry' => $data[5],
                    'biology' => $data[6],
                    'history' => $data[7],
                    'geography' => $data[8],
                    'civic_education' => $data[9],
                    'foreign_language_code' => $data[10],
                ], [
                    'registration_number' => 'required|string|unique:scores',
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
                ]);

                if ($validator->fails()) {
                    Log::warning("Invalid data for registration number {$data[0]}: " . json_encode($validator->errors()->all()));
                    continue;
                }

                Score::create([
                    'registration_number' => $data[0],
                    'math' => $data[1] !== '' ? $data[1] : null,
                    'literature' => $data[2] !== '' ? $data[2] : null,
                    'foreign_language' => $data[3] !== '' ? $data[3] : null,
                    'physics' => $data[4] !== '' ? $data[4] : null,
                    'chemistry' => $data[5] !== '' ? $data[5] : null,
                    'biology' => $data[6] !== '' ? $data[6] : null,
                    'history' => $data[7] !== '' ? $data[7] : null,
                    'geography' => $data[8] !== '' ? $data[8] : null,
                    'civic_education' => $data[9] !== '' ? $data[9] : null,
                    'foreign_language_code' => $data[10] !== '' ? $data[10] : null,
                ]);
            }
        } catch (Exception $e) {
            Log::error("Error occurred while seeding data from CSV: " . $e->getMessage());
        } finally {
            fclose($file);
        }
    }
}
