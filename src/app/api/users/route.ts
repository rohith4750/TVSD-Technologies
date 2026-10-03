import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const users = await db.getAllUsers();
    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to fetch users from database' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, status, department, phone, avatar, password } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required fields' },
        { status: 400 }
      );
    }

    const newUser = await db.createUser({
      name,
      email,
      role: role || 'OPERATOR',
      status: status || 'ACTIVE',
      department: department || 'General',
      phone: phone || '',
      avatar:
        avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      password: password || 'new password',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User created in database',
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to create user in database' },
      { status: 500 }
    );
  }
}
