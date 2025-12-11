import { useEffect, useRef, useState } from "react";
import { createElevatorEngine, type Direction } from "../logic/elevatorEngine";
import type { Floor } from "../constants/floors";


export function useElevatorController(initialFloor: Floor = 0) {
  const engineRef = useRef(createElevatorEngine(initialFloor));
  const engine = engineRef.current;

  const [currentFloor, setCurrentFloor] = useState<Floor>(initialFloor);
  const [direction, setDirection] = useState<Direction>(null);
  const [moving, setMoving] = useState<boolean>(false);
  const [_, setTick] = useState(0); 
  const TRAVEL_MS = 1000;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function forceUpdate() {
    setTick(t => t + 1);
  }

  function requestFloor(floor: Floor, direction: Direction = null) {
    engine.addRequest(floor, direction);
    forceUpdate();
    if (!moving) setMoving(true);
  }

  function clearAll() {
    
    (engineRef as any).current = createElevatorEngine(currentFloor);
    forceUpdate();
    setMoving(false);
    setDirection(null);
  }

  useEffect(() => {
   
    if (!moving) return;

    const next = engine.getNextTarget();

    if (next === null) {
      setMoving(false);
      setDirection(null);
      forceUpdate();
      return;
    }

    if (next === currentFloor) {
      engine.reachFloor(next);
      forceUpdate();
      
      
      
     
      timerRef.current = setTimeout(() => {
         const stillHas = engine.getNextTarget() !== null;
         setMoving(stillHas);
         if (!stillHas) setDirection(null);
         forceUpdate();
      }, 500); 
      return;
    }

    setDirection(engine.getState().direction);

    
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const step = next > currentFloor ? 1 : -1;
      const newFloor = (currentFloor + step) as Floor;

      setCurrentFloor(newFloor);
      engine.setCurrent(newFloor);
  if (newFloor === next) {
        engine.reachFloor(newFloor);
      }
  forceUpdate();
   const stillHas = engine.getNextTarget() !== null;
      setMoving(stillHas);
      if (!stillHas) setDirection(null);
    }, TRAVEL_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [moving, currentFloor]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key >= "0" && e.key <= "4") {
        requestFloor(Number(e.key) as Floor);
      }
      if (e.key === "c") clearAll();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moving, currentFloor]);

  return {
    currentFloor,
    direction,
    moving,
    cabinRequests: engine.getState().cabin,
    hallUpRequests: engine.getState().hallUp,
    hallDownRequests: engine.getState().hallDown,
    requestFloor,
    clearAll
  };
}
