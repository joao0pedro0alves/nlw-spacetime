import { FastifyInstance } from 'fastify'

export async function authenticateRequest(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
}
