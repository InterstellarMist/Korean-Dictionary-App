import { Link } from 'react-router';
import { motion } from 'motion/react';
import logo from '../../assets/korean dictionary logo.png'

export interface LogoProps {
  styles?: React.CSSProperties;
}

const Logo = ({ styles }: LogoProps) => {
  return (
    <Link to="/" style={{ ...styles }} tabIndex={-1}>
      <motion.img
        layoutId="logo"
        src={logo}
        alt="logo"
        style={{ ...styles }}
        // transition={{ duration: 0.25 }}
        transition={{ duration: 0.25, type: 'spring', mass: 1, stiffness: 300 }}
      />
    </Link>
  )
};

export default Logo;