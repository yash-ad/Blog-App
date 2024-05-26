// Import necessary dependencies
import { Link } from 'react-router-dom';
import Logo from '../Logo'; // Assuming you have a Logo component defined

// Define a constant for common link styles
const commonLinkClass = 'text-base font-medium text-white/60 text-xs hover:text-white/60';

// Define a functional component for each footer link
const FooterLink = ({ to, text }) => (
  <li className="mb-4">
    <Link className={commonLinkClass} to={to}>
      {text}
    </Link>
  </li>
);

// Define the Footer component
function Footer() {
  return (
    <section className="overflow-hidden pt-10 pb-10 bg-[#00040F] text-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo and Copyright */}
          <div className="w-full p-6 md:w-full lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" /> {/* Assuming Logo component takes width prop */}
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2024. All Rights Reserved By Yash Dandnaik.
                </p>
              </div>
            </div>
          </div>
          {/* Company Links */}
          <div className="w-full p-6 md:w-1/3 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-white">
                Company
              </h3>
              <ul>
                <FooterLink to="/" text="Features" />
                <FooterLink to="/" text="Pricing" />
                <FooterLink to="/" text="Affiliate Program" />
                <FooterLink to="/" text="Press Kit" />
              </ul>
            </div>
          </div>
          {/* Support Links */}
          <div className="w-full p-6 md:w-1/3 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-white">
                Support
              </h3>
              <ul>
                <FooterLink to="/" text="Account" />
                <FooterLink to="/" text="Help" />
                <FooterLink to="/" text="Contact Us" />
                <FooterLink to="/" text="Customer Support" />
              </ul>
            </div>
          </div>
          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/3 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-white">
                Legals
              </h3>
              <ul>
                <FooterLink to="/" text="Terms & Conditions" />
                <FooterLink to="/" text="Privacy Policy" />
                <FooterLink to="/" text="Licensing" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export the Footer component
export default Footer;
