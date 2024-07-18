interface ProgressBarProps {
  label: string;
  value: number;
}

const ProgressBar = ({ label, value }: ProgressBarProps) => {
  return (
    <div className="flex items-center mb-2">
      <p className=" w-20 text-darkblue capitalize">{label}</p>
      <div className="flex-1 flex items-center ml-2">
        <div className="w-full bg-bluegray h-4 relative flex">
          {/* <p className="text-white font-semibold text-xs w-8 absolute left-2">{value}</p> */}
          <div
            className="bg-darkblue h-full text-white flex items-center text-xs pl-1"
            style={{ width: `${value}%` }}
            data-testid="progress-bar"
          >{value}</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
