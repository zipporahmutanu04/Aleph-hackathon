import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { fromAddress, toAddress, data, dataType } = await request.json();

    if (!fromAddress || !toAddress || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: fromAddress, toAddress, and data' },
        { status: 400 }
      );
    }

    // Simulate data transfer
    const transferResult = {
      success: true,
      transactionId: `data_transfer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fromAddress,
      toAddress,
      data: typeof data === 'string' ? data : JSON.stringify(data),
      dataType: dataType || 'generic',
      timestamp: Date.now(),
      status: 'completed',
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
    };

    return NextResponse.json({
      success: true,
      message: 'Data transfer completed successfully',
      data: transferResult,
    });

  } catch (error) {
    console.error('Error transferring data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Missing address parameter' },
        { status: 400 }
      );
    }

    // Simulate fetching data for an address
    const mockData = {
      address,
      totalTransfers: Math.floor(Math.random() * 100),
      lastActivity: Date.now() - Math.floor(Math.random() * 86400000), // Random time within last 24h
      dataPoints: Array.from({ length: 5 }, (_, i) => ({
        id: `data_${i}`,
        type: ['waste_collection', 'token_redemption', 'impact_report'][Math.floor(Math.random() * 3)],
        timestamp: Date.now() - Math.floor(Math.random() * 604800000), // Random time within last week
        value: Math.floor(Math.random() * 1000),
      })),
    };

    return NextResponse.json({
      success: true,
      data: mockData,
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}