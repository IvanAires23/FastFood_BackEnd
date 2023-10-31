import prisma from '../src/config/database.js';

async function getDefaultFood() {
    const food = await prisma.food.findFirst({
        where: {
            name: 'Hambúrguer'
        }
    });

    return food;
}

async function createDefaultFood() {
    console.log('Creating default food!');
    const food = await prisma.food.createMany({
        data: {
            name: 'Hambúrguer',
            description: '2x hambúrguer 200g, queijo cheddar, tomate, alface, picles, cebola, molho da casa',
            categoryId: 'COMBOS',
            price: 3050,
            code: 200
        }
    });

    return food;
}

async function checkOrCreateDefaultFood() {
    const food = await getDefaultFood();
    if (!food) await createDefaultFood();
    else console.log('Default food already created.');

    return food;
}

// execução
(async () => {
    console.log('executing system');
    await checkOrCreateDefaultFood();
})(); // IIFE