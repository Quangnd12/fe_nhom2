import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAlbumsSong, UPLOADS_BASE_URL } from "../../../config/apiConfig";
import PlayerControls from "../../../components/audio/PlayerControls";

const PopularSongs = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null); // Thêm state để lưu trữ track hiện tại

  const changeTrack = (type) => {
    const currentIndex = songs.findIndex(song => song.id === currentTrack?.id);
    if (currentIndex === -1) return;

    let newIndex = currentIndex;
    if (type === "next") {
      newIndex = (currentIndex + 1) % songs.length;
    } else if (type === "previous") {
      newIndex = (currentIndex - 1 + songs.length) % songs.length;
    }

    setCurrentTrack(songs[newIndex]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songData = await getAlbumsSong();
        // Lọc các bài hát của album có ID tương ứng và loại bỏ trùng lặp
        const filteredSongs = songData.filter(item => item.albums_id === parseInt(id));
        setSongs(filteredSongs); 
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleTrackPlay = (track) => {
    setCurrentTrack(track); // Thiết lập track hiện tại khi người dùng bấm vào bài hát
  };

  const handleDropdownClick = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  if (songs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl text-white font-bold mb-4">Popular</h2>
      <div className="space-y-4">
        {songs.map((song, index) => (
          <div
            key={index + 1} // Tạo giá trị id tự tăng từ 1
            className={`relative grid grid-cols-3 items-center p-4 rounded-lg transition duration-300 ${
              hoveredIndex === index ? "bg-gray-700" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleTrackPlay(song)} // Bắt sự kiện click để phát nhạc
          >
            <div className="flex items-center space-x-4 col-span-1">
              <span className="text-white text-lg font-semibold">
                {hoveredIndex === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.018 14L14.41 9.894a1 1 0 000-1.788L4.018 4A1 1 0 003 5v10a1 1 0 001.018 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1 // Hiển thị id tự tăng
                )}
              </span>
              <img
                src={`${UPLOADS_BASE_URL}${song.song_cover_image}`}
                alt={song.song_title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <p
                className={`text-white whitespace-nowrap font-semibold cursor-pointer ${
                  hoveredIndex === index ? "underline" : ""
                }`}
              >
                {song.song_title}
              </p>
            </div>
            <div className="text-gray-400 col-span-1 text-right">
              {song.artist_name || "Artist not available"}
            </div>
            <div className="text-gray-400 col-span-1 text-right flex justify-end items-center">
              <span>{song.duration || "Duration not available"}</span>
              {hoveredIndex === index && (
                <div className="relative bottom-2 ml-5">
                  <button
                    className="text-gray-400 text-2xl"
                    onClick={() => handleDropdownClick(index)}
                  >
                    ...
                  </button>
                  {dropdownIndex === index && (
                    <div className="absolute right-0 z-10 p-2 mt-2 w-72 bg-zinc-950 text-white rounded-lg drop-shadow-2xl">
                      <button className="text-white p-2 w-full text-left hover:bg-gray-700">
                        Add to playlist
                      </button>
                      <button className="text-white p-2 w-full text-left hover:bg-gray-700">
                        Save to your Liked Songs
                      </button>
                      <button className="text-white p-2 w-full text-left hover:bg-gray-700">
                        Add to queue
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {currentTrack && (
        <PlayerControls
          audioUrl={`${UPLOADS_BASE_URL}${currentTrack.song_audio_file}`}
          title={currentTrack.song_title}
          artist_name={currentTrack.artist_name}
          cover_image={`${UPLOADS_BASE_URL}${currentTrack.song_cover_image}`}
          onTrackChange={changeTrack}
          onDurationChange={() => {}}
        />
      )}
    </div>
  );
};

export default PopularSongs;
