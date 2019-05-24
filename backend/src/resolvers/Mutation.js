const Auth = require('./Auth');

const Mutations = {
    async createGeoLocation(parent, args, ctx, info) {

        const geolocation = await ctx.db.mutation.createGeoLocation({
            data: {
                ...args
            }
                
        }, info);

        return geolocation;
    },

    async createLocation(parent, args, ctx, info) {

        const location = await ctx.db.mutation.createLocation({
            data: {
                ...args
            }
                
        }, info);

        return location;
    },

    async updateLocation(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = { ...args };
        // remove the ID from the updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateLocation(
          {
            data: updates,
            where: {
              id: args.id,
            },
          },
          info
        );
      },

    async deleteLocation(parent, args, ctx, info) {
          const where = {id: args.id}

        //   const location = await ctx.db.query.location({where}, `id title`);

          return ctx.db.mutation.deleteLocation({ where }, info);
    },

    signup(parent, args, ctx, info) {
        const user = Auth.signup(parent, args, ctx, info);
        return user
    },

    login(parent, args, ctx, info) {
        const user = Auth.login(parent, args, ctx, info);
        return user
    },

    logout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'Goodbye'}
    }
};

module.exports = Mutations;
