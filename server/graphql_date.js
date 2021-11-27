const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const GraphQLDateTime = new GraphQLScalarType({
    name: 'GraphQLDateTime',
    description: 'A DateTime() type in GraphQL as a scalar',
    serialize(value) {
        return value.toLocaleString();
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if (ast.kind == Kind.STRING) {
        const value = new Date(ast.value);
        return isNaN(value) ? undefined : value;
        }
    },
});

module.exports = GraphQLDateTime;