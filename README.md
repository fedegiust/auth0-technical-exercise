# List of Rules per Application

This solution gives you on screen a list of Rules per auth0 account. Since the rules are generally per tenant, but we can limit some rules per application, this will give you a detailed list of the rules and their application by extracting the name from the rule code snippet.

By default all your users will get access to this application, so remember to whitelist them accordingly, using the Rules in your account.

For example

|Order | Id	                  | Application Name	 | Enabled |
|------|----------------------|----------------------|---------|
|1	   |rul_3ZtKKXLeeCBJeqic  |Generic rule	         | false   |
|2	   |rul_T2PBFgEm2E6EaJJO  |TheAppToCheckAccessTo | true    |

## Requirements

You need create a Non Interactive Client under your account on Auth0 with access to the management api (https://auth0.com/docs/api/management/v2/tokens).

## Running the Sample

Install the dependencies.

```bash
npm install
```

Rename `.env.example` to `.env` and replace the values for `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, and `AUTH0_CLIENT_SECRET` with your Auth0 credentials. If you don't yet have an Auth0 account, [sign up](https://auth0.com/signup) for free.

```bash
# copy configuration and replace with your own
cp .env.example .env
```

Run the app.

```bash
npm start
```

The app will be served at `localhost:3000`.

##

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.