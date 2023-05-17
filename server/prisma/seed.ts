import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const memories = [
    {
      content:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit tempora deserunt incidunt! Dolor mollitia tenetur officia iste quis praesentium culpa sed? A facere id explicabo nemo omnis. Dignissimos, tenetur tempora!',
      coverUrl: 'https://github.com/joao0pedro0alves.png',
    },
    // { content: '', coverUrl: '' },
  ]

  // Create User
  const user = await prisma.user.create({
    data: {
      githubId: 0,
      name: 'João Pedro Alves',
      login: 'joaoalves',
      avatarUrl: 'https://github.com/joao0pedro0alves.png',
    },
  })

  // Create Memories
  const userMemories = memories.map((memory) =>
    prisma.memory.create({
      data: {
        content: memory.content,
        coverUrl: memory.coverUrl,
        userId: user.id,
      },
    }),
  )

  await Promise.all(userMemories)
}

main()
