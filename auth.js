require('dotenv').config(); // Carrega as variáveis de ambiente
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Obtém os dados sensíveis do arquivo .env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // Aqui você pode salvar o perfil do usuário no banco, se necessário
            return done(null, profile);
        }
    )
);

// Serialização e desserialização do usuário (necessário para sessões)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
