require('dotenv').config();

const createItemDefault = (envKey, defaultValue, description) => {
    const value = process.env[envKey] || defaultValue;
    return {
        value: value,
        envKey: envKey,
        isDefault: typeof process.env[envKey] === 'undefined',
        isValueUndefined: typeof value === 'undefined', 
        description: description
    }
};

/*
 * @dev TODO Add Comments
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 * 
 */
module.exports = {
    createItemDefault: createItemDefault,
    createItem: (envKey, description) => {
        return createItemDefault(envKey, undefined, description);
    }
}