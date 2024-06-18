import Joi from 'joi';

export const validateOrder = (order: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        productId: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
    });

    return schema.validate(order);
};
