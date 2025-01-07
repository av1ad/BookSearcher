import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map();
const RATE_LIMIT_DURATION = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per ^

export function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const now = Date.now();
  
  const userRequests = rateLimit.get(ip) ?? [];
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_DURATION);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  
  return NextResponse.next();
}
