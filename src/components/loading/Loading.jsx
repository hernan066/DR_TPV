import "./loading.css";

function Loading() {
  return (
    <div className="loading_container">
      <div className="lds-ring1">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
