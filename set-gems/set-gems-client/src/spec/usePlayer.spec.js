import { renderHook, act, cleanup } from "@testing-library/react-hooks";

import usePlayer from "../hooks/usePlayer";
import { io, serverSocket } from "./mockSocket";

const socket = io.connect();

const mockPlayerId = "player";

const mockPlayer = {
  id: mockPlayerId,
  point: 0,
  isReady: false,
  isSelector: false,
  isLeader: false,
};

describe("usePlayer", () => {
  it("should return initial value", () => {
    const { result } = renderHook(() => usePlayer(socket, mockPlayer));

    const [
      point,
      isReady,
      isSelector,
      hasPenalty,
      isLeader,
      setIsLeader,
    ] = result.current;

    expect(point).toBe(0);
    expect(isReady).toBe(false);
    expect(isSelector).toBe(false);
    expect(hasPenalty).toBe(false);
    expect(isLeader).toBe(false);
    expect(typeof setIsLeader).toBe("function");

    cleanup();
  });

  it("should change isReady if socket listen ready with playerId", () => {
    const { result } = renderHook(() => usePlayer(socket, mockPlayer));

    expect(result.current[1]).toBe(false);

    act(() => {
      serverSocket.emit("ready", true, mockPlayerId);
    });

    expect(result.current[1]).toBe(true);

    act(() => {
      serverSocket.emit("ready", false, mockPlayerId);
    });

    expect(result.current[1]).toBe(false);
  });

  it("should not change isReady if socket listen ready with other playerId", () => {
    const otherPlayerId = "other";
    const { result } = renderHook(() => usePlayer(socket, mockPlayer));

    expect(result.current[1]).toBe(false);

    act(() => {
      serverSocket.emit("ready", true, otherPlayerId);
    });

    expect(result.current[1]).toBe(false);
  });
});
