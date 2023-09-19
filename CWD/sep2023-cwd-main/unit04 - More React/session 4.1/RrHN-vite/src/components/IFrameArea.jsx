function IFrameArea(props) {
  return (
    <div id="ItemPanel">
      <iframe
      className="IFrameView"
      src={props.iframeUrl}
      sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"
      ></iframe>
    </div>
  );
}

export default IFrameArea;
