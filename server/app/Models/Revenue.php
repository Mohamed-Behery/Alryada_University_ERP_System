<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revenue extends Model
{
    use HasFactory;

    protected $fillable = ['amount', 'type', 'description', 'date', 'revenue_type', 'account_id'];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
