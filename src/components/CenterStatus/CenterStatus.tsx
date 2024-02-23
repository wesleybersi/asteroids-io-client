import styles from "./styles.module.scss";

interface Props {
  health: number;
  force: number;
  floor: number;
  boost: number;
  shield: { amount: number; isActive: boolean; isCharging: boolean };
  overload: number;
  isOverloaded: boolean;
}

const CenterStatus: React.FC<Props> = ({
  health,
  force,
  floor,
  boost,
  shield,
  overload,
  isOverloaded,
}) => {
  return (
    <section className={styles.status}>
      <div className={styles.scores}>Floor: {floor}</div>
      <div className={styles.counter}>
        <div
          className={styles.current}
          style={{ width: health + "%", background: "#48B51B" }}
        ></div>
        <div className={styles.text}>{health}%</div>
      </div>
      {/* <div className={styles.armor}>
        <div
          className={styles.current}
          style={{ width: armor + "%", background: "#00599D" }}
        ></div>

      </div> */}
      {/* <div className={styles.counter}>
        {force > 10 && (
          <div
            className={styles.current}
            style={{ width: force + "%", background: "#C12804" }}
          ></div>
        )}
      </div> */}
      {/* <div className={styles.counter}>
        <div
          className={styles.current}
          style={{
            width: Math.floor(boost * 100) + "%",
            background: boostColors[Math.floor(boost * 20)],
          }}
        ></div>
      </div> */}
      <div className={styles.counter}>
        <div
          className={styles.current}
          style={{
            width: Math.floor(shield.amount * 100) + "%",
            background: boostColors[Math.floor(shield.amount * 20)],
          }}
        ></div>
      </div>
      <div className={styles.counter}>
        <div
          className={styles.current}
          style={{
            width: Math.floor(overload * 100) + "%",
            background: isOverloaded ? "#c12804" : "#E04BDD",
          }}
        ></div>
      </div>
    </section>
  );
};

export default CenterStatus;

const boostColors = [
  "#c12804",
  "#ad2d14",
  "#983224",
  "#843734",
  "#703d44",
  "#5b4255",
  "#474765",
  "#334c75",
  "#1e5185",
  "#0a5695",
  "#00599d",
  "#00599d",
  "#00599d",
  "#00599d",
  "#00599d",
  "#00599d",
  "#00599d",
  "#00599d",
  "#00599d",
  "#00599d",
];
