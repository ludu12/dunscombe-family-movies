import { createHandlers, graphqlRequest } from '../../lib/rest-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const data = await graphqlRequest(req.body, process.env.FAUNA_SERVER_KEY);
    res.status(200).json(data);
  },
};

export default function graphql(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
