import { Linescore } from "../types/mlb/Schedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

export const Bases = ({ linescore }: { linescore: Linescore }) => {
  const outs = [];

  for (let i = 0; i < 3; i++) {
    if (linescore?.outs && i < linescore.outs) {
      outs.push(
        <FontAwesomeIcon
          key={i}
          icon={faCircleSolid}
          className="text-red-800"
        />,
      );
      continue;
    }
    outs.push(<FontAwesomeIcon key={i} icon={faCircle} />);
  }

  return (
    <div className="col-span-2 row-span-2 ">
      <div className="relative mx-auto my-3 h-16 w-24">
        <div
          className={`mx-auto h-8 w-8 rotate-45 border-2 border-black transition-colors ${linescore.offense.second && "bg-orange-700"}`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 inline-block h-8 w-8 rotate-45 border-2 border-black transition-colors ${linescore.offense.third && "bg-orange-700"} `}
        ></div>
        <div
          className={`absolute bottom-0 right-0 inline-block h-8 w-8 rotate-45 border-2 border-black transition-colors ${linescore.offense.first && "bg-orange-700"}`}
        ></div>
        <div className="absolute -bottom-2 right-1/2 flex translate-x-1/2 gap-1 text-xs">
          {outs}
        </div>
      </div>
    </div>
  );
};
