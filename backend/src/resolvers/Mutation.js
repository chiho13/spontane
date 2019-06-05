const Auth = require('./Auth');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const {transport, niceEmail} = require('../mail');

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
                  //this is how to create a relationship between Location and the user
                  user: {
                    connect: {
                        id: ctx.request.userId
                    }
                },
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
    },
    async requestReset(parent, args, ctx, info) {
        // 1. check if this is a real user
        const user = await ctx.db.query.user({ where: {email: args.email}});

        if(!user) {
            throw new Error(`No such user found for email ${args.email}`);
        }
        // 2. set a reset token and expiry on that user
        const randomBytesPromiseified = promisify(randomBytes);
        const resetToken = (await randomBytesPromiseified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; //1 hour from now

        const res = await ctx.db.mutation.updateUser({
            where: { email: args.email},
            data: { resetToken, resetTokenExpiry}
        });

        //3 / Email user reset token

        const mailRes = await transport.sendMail({
            from: 'a.chiho13@gmail.com',
            to: user.email,
            subject: 'Your password reset token',
            html: niceEmail(`Your password reset token is here 
            \n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset</a>`)
        });

        // 4. Email them a reset token
        return {message: 'Cheers'};
    },

    resetPassword(parent, args, ctx, info) {
       const updatedUser = Auth.resetPassword(parent, args, ctx, info);
       return updatedUser;
    }
};

module.exports = Mutations;
