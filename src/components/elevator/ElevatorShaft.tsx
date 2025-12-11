import type { Floor } from "../../constants/floors";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Props {
    floors: Floor[];
    currentFloor: Floor;
    onCall: (floor: Floor, direction: "up" | "down") => void;

    hallUpRequests: Floor[];
    hallDownRequests: Floor[];
}

export default function ElevatorShaft({ floors, currentFloor, onCall, hallUpRequests, hallDownRequests }: Props) {

    return (
        <div className="w-40 md:w-48 bg-slate-50 border rounded-lg shadow-inner overflow-hidden flex flex-col">

            {floors.map((floor) => {
                const isElevatorHere = currentFloor === floor;

                const isUpActive = hallUpRequests.includes(floor);
                const isDownActive = hallDownRequests.includes(floor);

                return (
                    <div
                        key={floor}
                        className="flex items-center justify-between border-b border-slate-200 p-2 last:border-b-0"
                    >




                        <div className="flex gap-1">

                            {floor < Math.max(...floors) && (
                                <button
                                    onClick={() => onCall(floor, "up")}
                                    className={`w-8 h-6 text-xs rounded-md border transition 
                                            ${isUpActive
                                            ? "bg-yellow-300 border-yellow-400"
                                            : "bg-white border-slate-200 hover:bg-slate-50"
                                        }`}
                                    aria-label={`Call up on floor ${floor}`}
                                    aria-pressed={isUpActive}
                                >
                                    <ArrowUp />
                                </button>
                            )}

                            {floor > Math.min(...floors) && (
                                <button
                                    onClick={() => onCall(floor, "down")}
                                    className={`w-8 h-6 text-xs rounded-md border transition 
                                            ${isDownActive
                                            ? "bg-yellow-300 border-yellow-400"
                                            : "bg-white border-slate-200 hover:bg-slate-50"
                                        }`}
                                    aria-label={`Call down on floor ${floor}`}
                                    aria-pressed={isDownActive}
                                >
                                    <ArrowDown />
                                </button>
                            )}
                        </div>



                        <div className="flex items-center justify-center mt-2">
                            <div
                                className={`w-28 h-10 rounded-md flex items-center justify-center text-lg font-semibold transition-all
                                    ${isElevatorHere
                                        ? "bg-emerald-600 text-white shadow"
                                        : "bg-white text-slate-600 border border-slate-100"
                                    }`}
                            >
                                {isElevatorHere ? currentFloor : floor}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
