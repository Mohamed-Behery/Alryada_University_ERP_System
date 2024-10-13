<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        return Expense::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required|string',
            'date' => 'required|date',
            'account_id' => 'required|integer|exists:chart_of_accounts,id',
            'expense_type' => 'required|string|max:255',
        ]);

        $expense = Expense::create($validatedData);

        return response()->json(['Expense Created Successfully:' => $expense], 201);
    }

    public function show($id)
    {
        return Expense::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $expense = Expense::findOrFail($id);
        $expense->update($request->all());
        return $expense;
    }

    public function destroy($id)
    {
        Expense::destroy($id);
        return response()->noContent();
    }
}
