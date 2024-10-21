<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $user = Auth::user();

        $userData = [
            'sub' => $user->id,
            'username' => $user->username,
            'role' => $user->role
        ];

        $token = JWTAuth::claims($userData)->attempt($credentials);

        return response()->json(compact('token', 'userData'));
    }


    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users',
            'password' => 'required|string',
            'role' => 'required|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'password' => bcrypt($request->password),
            'role' => $request->role,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(['token' => $token]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }
}
