import Head from 'next/head';

const Meta = () => (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=no"/>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <script src='/static/nprogress.js'></script>
        <link rel="stylesheet" type="text.css" href="/static/nprogress.css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet" />
    </Head>
);

export default Meta