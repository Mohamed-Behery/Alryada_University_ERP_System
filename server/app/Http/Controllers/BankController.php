<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\Request;

class BankController extends Controller
{
    // عرض جميع البنوك
    public function index()
    {
        $banks = Bank::all();
        return response()->json($banks);
    }

    // عرض بنك معين
    public function show($id)
    {
        $bank = Bank::find($id);

        if (!$bank) {
            return response()->json(['message' => 'Bank not found'], 404);
        }

        return response()->json($bank);
    }

    // إضافة بنك جديد
    public function store(Request $request)
    {
        $bank = Bank::create($request->all());
        return response()->json($bank, 201);
    }

    // تعديل بنك موجود
    public function update(Request $request, $id)
    {
        $bank = Bank::find($id);

        if (!$bank) {
            return response()->json(['message' => 'Bank not found'], 404);
        }

        $bank->update($request->all());
        return response()->json($bank);
    }

    // حذف بنك
    public function destroy($id)
    {
        $bank = Bank::find($id);

        if (!$bank) {
            return response()->json(['message' => 'Bank not found'], 404);
        }

        $bank->delete();
        return response()->json(['message' => 'Bank deleted successfully']);
    }
}
