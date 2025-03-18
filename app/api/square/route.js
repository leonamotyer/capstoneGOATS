import { NextResponse } from 'next/server';
import { processPayment } from '../../../lib/square';

export async function POST(request) {
  const { amount, token } = await request.json();

  try {
    const response = await processPayment(amount, token);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}