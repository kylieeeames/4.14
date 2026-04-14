import { createBrowserRouter, RouterProvider, redirect } from "react-router";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeData } from "./store/action";
import useYouTubeInit from "./hooks/useYouTubeInit";
import supabase from "./utils/supabase";

// Loaders and Actions (imported normally)
import {loader as videoLoader} from "./pages/Videos/AllVideos";
import { loader as editVideoLoader, action as editVideoAction} from "./pages/Videos/Edit";
import { loader as playlistLoader} from "./pages/Playlists/ViewAll";
import { loader as signInLoader} from "./pages/Auth/SignInWithGoogle";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const router = createBrowserRouter([
  {
    path:"/",
    id:"root",
    lazy: async () => {
      const module = await import("./pages/DefaultLayout");
      return { Component: module.DefaultLayout ?? module.default };
    },
    loader:async ()=>{
      const token = await supabase.auth.getUser();
      return token.data.user
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("./pages/Home");
          return { Component: module.default };
        },
      },
      {path:"login",loader:signInLoader},
      {path:"logout",loader:async ()=>{
        await supabase.auth.signOut();
        return redirect("/")
      }},
      {
        path: "playlist",
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import("./pages/Playlists/ViewAll");
              return { Component: module.default };
            },
            loader: playlistLoader,
          },
          { path: ":id", element: <h1>View Specific Playlist</h1> },
          { path: "create/:id", element: <h1>Create new playlist</h1> },
          { path: "edit/:id", element: <h1>Edit specific playlist</h1> },
          { path: "delete/:id", element: <h1>Delete specific playlist</h1> },
          {
            path: "watch/:id",
            lazy: async () => {
              const module = await import("./pages/Playlists/Play");
              return { Component: module.default };
            },
          },
        ],
      },
      {
        path: "video",
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import("./pages/Videos/AllVideos");
              return { Component: module.default };
            },
            loader: videoLoader,
          },
          { path: ":id", element: <h1>View Specific Video</h1> },
          { path: "create/:id", element: <h1>Create new Video</h1> },
          {
            path: "edit/:id",
            lazy: async () => {
              const module = await import("./pages/Videos/Edit");
              return { Component: module.default };
            },
            loader:editVideoLoader,
            action: editVideoAction
          },
          { path: "delete/:id", loader: async ({params})=>{
            try{
              await axios.delete(API_URL + "/videos/"+params.id);
            }catch(e){
              console.log(e);
            }
            return redirect("/video")
          } },
          { path: "watch/:id", element: <h1>Watch a specific Video</h1> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initializeData(API_URL + "/videos"))
  },[dispatch]);

  useYouTubeInit();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
