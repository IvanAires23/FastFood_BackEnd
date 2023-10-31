async function create(body){
    if(body.name === '') throw { name: 'badRequest' };
}

const kitchenService = {
    create
};

export default kitchenService;