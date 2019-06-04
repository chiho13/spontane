const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = {
      async signup(parent, args, ctx, info) {
        // lowercase their email
            //check if password match

            if(args.password !== args.confirmPassword) {
                throw new Error('passwords don\'t match');
            }
        args.email = args.email.toLowerCase();

    
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in the database
        const user = await ctx.db.mutation.createUser(
          {
            data: {
              email: args.email,
              name: args.name,
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
          maxAge: 1000 * 60 * 60 * 24, // 1 year cookie
        });
        // Finalllllly we return the user to the browser
        return user;
      },

      async login(parent, {email, password}, ctx, info) {
        //check if there is user with that email
        if (!/\S+@\S+\.\S+/.test(email)) {
          throw new Error(`Invalid Email address`);
        }
        const user = await ctx.db.query.user({ where: {email}});

        if(!user) {
            throw new Error(`No such user found for email ${email}`);
        }
        //check if their password is correct
        const valid = await bcrypt.compare(password, user.password);

        if(!valid) {
            throw new Error('Invalid password');
        }
        //generate the jwt token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        //set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 year cookie
          });
        // return the user
        return user

      },

      async resetPassword(parent, args, ctx, info) {
           // 1. check if the passwords match
        if(args.password !== args.confirmPassword) {
            throw new Error('passwords don\'t match');
        }
        // 2. check if it's a legit reset token
        // 3. check if it's expired
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000
            }
        });

        if(!user) {
            throw new Error('This token is either invalid or expired');
        }

        // 4. Hash the new password
        const password = await bcrypt.hash(args.password, 10);
        // 5. Save the password to the user and remove old reset token fields
        const updatedUser = await ctx.db.mutation.updateUser({
            where: { email:  user.email},
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null
            }
        });
        // 6. Generate JWT
        const token = jwt.sign({ userId: updatedUser.id}, process.env.APP_SECRET);
        // 7. Set the JWT cookie
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60  * 24 * 365
        });
        // 8. return the user
        return updatedUser;
        // 9. 

      }
};

module.exports = Auth;
