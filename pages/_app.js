import '../styles/globals.css';
import Footer from "../src/component/Footer";
import Header from "../src/component/Header";
import Leftside from '../src/component/Leftside';
import Rightside from '../src/component/Rightside';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Leftside />
      <Rightside />
        {/* <Component {...pageProps} /> */}
      <Footer />
    </div>
  );
}

export default MyApp;
