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
    for (let i = 0; i < 4; i++) {
        await prisma.food.createMany({
            data: [{
                name: 'Hambúrguer',
                description: '2x hambúrguer 200g, queijo cheddar, tomate, alface, picles, cebola, molho da casa',
                category: 'COMBOS',
                subDescription: '2x hambúrguer 200g',
                image: 'https://www.incrivel.com/_next/image/?url=https%3A%2F%2Fincrivel-prd.adtsys.com.br%2Fwp-content%2Fuploads%2F2022%2F11%2Fburger_carne_incri%CC%81vel.png&w=828&q=75',
                price: 3050,
                code: '201'
            }, {
                name: 'Batata Frita',
                description: 'Batata frita, ketchup e maionese',
                category: 'FOLLOWUP',
                subDescription: 'Batata frita',
                image: 'https://www.pngmart.com/files/17/Potato-Fries-PNG-File.png',
                price: 1050,
                code: '201'
            }, {
                name: 'Refrigerante',
                description: 'Guarana, Coca-Cola e Fanta',
                category: 'DRINKS',
                subDescription: 'Refrigerante 2L',
                image: 'https://looklanches.com.br/wp-content/uploads/2020/09/2l.png',
                price: 1550,
                code: '202'
            }, {
                name: 'Sobremesa',
                description: 'Sobremesa',
                category: 'DESSERTS',
                subDescription: 'Sobremesa',
                image: 'https://img.freepik.com/fotos-premium/uma-sobremesa-com-uma-colher-marrom-em-um-prato-com-fundo-branco_391229-6166.jpg?w=826',
                price: 3050,
                code: '203'
            }
            ]
        });

    
    }
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