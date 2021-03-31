import { getSession } from '../../lib/auth-cookies';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function session(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const session = await getSession(req);

  res.status(200).json({ session });
}
