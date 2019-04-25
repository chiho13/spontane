const { forwardTo } = require('prisma-binding');

const Query = {
    locations: forwardTo('db'),
    location: forwardTo('db'),
    locationsConnection: forwardTo('db')
    // async locations(parent, args, ctx, info) {
    //     const locations = await ctx.db.query.locations;
    //     return locations;
    // }
};

module.exports = Query;
