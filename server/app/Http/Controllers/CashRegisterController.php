<?php

namespace App\Http\Controllers;

use App\Models\CashRegister;
use Illuminate\Http\Request;

class CashRegisterController extends Controller
{
    // عرض كل الخزائن
    public function index()
    {
        $cashRegisters = CashRegister::all();
        return response()->json($cashRegisters);
    }

    // عرض خزينة معينة
    public function show($id)
    {
        $cashRegister = CashRegister::find($id);

        if (!$cashRegister) {
            return response()->json(['message' => 'Cash Register not found'], 404);
        }

        return response()->json($cashRegister);
    }

    // إضافة خزينة جديدة
    public function store(Request $request)
    {
        $cashRegister = CashRegister::create($request->all());
        return response()->json($cashRegister, 201);
    }

    // تعديل خزينة موجودة
    public function update(Request $request, $id)
    {
        $cashRegister = CashRegister::find($id);

        if (!$cashRegister) {
            return response()->json(['message' => 'Cash Register not found'], 404);
        }

        $cashRegister->update($request->all());
        return response()->json($cashRegister);
    }

    // حذف خزينة
    public function destroy($id)
    {
        $cashRegister = CashRegister::find($id);

        if (!$cashRegister) {
            return response()->json(['message' => 'Cash Register not found'], 404);
        }

        $cashRegister->delete();
        return response()->json(['message' => 'Cash Register deleted successfully']);
    }
}
