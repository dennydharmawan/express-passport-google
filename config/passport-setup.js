const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const cookieSession = require('cookie-session');
const { ObjectId } = require('mongodb');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  console.log('SERIALIZE');
  console.log(user);

  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  (async (arguments) => {
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGO_CONNECTION_STRING;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    await client.connect();

    const User = client.db('passport').collection('User');

    const [user] = await User.find({ _id: ObjectId(_id) }).toArray();
    console.log('DESERIALIZE');
    console.log(user);

    done(null, user);
  })();
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      (async () => {
        const MongoClient = require('mongodb').MongoClient;
        const uri = process.env.MONGO_CONNECTION_STRING;
        const client = new MongoClient(uri, { useNewUrlParser: true });

        await client.connect();

        const User = client.db('passport').collection('User');

        const commandResult = await User.findOneAndUpdate(
          { googleid: profile.id },
          {
            $set: {
              googleid: profile.id,
              username: profile.displayName,
            },
          },
          {
            returnOriginal: false,
            upsert: true,
          }
        );

        const user = commandResult.value;
        console.log('RESULT');
        console.log(user);
        client.close(); // open and closing db like this is bad

        done(null, user);
      })();
    }
  )
);
