<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'chart_of_accounts'; // يشير إلى جدول شجرة الحسابات

    protected $fillable = [
        'account_name',
        'account_code',
        'account_type',
        'parent_id',
        'is_active',
        'opening_balance',
        'current_balance',
    ];

    // علاقة مع الحساب الرئيسي
    public function parent()
    {
        return $this->belongsTo(Account::class, 'parent_id');
    }

    // علاقة مع الحسابات الفرعية
    public function children()
    {
        return $this->hasMany(Account::class, 'parent_id');
    }

    // علاقة مع المصروفات
    public function expenses()
    {
        return $this->hasMany(Expense::class, 'account_id');
    }

    // علاقة مع الإيرادات
    public function revenues()
    {
        return $this->hasMany(Revenue::class, 'account_id');
    }
}
