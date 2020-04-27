const { forwardTo } = require('prisma-binding');

const Query = {
    locations: forwardTo('db'),
    location: forwardTo('db'),
    locationsConnection: forwardTo('db'),
    projects: forwardTo('db'),
    project: forwardTo('db'),
    projectsConnection: forwardTo('db'),

    me(parent, args, ctx, info) {
        //check if there is a current user Id
        if(!ctx.request.userId) {
            return null;
        }

        return ctx.db.query.user({
            where: {id: ctx.request.userId}
        }, info);
    }
};

module.exports = Query;
