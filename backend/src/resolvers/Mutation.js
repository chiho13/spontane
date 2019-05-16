const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

      async signup(parent, args, ctx, info) {
        // lowercase their email
        args.email = args.email.toLowerCase();
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in the database
        const user = await ctx.db.mutation.createUser(
          {
            data: {
              ...args,
              password,
              permissions: { set: ['USER'] },
            },
          },
          info
        );
        // create the JWT token for them
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // We set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        // Finalllllly we return the user to the browser
        return user;
      },
};

module.exports = Mutations;
