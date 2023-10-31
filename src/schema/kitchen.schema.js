import Joi from 'joi';

const kitchenSchema = Joi.object({
    money: Joi.string().required(),
    payment: Joi.string().equal('CREDIT', 'DEBIT', 'MONEY').required(),
    name: Joi.string().required().required(),
    foodId: Joi.number().integer().required(),
    observation: Joi.string(),
});

export default kitchenSchema;