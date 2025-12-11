import type { Floor } from "../../constants/floors";

interface Props {
    currentFloor: Floor;
    direction: "up" | "down" | null;
    pending: Floor[];
    onGoToCurrent: () => void;
    onClear: () => void;
}

export default function ElevatorPanel({ currentFloor, direction, pending, onGoToCurrent, onClear }: Props) {
    return (
        <div className="w-48 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border text-center">
                <div className="text-xs text-slate-500">Current Floor</div>
                <div className="text-4xl font-extrabold">{currentFloor}</div>
                <div className="text-sm text-slate-400 mt-1">{direction ? `Moving ${direction}` : "Idle"}</div>
            </div>

            <div className="p-3 rounded-lg bg-white border text-sm">
                <div className="font-medium text-slate-600">Queue</div>
                <div className="mt-2 text-sm text-slate-700 min-h-[28px]">{pending.length === 0 ? "—" : pending.join(", ")}</div>
            </div>

            <div className="flex gap-2">
                {/* <button onClick={onGoToCurrent} className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold">Go to my floor</button> */}
                <button onClick={onClear} className="px-3 py-2 rounded-lg bg-slate-200">Clear</button>
            </div>
        </div>
    );
}
