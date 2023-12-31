import PropTypes from "prop-types";
const Avt = ({ imageUrl }) => {
  const defaultImageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  return (
    <div
      className="relative inline-block w-10 h-10  bg-cover rounded-[40px] bg-no-repeat border-[1px] cursor-pointer border-[#ffff]"
      style={{
        backgroundImage: imageUrl
          ? `url(${imageUrl})`
          : `url(${defaultImageUrl})`,
      }}
    ></div>
  );
};
Avt.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
export default Avt;
