import '../styles/globals.css';
import Footer from "../src/fix/Footer";
import Header from "../src/fix/Header";
import Leftside from '../src/fix/Leftside';
import Rightside from '../src/fix/Rightside';
import styles from './App.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <div> 
      
        <Component {...pageProps} />
     
        
    </div>
  );
}

export default MyApp;
