interface FooterProps {}

const Footer = (props: FooterProps) => {
  return (
    <footer className="bg-gray-100 p-4 w-full text-center">
      <h3 className="text-3xl">Want more?</h3>
      Find me on {` `}
      <a className="text-green-550" href="https://cybre.gg/@ctrlsquid">
        my mastadon, cybre.gg
      </a>
    </footer>
  );
};

export default Footer;
