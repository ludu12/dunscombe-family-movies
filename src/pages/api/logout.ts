import { removeSession } from '../../lib/auth-cookies';
import { createHandlers } from '../../lib/rest-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    removeSession(req, res);
    res.writeHead(302, { Location: '/' });
    res.end();
  },
};

export default function logout(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
