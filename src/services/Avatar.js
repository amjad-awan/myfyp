const Avatar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let splitted = user?.name.split(" ");
  return (
    user && (
      <p className="userToggle">
        {`${splitted ? splitted[0].slice(0, 1).toUpperCase() : ""}${
          splitted[1] ? splitted[1]?.slice(0, 1).toUpperCase() : ""
        }`}
      </p>
    )
  );
};
export default Avatar;
