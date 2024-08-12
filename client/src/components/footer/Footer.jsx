import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import '../footer/footer.css';



export default function Footer() {


  return (
    <div className='footer__container'>
      <section className='footer__header'>
        <div className="footer__location">
          <span>Gorog-Tongo Bolgatanga</span>
          <span>Upper East Region</span>
          <span>Ghana, West Africa</span>
        </div>
        <div className="footer__contacts">
          <span>Contact</span>
          <span><PhoneIcon/> Tel: 0201156150 & 0274989534</span>
          <span> <EmailIcon />Email: rockviewhotel@yahoo.com</span>
          <span></span>
        </div>
        <div className="footer__socials ">
          <span><FacebookIcon/> Facebook</span>
          <span><InstagramIcon/> Instagram</span>
          <span><TwitterIcon/> Twitter</span>
        </div>
      </section>
    </div>
  )
}
