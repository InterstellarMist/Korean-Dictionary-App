import { Link } from 'react-router';
import logo from '../../assets/korean dictionary logo.png'

export interface LogoProps {
  styles?: React.CSSProperties;
}

const Logo = ({ styles }: LogoProps) => {
  return (
    <Link to="/" style={{ ...styles }} tabIndex={-1}>
      <img src={logo} alt="logo" style={{ ...styles }} />
    </Link>
  )
};

export default Logo;