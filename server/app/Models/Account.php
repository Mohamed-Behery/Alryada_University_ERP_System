<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'chart_of_accounts';

    protected $fillable = [
        'account_name',
        'account_code',
        'account_type',
        'parent_id',
        'is_active',
        'opening_balance',
        'current_balance',
    ];

    public function parent()
    {
        return $this->belongsTo(Account::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Account::class, 'parent_id');
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'account_id');
    }

    public function revenues()
    {
        return $this->hasMany(Revenue::class, 'account_id');
    }
}
