import { createBrowserRouter, RouterProvider, Outlet, redirect } from "react-router";
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

// Lazy loaded components
const DefaultLayout = {
  lazy: async () => {
    const module = await import("./pages/DefaultLayout");
    return module;
  }
};

const Home = {
  lazy: async () => {
    const module = await import("./pages/Home");
    return module;
  }
};

const ViewAllPlaylists = {
  lazy: async () => {
    const module = await import("./pages/Playlists/ViewAll");
    return module;
  }
};

const AllVideos = {
  lazy: async () => {
    const module = await import("./pages/Videos/AllVideos");
    return module;
  }
};

const EditVideo = {
  lazy: async () => {
    const module = await import("./pages/Videos/Edit");
    return module;
  }
};

const Play = {
  lazy: async () => {
    const module = await import("./pages/Playlists/Play");
    return module;
  }
};

const router = createBrowserRouter([
  {
    path:"/",
    id:"root",
    ...DefaultLayout,
    loader:async ()=>{
      const token = await supabase.auth.getUser();
      return token.data.user
    },
    children: [
      { index: true, ...Home },
      {path:"login",loader:signInLoader},
      {path:"logout",loader:async ()=>{
        await supabase.auth.signOut();
        return redirect("/")
      }},
      {
        path: "playlist",
        children: [
          { index: true, ...ViewAllPlaylists, loader: playlistLoader},
          { path: ":id", element: <h1>View Specific Playlist</h1> },
          { path: "create/:id", element: <h1>Create new playlist</h1> },
          { path: "edit/:id", element: <h1>Edit specific playlist</h1> },
          { path: "delete/:id", element: <h1>Delete specific playlist</h1> },
          { path: "watch/:id", ...Play},
        ],
      },
      {
        path: "video",
        children: [
          { index: true, ...AllVideos, loader: videoLoader},
          { path: ":id", element: <h1>View Specific Video</h1> },
          { path: "create/:id", element: <h1>Create new Video</h1> },
          { path: "edit/:id", ...EditVideo, loader:editVideoLoader, action: editVideoAction},
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
