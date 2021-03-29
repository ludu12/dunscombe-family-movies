import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export function createHandlers(handlers: {
  POST?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  GET?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
}) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const handler = handlers[req.method];
    if (handler) {
      try {
        await handler(req, res);
      } catch (err) {
        res.status(err.status || 500).end(err.message);
      }
    } else {
      res.setHeader('Allow', Object.keys(handlers));
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
}

export async function graphqlRequest<TData>(
  body: string,
  token: string
): Promise<TData> {
  const response = await axios.post<TData>(
    `https://graphql.fauna.com/graphql`,
    body,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}
