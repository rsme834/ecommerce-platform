import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { Client } = require('pg');
    const client = new Client({
      connectionString: process.env.DATABASE_URL
    });
    
    await client.connect();
    const result = await client.query('SELECT NOW() as current_time');
    await client.end();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully! 🎉',
      time: result.rows[0].current_time 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}