import { createHandlers } from '../../lib/rest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../lib/auth-cookies';

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    // await createSession(res, { id: user.ref.id, token, email, issuer });
    res.status(200).send({ done: true });
  },
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
