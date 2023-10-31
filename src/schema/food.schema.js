import Joi from 'joi';

const foodSchema = Joi.object({
    code: Joi.string()
});

export default foodSchema;