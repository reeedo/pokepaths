import React from 'react';

const Commander = ({onSize, onFindPath}) => {
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSize(e.target.value);
    }
  }
  const onButtonClick = (e) => {
    onFindPath();
  }
  return (
    <div className="cmdCtnr">
      <div className="gridSizeCtnr">
        <label className="gridSizeLabel" htmlFor="#gridSize" title="Grid width and height">
          Enter Grid Size:
        </label>
        <input className="gridSizeInput" type="text" id="gridSize" onKeyPress={onKeyPress}/>
      </div>
      <div className="runBtnCtnr">
        <button className="runBtn" onClick={onButtonClick}>Find Path</button>
      </div>
    </div>
  );
}

export default Commander;
