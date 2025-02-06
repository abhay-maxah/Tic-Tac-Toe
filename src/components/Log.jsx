export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn, turnIndex) => (
        <li key={turnIndex}>
          {turn.player} Select{turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
