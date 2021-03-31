import { decrypt, encrypt } from './iron';
import { NextApiResponse } from 'next';
import { IncomingMessage } from 'http';
import { parse, serialize } from 'cookie';

const TOKEN_NAME = 'session';
const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

function parseCookies(req: IncomingMessage): any {
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export interface Session {
  date: number;
  response: string;
  name?: string;
  email?: string;
}

export async function createSession(
  res: NextApiResponse,
  data: Session
): Promise<void> {
  const encryptedToken = await encrypt(data);

  const cookie = serialize(TOKEN_NAME, encryptedToken, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
}

export async function getSession(req: IncomingMessage): Promise<Session> {
  const cookies = parseCookies(req);
  const session = await decrypt(cookies?.[TOKEN_NAME]);
  if (!validateSession(session)) {
    return null;
  } else {
    return session;
  }
}

export function validateSession(session: Session): boolean {
  return session?.response === process.env.SECRET_ANSWER;
}

export function removeSession(res: NextApiResponse): void {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}
