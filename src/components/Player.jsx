import { useState } from "react";

export default function Player({ name, symbol, isActive ,onChangeName}) {
  const [playerNames, setPlayerName] = useState(name);
  const [isEdit, setISEdit] = useState(false);
  function EditHandler() {
    setISEdit((edit) => !edit);
    if(!isEdit){
      onChangeName(symbol,playerNames)
    }
  }
  function changeHandle(event) {
    setPlayerName(event.target.value);
  }
  let playerName = <span className="player-name">{playerNames}</span>;
  let btnCaption = "Edit";
  if (isEdit === true) {
    playerName = (
      <input type="text" value={playerNames} onChange={changeHandle} required />
    );
    btnCaption = "Save";
  }
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={EditHandler}>{btnCaption}</button>
      </li>
    </>
  );
}
