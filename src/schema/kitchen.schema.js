import Joi from 'joi'

export const kitchenSchema = Joi.object({
    valueDelivered: Joi.string().required(),
    payment: Joi.string().equal('CREDIT', 'DEBIT', 'MONEY').required(),
    name: Joi.string().required().required(),
    foodId: Joi.number().integer().required(),
    change: Joi.number().integer().required(),
    observation: Joi.string().allow(''),
    quant: Joi.number().integer().required(),
    adds: Joi.array().items(
        Joi.object({ 
            name: Joi.string().required(),
            price: Joi.number().required(),
            qnt: Joi.string().required()
        })
        )
})

export const kitchenIdSchema = Joi.object({
    id: Joi.number().integer().required(),
})
