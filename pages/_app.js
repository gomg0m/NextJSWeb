import '../styles/globals.css';
import Footer from "../src/fix/Footer";
import Header from "../src/fix/Header";
import Leftside from '../src/fix/Leftside';
import Rightside from '../src/fix/Rightside';

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
