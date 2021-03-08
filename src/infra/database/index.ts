import { createConnections, Connection } from 'typeorm';

export const openConnection = async (): Promise<Connection[]> =>
  createConnections();
