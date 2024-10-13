<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('chart_of_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('account_name');
            $table->string('account_code')->unique();
            $table->string('account_type');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('chart_of_accounts')->onDelete('cascade');
            $table->boolean('is_active')->default(1);
            $table->decimal('opening_balance', 30, 2)->default(0.00);
            $table->decimal('current_balance', 30, 2)->default(0.00);
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chart_of_accounts');
    }
};
