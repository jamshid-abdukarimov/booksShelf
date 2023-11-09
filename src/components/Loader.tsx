import "./loader.css";

const Loader = ({ main = false }: { main?: boolean }) => {
  return main ? (
    <div className="main-loader">
      <span className="loader"></span>
    </div>
  ) : (
    <span className="loader"></span>
  );
};

export default Loader;
