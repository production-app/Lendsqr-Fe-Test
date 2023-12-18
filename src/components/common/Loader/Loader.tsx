import classnames from "classnames";
import PropTypes from "prop-types";
import "./_loader.scss";

interface LoadingDotsProps {
  size?: "default" | "sm";
}

const Loader: React.FC<LoadingDotsProps> = ({ size = "default" }) => {
  return (
    <span className="loading-dots">
      {[...Array(3)].map((_, index: number) => (
        <span
          className={classnames("dot", { smallDot: size === "sm" })}
          key={`dot_${index + 1}`}
        />
      ))}
    </span>
  );
};

export default Loader;

Loader.propTypes = {
  size: PropTypes.oneOf(["default", "sm"]),
};
