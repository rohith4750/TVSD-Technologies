import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Query user from PostgreSQL database tvsd
    const user = await db.getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found with provided email address' },
        { status: 401 }
      );
    }

    // Verify password against database record
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Invalid password credentials' },
        { status: 401 }
      );
    }

    // Update last login in database
    await db.updateLastLogin(user.id);

    // Sanitize user object (omit password)
    const { password: _, ...safeUser } = user;

    const token = `tvsd_jwt_token_${Buffer.from(safeUser.email).toString('base64')}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: safeUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}
