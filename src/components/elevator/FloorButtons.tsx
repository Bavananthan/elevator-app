import type { Floor } from "../../constants/floors";

interface Props {
    onPress: (floor: Floor) => void;
    pending: Floor[];
}


export default function FloorButtons({ onPress, pending }: Props) {
    const order: Floor[] = [4, 3, 2, 1, 0];
    return (
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 border rounded-lg">
            {order.map((f) => (
                <button
                    key={f}
                    onClick={() => onPress(f)}
                    className={`py-3 rounded-lg font-bold text-lg border ${pending.includes(f) ? "bg-yellow-300 border-yellow-400" : "bg-white hover:bg-slate-100"
                        }`}
                    aria-pressed={pending.includes(f)}
                    aria-label={`Select floor ${f}`}
                >
                    {f}
                </button>
            ))}
        </div>
    );
}
