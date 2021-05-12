import { Amplify } from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../src/aws-exports";
import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <AmplifyAuthenticator>
      <Component {...pageProps} />
    </AmplifyAuthenticator>
  );
}

export default MyApp;
