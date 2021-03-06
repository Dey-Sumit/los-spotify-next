import { GetServerSideProps } from "next";
import AlbumList from "../components/AlbumList";
import Heading from "../components/Heading";
import PlaylistList from "../components/PlaylistList";
import { customGet } from "../utils/customGet";
import { getGreeting } from "../utils/getGreeting";

export default function Home({ newReleases, featuredPlaylists }) {
  return (
    <div className="w-full p-4">
      <h1 className="mb-5 text-3xl font-bold">Good {getGreeting()}</h1>

      <h1 className="mt-10 heading">New releases </h1>
      <AlbumList albums={newReleases?.albums.items} />

      <h1 className="mt-16 heading">{featuredPlaylists?.message} </h1>
      <PlaylistList playlists={featuredPlaylists?.playlists.items} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const newReleases = await customGet(
    "https://api.spotify.com/v1/browse/new-releases?country=IN&limit=25",
    ctx
  );

  const featuredPlaylists = await customGet(
    "https://api.spotify.com/v1/browse/featured-playlists?country=IN",
    ctx
  );

  return { props: { newReleases, featuredPlaylists } };
};
