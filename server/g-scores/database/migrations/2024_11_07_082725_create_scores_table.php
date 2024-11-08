<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number')->unique();
            $table->float('math')->nullable();
            $table->float('literature')->nullable();
            $table->float('foreign_language')->nullable();
            $table->float('physics')->nullable();
            $table->float('chemistry')->nullable();
            $table->float('biology')->nullable();
            $table->float('history')->nullable();
            $table->float('geography')->nullable();
            $table->float('civic_education')->nullable();
            $table->string('foreign_language_code', 3)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
