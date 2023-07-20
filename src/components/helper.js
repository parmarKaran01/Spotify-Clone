
export const SideBarLinks = [
    {
        id: 1,
        title: "For You",
        to : "/"
    },
    {
        id: 2,
        title: "Top Tracks",
        to : "/top_tracks"
    },
    {
        id: 3,
        title: "Favourites",
        to : "/favourites"
    },
    {
        id: 4,
        title: "Recently Played",
        to : "/recently_played"
    },

]

export const Songs= [
    {
        id: 1,
        name : "song 1",
        artist: "The Weekend",
        duration : "4:16"
    },
    {
        id: 2,
        name : "song 2",
        artist: "The Weekend",
        duration : "4:16"
    },
    {
        id: 3,
        name : "song 3",
        artist: "The Weekend",
        duration : "4:16"
    },
    {
        id: 4,
        name : "song 4",
        artist: "The Weekend",
        duration : "4:16"
    },
    {
        id: 5,
        name : "song 5",
        artist: "The Weekend",
        duration : "4:16"
    },
]

export function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
  
    // Format the minutes and seconds with leading zeros if necessary
    var formattedMinutes = String(minutes).padStart(2, '0');
    var formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return formattedMinutes + ':' + formattedSeconds;
  }

export function getPixelColor(x, y) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    
    // Set the canvas size to match the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Append the canvas to the document body
    document.body.appendChild(canvas);
    var pixelData = context.getImageData(x, y, 1, 1).data;
    
    // Extract the red, green, blue, and alpha values
    var red = pixelData[0];
    var green = pixelData[1];
    var blue = pixelData[2];
    var alpha = pixelData[3];
  
    // Return the RGB color values
    return `rgba(${red},${green},${blue},${alpha})`;
  }