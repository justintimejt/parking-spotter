import { useState, useImperativeHandle, forwardRef } from "react";
import "../styles/keyStatistics.css";

interface StatisticProps {
  statisticNum: string;
  statisticDescription: string;
}

const Statistic: React.FC<StatisticProps> = ({ statisticNum, statisticDescription }) => {
  return (
    <>
      <div className="key-statistic-container">
        <p className="key-statistic-title">{statisticNum}</p>
        <p className="key-statistic-description">{statisticDescription}</p>
      </div>
    </>
  );
};

interface KeyStatisticsHandle {
  updateStatistics: (stats: StatisticProps[]) => void;
}

const KeyStatistics = forwardRef<KeyStatisticsHandle>((_, ref) => {
  const [statistics, setStatistics] = useState<StatisticProps[]>([]);

  // Expose setStatistics via useImperativeHandle
  useImperativeHandle(ref, () => ({
    updateStatistics: (stats: StatisticProps[]) => setStatistics(stats),
  }));

  return (
    <>
      <div className="key-statistics-container">
        {statistics.length > 0 ? (
          statistics.map((stat, index) => (
            <Statistic key={index} statisticNum={stat.statisticNum} statisticDescription={stat.statisticDescription} />
          ))
        ) : (
          <>
            <Statistic statisticNum={"2332"} statisticDescription="23" />
            <Statistic statisticNum={"2332"} statisticDescription="23" />
            <Statistic statisticNum={"2332"} statisticDescription="23" />
            <Statistic statisticNum={"2332"} statisticDescription="23" />
          </>
        )}
      </div>
    </>
  );
});

export { KeyStatistics };