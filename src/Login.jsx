import { Helmet } from 'react-helmet-async';

const CDN_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs';
const TACKINGJS_CDN = `${CDN_BASE_URL}/tracking.js/1.1.3/tracking-min.js`;
const FACEJS_CDN = `${CDN_BASE_URL}/tracking.js/1.1.3/data/face-min.js`;

function Login() {

  return (
    <>
      <h1>CAMERA</h1>
      <Helmet>
        <title>Login page!</title>
        <meta name='description' content='You are about to login biometrically.' />
        <script async src={TACKINGJS_CDN} type="text/javascript"/>
        <script async src={FACEJS_CDN} type="text/javascript"/>
    </Helmet>
    </>
  )
}

export default Login
