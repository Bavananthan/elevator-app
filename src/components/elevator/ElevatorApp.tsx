import ElevatorShaft from "./ElevatorShaft";
import ElevatorPanel from "./ElevatorPanel";
import FloorButtons from "./FloorButtons";
import { useElevatorController } from "../../hooks/useElevatorController";
import type { Floor } from "../../constants/floors";
import type { JSX } from "react";


export default function ElevatorApp(): JSX.Element {
    const {
        currentFloor,
        direction,
        cabinRequests,
        hallUpRequests,
        hallDownRequests,
        requestFloor,
        clearAll
    } = useElevatorController();

    function handleOutsideCall(floor: Floor, direction: "up" | "down") {
        requestFloor(floor, direction);
    }

    const allPending = [...cabinRequests, ...hallUpRequests, ...hallDownRequests];

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="flex items-start gap-6">
                    <div>


                        <div className="flex gap-4 items-start justify-center">
                            <ElevatorShaft
                                floors={[4, 3, 2, 1, 0]}
                                currentFloor={currentFloor}
                                onCall={handleOutsideCall}
                                hallUpRequests={hallUpRequests}
                                hallDownRequests={hallDownRequests}
                            />

                            <div className="w-40 md:w-56 flex flex-col gap-4">
                                <ElevatorPanel
                                    currentFloor={currentFloor}
                                    direction={direction}
                                    pending={allPending}
                                    onGoToCurrent={() => requestFloor(currentFloor)}
                                    onClear={() => clearAll()}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col gap-4">
                    <div className="text-sm text-slate-600">Cabin Controls</div>
                    <FloorButtons
                        pending={cabinRequests}
                        onPress={(f) => requestFloor(f)}
                    />

                </div>
            </div>
        </div>
    );
}
