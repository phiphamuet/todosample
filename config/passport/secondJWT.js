const passportJWT = require("passport-jwt");
const _ = require('lodash');

const users = [
    {
        id: 1,
        username: 'phipham',
        password: '123456',
        permissions: ['todo_manage', 'permission_name']
    }, {
        id: 2,
        username: 'chotoxautinh',
        password: '123456',
        permissions: ['permission_name']
    }
];

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'});
jwtOptions.secretOrKey = 'demacia world';

module.exports = (app) => new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    let id = jwt_payload.id;

    const user = _.find(users, {id});
    if (!user)
        return next('User not found');
    return next(null, user);
});