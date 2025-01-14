import "./Loading.css";

export const LoadingComponent = ({ loaderType = "large" }) => {
  return (
    <div className={loaderType === "small" ? "" : "loader-container"}>
      <div className={loaderType === "small" ? "small-loader" : "loader"}></div>
    </div>
  );
};
