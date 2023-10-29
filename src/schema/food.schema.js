import Joi from "joi";

const foodSchema = Joi.object({
    name: Joi.string(),
    code: Joi.number().integer()
})

export default foodSchema