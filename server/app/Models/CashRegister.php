<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashRegister extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'opening_balance',
        'total_incoming',
        'total_outgoing',
        'current_balance',
        'responsible_person',
        'notes',
    ];
}
