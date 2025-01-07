import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map();
const RATE_LIMIT_DURATION = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

export function middleware(request: NextRequest) {
  // Get IP from headers or forwarded headers
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') ||
             '127.0.0.1';
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

// Configure which routes to run middleware on
export const config = {
  matcher: '/api/recommendations/:path*',
}