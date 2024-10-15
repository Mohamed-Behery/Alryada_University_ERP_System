<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::with('children')->whereNull('parent_id')->get();

        return response()->json($accounts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'account_name' => 'required|string',
            'account_code' => 'nullable|string',
            'account_type' => 'required|string',
            'parent_id'    => 'nullable|exists:chart_of_accounts,id',
            'is_active'    => 'boolean',
            'opening_balance' => 'numeric',
            'current_balance' => 'numeric',
        ]);

        $account = Account::create($validated);

        return response()->json(['message' => 'Account created successfully', 'account' => $account], 201);
    }

    public function show($id)
    {
        $account = Account::with('children')->findOrFail($id);

        return response()->json($account);
    }

    public function update(Request $request, $id)
    {
        $account = Account::findOrFail($id);

        $validated = $request->validate([
            'account_name' => 'required|string',
            'account_code' => 'nullable|string',
            'account_type' => 'required|string',
            'parent_id'    => 'nullable|exists:chart_of_accounts,id',
            'is_active'    => 'boolean',
            'opening_balance' => 'numeric',
            'current_balance' => 'numeric',
        ]);

        $account->update($validated);

        return response()->json(['message' => 'Account updated successfully', 'account' => $account]);
    }

    public function destroy($id)
    {
        $account = Account::findOrFail($id);

        if ($account->children()->count() > 0) {
            return response()->json(['message' => 'Cannot delete account with sub-accounts'], 400);
        }

        $account->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}
