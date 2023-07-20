import { useQuery, gql } from "@apollo/client";

export const GET_PLAYLIST = gql`
  query GetPlaylist {
    getPlaylists {
      id
      title
    }
  }
`;

export const GET_SONGS = gql`
  query GetSongs($playlistId: Int!, $search : String) {
    getSongs(playlistId: $playlistId, search: $search) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;
