import ProgressBar from "@/components/atoms/progress-bar";
import { STAT_LABELS } from "@/utils/constants";

interface Stat {
  name: string;
  value: number;
}

interface StatsProps {
  statsData: Stat[];
}

const Stats = ({ statsData }: StatsProps) => {
  return (
    <section className="mt-10 p-8 bg-pastelblue sm:rounded-lg sm:mx-10">
      <h3 className=" text-darkblue font-medium">Stats</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2 mt-4">
        {statsData.map((stat: { name: string; value: number }) => (
          <ProgressBar
            key={stat.name}
            label={STAT_LABELS[stat.name]}
            value={stat.value}
          />
        ))}
      </div>
    </section>
  );
};

export default Stats;
