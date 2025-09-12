import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";


const SocketContext: React.Context<Socket | null | undefined> = createContext<Socket | null | undefined>(undefined);

function SocketProvider({ children }: React.PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      transports:["websocket"],
      secure: true,
      autoConnect: true,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
    });

    newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
    });

    return () => {
      newSocket.close();
      setSocket(null);
    };
  }, []);


  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

function useSocket(): Socket | null {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

export { SocketContext, SocketProvider, useSocket };