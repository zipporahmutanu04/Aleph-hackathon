import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userAddress, amount } = await request.json();

    if (!userAddress || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: userAddress and amount' },
        { status: 400 }
      );
    }

    // Generate unique redemption ID
    const redemptionId = `redemption_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create redemption data
    const redemptionData = {
      id: redemptionId,
      type: 'token_redemption',
      userAddress,
      amount: parseFloat(amount),
      timestamp: Date.now(),
      status: 'pending',
      network: 'sepolia',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };

    // In a real app, you'd store this in a database
    // For now, we'll just return the data

    return NextResponse.json({
      success: true,
      qrData: JSON.stringify(redemptionData),
      redemptionId,
      expiresAt: redemptionData.expiresAt,
    });

  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}