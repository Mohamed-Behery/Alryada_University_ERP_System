<?php

namespace App\Http\Controllers;

use App\Models\Revenue;
use Illuminate\Http\Request;

class RevenueController extends Controller
{
    public function index()
    {
        return Revenue::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'type' => 'required|string',
            'description' => 'nullable|string',
            'date' => 'required|date', // التحقق من صحة التاريخ
            'account_id' => 'required|integer|exists:chart_of_accounts,id', // تحقق من صحة معرف الحساب
        ]);

        $revenue = Revenue::create($request->all());

        return response()->json($revenue, 201);
    }

    public function show($id)
    {
        return Revenue::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $revenue = Revenue::findOrFail($id);
        $revenue->update($request->all());
        return $revenue;
    }

    public function destroy($id)
    {
        Revenue::destroy($id);
        return response()->noContent();
    }
}
