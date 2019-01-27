const Mutations = {
    createLocation(parent, args, ctx, info) {

        const location = ctx.db.mutation.createLocation({
            data: {
                ...args
            }
                
        }, info);

        return location;
    },

    updateLocation(parent, args, ctx, info) {
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
      }
};

module.exports = Mutations;
