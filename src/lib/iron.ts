import Iron from '@hapi/iron';

export async function encrypt(data: unknown): Promise<string> {
  return data && Iron.seal(data, process.env.ENCRYPTION_SECRET, Iron.defaults);
}

export async function decrypt(data: string): Promise<any> {
  return (
    data && Iron.unseal(data, process.env.ENCRYPTION_SECRET, Iron.defaults)
  );
}
