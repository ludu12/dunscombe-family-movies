import { decrypt, encrypt } from './iron';
import { NextApiRequest, NextApiResponse } from 'next';
import isEqual from 'lodash/isEqual';
import { IncomingMessage, ServerResponse } from 'http';
import Cookies from 'cookies';

// TODO:
// const cf = require("aws-cloudfront-sign");
// const CLOUDFRONT_SIGNATURE = "CloudFront-Signature";
// const CLOUDFRONT_POLICY = "CloudFront-Policy";
// const CLOUDFRONT_KEY_PAIR_ID = "CloudFront-Key-Pair-Id";
const SESSION = 'session';

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export interface Session {
  date: number;
  answer: string;
  name?: string;
  email?: string;
}

export async function createSession(
  req: NextApiRequest,
  res: NextApiResponse,
  data: Session
): Promise<void> {
  const encryptedToken = await encrypt(data);

  const cookies = new Cookies(req, res);
  const cookieOptions: Cookies.SetOption = {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  };

  cookies.set(SESSION, encryptedToken, cookieOptions);

  // TODO:
  // const options = {
  //   keypairId: process.env.AWS_CLOUDFRONT_PUBLIC_KEY_ID,
  //   privateKeyString: process.env.AWS_CLOUDFRONT_PRIVATE_KEY
  // };
  // const cloudfrontCookies = cf.getSignedCookies(`${process.env.AWS_CLOUDFRONT_URL}/*`, options);
  // cookies.set(CLOUDFRONT_SIGNATURE, cloudfrontCookies[CLOUDFRONT_SIGNATURE], cookieOptions);
  // cookies.set(CLOUDFRONT_POLICY, cloudfrontCookies[CLOUDFRONT_POLICY], cookieOptions);
  // cookies.set(CLOUDFRONT_KEY_PAIR_ID, cloudfrontCookies[CLOUDFRONT_KEY_PAIR_ID], cookieOptions);
}

export async function getSession(
  req: IncomingMessage,
  res: ServerResponse
): Promise<Session> {
  const cookies = new Cookies(req, res);

  const session = await decrypt(cookies.get(SESSION));
  if (!validateSession(session)) {
    removeSession(req, res);
    return null;
  } else {
    return session;
  }
}

export function validateSession(session: Session): boolean {
  return isEqual(session?.answer, process.env.SECRET_ANWSER);
}

export function removeSession(req: IncomingMessage, res: ServerResponse): void {
  const cookies = new Cookies(req, res);
  const cookieOptions = {
    maxAge: 0,
  };

  cookies.set(SESSION, null, cookieOptions);
  // TODO:
  // cookies.set(CLOUDFRONT_SIGNATURE, null, cookieOptions);
  // cookies.set(CLOUDFRONT_POLICY, null, cookieOptions);
  // cookies.set(CLOUDFRONT_KEY_PAIR_ID, null, cookieOptions);
}
