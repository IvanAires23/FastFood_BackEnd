/* eslint-disable no-useless-return */
import prisma from '../../src/config/database.js'

async function cleanDB() {
    await prisma.kitchen.deleteMany()
    await prisma.food.deleteMany()
    return
}

test('Exemplo de teste de limpeza de banco de dados', () => {
    // Este teste não faz nada, é apenas um marcador.
  });

export default cleanDB
