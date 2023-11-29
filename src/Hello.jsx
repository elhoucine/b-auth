import { Helmet } from 'react-helmet-async';

function Hello() {
  return (
    <>
      <Helmet>
          <title>Hello page!</title>
          <meta name='description' content='You made it to this page biometrically.' />
      </Helmet>
      <h1>Hello!</h1>
    </>
  )
}

export default Hello
