import { createHandlers } from '../../lib/rest-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession, validateSession } from '../../lib/auth-cookies';

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = { date: Date.now(), answer: req.body.answer };
    if (validateSession(session)) {
      await createSession(req, res, {
        date: Date.now(),
        answer: req.body.answer,
      });
      res.status(200).send({ done: true });
    } else {
      res.status(401).send({ message: 'Incorrect Answer' });
    }
  },
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
