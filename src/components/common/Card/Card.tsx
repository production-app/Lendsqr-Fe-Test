import classnames from "classnames";
import "./_card.scss";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return <div className={classnames("card", className)}>{children}</div>;
};

export default Card;
