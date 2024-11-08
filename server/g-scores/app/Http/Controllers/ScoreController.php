<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Score;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ScoreController extends Controller
{
    public function checkScore(Request $request)
    {
        $request->validate(['registration_number' => 'required|string']);

        try {
            $score = Score::where('registration_number', $request->input('registration_number'))->firstOrFail();
            return response()->json($score);
        } catch (ModelNotFoundException $e) {
            Log::error("Registration number not found: " . $request->input('registration_number'));
            return response()->json(['message' => 'Registration number not found'], 404);
        } catch (\Exception $e) {
            Log::error("Error checking score: " . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }
    }

    public function reportScoreLevels()
    {
        try {
            $report = [
                'above_8' => Score::where('math', '>=', 8)->count(),
                'between_6_and_8' => Score::where('math', '>=', 6)->where('math', '<', 8)->count(),
                'between_4_and_6' => Score::where('math', '>=', 4)->where('math', '<', 6)->count(),
                'below_4' => Score::where('math', '<', 4)->count(),
            ];

            return response()->json($report);
        } catch (\Exception $e) {
            Log::error("Error generating score level report: " . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }
    }

    public function scoreStatisticsBySubject()
    {
        $subjectStats = [];
        $languageStats = [];

        try {
            $subjects = ['math', 'literature', 'physics', 'chemistry', 'biology', 'history', 'geography', 'civic_education'];
            foreach ($subjects as $subject) {
                $subjectStats[$subject] = [
                    'above_8' => Score::where($subject, '>=', 8)->count(),
                    'between_6_and_8' => Score::where($subject, '>=', 6)->where($subject, '<', 8)->count(),
                    'between_4_and_6' => Score::where($subject, '>=', 4)->where($subject, '<', 6)->count(),
                    'below_4' => Score::where($subject, '<', 4)->count(),
                ];
            }

            $languageCodes = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7'];
            foreach ($languageCodes as $code) {
                $languageStats[$code] = [
                    'above_8' => Score::where('foreign_language_code', $code)->where('foreign_language', '>=', 8)->count(),
                    'between_6_and_8' => Score::where('foreign_language_code', $code)->where('foreign_language', '>=', 6)->where('foreign_language', '<', 8)->count(),
                    'between_4_and_6' => Score::where('foreign_language_code', $code)->where('foreign_language', '>=', 4)->where('foreign_language', '<', 6)->count(),
                    'below_4' => Score::where('foreign_language_code', $code)->where('foreign_language', '<', 4)->count(),
                ];
            }

            return response()->json([
                'subjects' => $subjectStats,
                'foreign_language' => $languageStats
            ]);
        } catch (\Exception $e) {
            Log::error("Error generating score statistics: " . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }
    }


    public function top10GroupA()
    {
        try {
            $top10 = Score::select('registration_number', 'math', 'physics', 'chemistry')
                ->orderByRaw('(math + physics + chemistry) DESC')
                ->limit(10)
                ->get();

            return response()->json($top10);
        } catch (\Exception $e) {
            Log::error("Error fetching top 10 students for group A: " . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }
    }

    public function top10GroupB()
    {
        try {
            $top10 = Score::select('registration_number', 'math', 'chemistry', 'biology')
                ->orderByRaw('(math + chemistry + biology) DESC')
                ->limit(10)
                ->get();

            return response()->json($top10);
        } catch (\Exception $e) {
            Log::error("Error fetching top 10 students for group B: " . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }
    }

    public function top10GroupC()
    {
        try {
            $top10 = Score::select('registration_number', 'literature', 'history', 'geography')
                ->orderByRaw('(literature + history + geography) DESC')
                ->limit(10)
                ->get();

            return response()->json($top10);
        } catch (\Exception $e) {
            Log::error("Error fetching top 10 students for group C: " . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }
    }
}
