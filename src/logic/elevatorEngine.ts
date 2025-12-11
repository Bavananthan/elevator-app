
import type { Floor } from "../constants/floors";


export type Direction = "up" | "down" | null;
export type RequestType = "cabin" | "hall_up" | "hall_down";

export interface ElevatorEngine {
  addRequest: (floor: Floor, direction?: Direction) => void;
  getNextTarget: () => Floor | null;
  reachFloor: (floor: Floor) => void;
  getState: () => {
    currentFloor: Floor;
    direction: Direction;
    requests: Floor[]; 
    cabin: Floor[];
    hallUp: Floor[];
    hallDown: Floor[];
  };
  setCurrent: (floor: Floor) => void;
  setDirection: (d: Direction) => void;
}

export function createElevatorEngine(initialFloor: Floor = 0): ElevatorEngine {
  const cabinRequests = new Set<Floor>();
  const hallUpRequests = new Set<Floor>();
  const hallDownRequests = new Set<Floor>();

  let currentFloor: Floor = initialFloor;
  let direction: Direction = null;

  function addRequest(floor: Floor, dir: Direction = null) {
    if (dir === "up") hallUpRequests.add(floor);
    else if (dir === "down") hallDownRequests.add(floor);
    else cabinRequests.add(floor); 
  }

  function getNextTarget(): Floor | null {
    if (cabinRequests.size === 0 && hallUpRequests.size === 0 && hallDownRequests.size === 0) {
      direction = null;
      return null;
    }

    if (direction === null) {
       if (cabinRequests.has(currentFloor) || hallUpRequests.has(currentFloor)) direction = "up";
       else if (hallDownRequests.has(currentFloor)) direction = "down";
       else direction = "up"; 
    }

    if (direction === "up") {
      if (cabinRequests.has(currentFloor) || hallUpRequests.has(currentFloor)) return currentFloor;

      const floorsAbove = getAllRequests().filter(f => f > currentFloor).sort((a,b) => a - b);
      if (floorsAbove.length > 0) {
        for (const f of floorsAbove) {
          const isCabin = cabinRequests.has(f);
          const isHallUp = hallUpRequests.has(f);
          const isHallDown = hallDownRequests.has(f);
          
          if (isCabin || isHallUp) return f;
          
          const requestsHigher = floorsAbove.some(h => h > f);
          if (isHallDown && !requestsHigher) return f;
        }
        return floorsAbove[floorsAbove.length - 1];
      } else {
        direction = "down";
      }
    } 

    if (direction === "down") {
      if (cabinRequests.has(currentFloor) || hallDownRequests.has(currentFloor)) return currentFloor;
      if (cabinRequests.has(currentFloor) || hallDownRequests.has(currentFloor)) return currentFloor;

      const floorsBelow = getAllRequests().filter(f => f < currentFloor).sort((a,b) => b - a);
      if (floorsBelow.length > 0) {
        for (const f of floorsBelow) {
          const isCabin = cabinRequests.has(f);
          const isHallDown = hallDownRequests.has(f);
          const isHallUp = hallUpRequests.has(f);

          if (isCabin || isHallDown) return f;

          const requestsLower = floorsBelow.some(l => l < f);
          if (isHallUp && !requestsLower) return f;
        }
        return floorsBelow[floorsBelow.length - 1];
      } else {
        direction = "up";
        
        if (cabinRequests.has(currentFloor) || hallUpRequests.has(currentFloor)) return currentFloor;
        
        const all = getAllRequests();
        if (all.length > 0) return all[0];
      }
    }

    return null;
  }

  function reachFloor(floor: Floor) {
    cabinRequests.delete(floor);

    if (direction === "up") {
      hallUpRequests.delete(floor);
  
       const requestsAbove = getAllRequests().some(f => f > currentFloor);
       if (!requestsAbove) {
         hallDownRequests.delete(floor);
       }
    } else if (direction === "down") {
      hallDownRequests.delete(floor);
      const requestsBelow = getAllRequests().some(f => f < currentFloor);
       if (!requestsBelow) {
         hallUpRequests.delete(floor);
       }
    } else {
     
      hallUpRequests.delete(floor);
      hallDownRequests.delete(floor);
    }
  }

  function getAllRequests(): Floor[] {
    const all = new Set([...cabinRequests, ...hallUpRequests, ...hallDownRequests]);
    return Array.from(all);
  }

  return {
    addRequest,
    getNextTarget,
    reachFloor,
    getState() {
      return { 
        currentFloor, 
        direction, 
        requests: getAllRequests(), 
        cabin: Array.from(cabinRequests),
        hallUp: Array.from(hallUpRequests),
        hallDown: Array.from(hallDownRequests)
      };
    },
    setCurrent(floor: Floor) {
      currentFloor = floor;
    },
    setDirection(d: Direction) {
      direction = d;
    }
  };
}
