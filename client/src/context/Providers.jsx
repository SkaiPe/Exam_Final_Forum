import PropTypes from "prop-types";
import { UserProvider } from "./UserContext";

// čia dedami ir wrappinami visi provideriai iš context folderio

const Providers = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
