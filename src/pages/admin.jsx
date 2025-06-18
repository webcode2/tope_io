// AdminInterface.jsx
import React, { useEffect, useState } from 'react';
import LibLogo from "../components/logo";
import { CHAT_SERVER_URL } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { createSocketConnection, SocketEvents } from "../socketio";
import { Link } from "react-router-dom";
import Header from "../components/Header";
// import io from 'socket.io-client';

const user = {
    role: ""
}

// const socket = io('http://localhost:3000',); // adjust your backend URL/port

export default function AdminInterface() {
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.user.details.token)
    const { isAuthenticated } = useSelector(state => state.auth)






    useEffect(() => {
        let socket;

        if (isAuthenticated) {
            socket = createSocketConnection({ token: token });

            socket.on("connect", () => {
                console.log("Connected to socket server");
            });

            socket.on("disconnect", () => {
                console.log("Disconnected from socket server");
            });

            socket.on("sendAdmin", (data) => {
                console.log(data)

                dispatch(logNewUser(data))
            })


            socket.on("SERVER_EVENT", (data) => {
                console.log(data)

            })
        }

        return () => {
            if (socket) {
                socket.disconnect();
                console.log("Socket connection cleaned up");
            }
        };
    }, [isAuthenticated, user.token, dispatch]);

    const history = [{}, {}, {}]

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900  text-gray-900 dark:text-white h-screen">
            <Header />
            <main className="py-5 max-w-9/12 mx-auto grid grid-cols-1 md:grid-cols-7 gap-x-4 overflow-auto" >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 col-span-5">
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">Card 1</div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">Card 2</div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">Card 3</div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">Card 3</div>
                </div>
                <div className="history space-y-5 border rounded-lg border-amber-500 p-5 col-span-2">
                    {history.map(_ => (<div className=" bg-gray-50 px-3 py-6  rounded-xl ">
                        <p className="tracking-wide text-sm " >
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi recusandae deserunt maiores temporibus dolor tenetur velit et incidunt, fugit nesciunt eveniet unde rem reiciendis iure, nostrum sapiente? Accusantium, non quasi?
                        </p>
                        <div className="meta text-xs text-gray-400 mt-3">
                            Created By Tope Faminkinwa
                        </div>
                        <div className="meta text-xs text-gray-400 mt-1">
                            {new Date().toDateString()}
                        </div>
                    </div>))}
                </div>
            </main>

        </div>
    );
}
