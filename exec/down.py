from yt_dlp import YoutubeDL
import os
import argparse

# Dossier de téléchargement
DOWNLOAD_FOLDER = "downloads"

# Assurez-vous que le dossier de téléchargement existe
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

def download_video(url, choice):
    if not url:
        print("Please provide a valid YouTube URL.")
        return

    # Options par défaut
    options = {
        "format": "bestvideo+bestaudio/best",
        "outtmpl": os.path.join(DOWNLOAD_FOLDER, "%(title)s.%(ext)s"),
    }

    # Configuration pour l'audio uniquement
    if choice == "audio":
        options.update({
            "format": "bestaudio/best",
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }]
        })

    try:
        # Téléchargement avec yt-dlp
        with YoutubeDL(options) as ydl:
            info = ydl.extract_info(url, download=False)
            filename = ydl.prepare_filename(info)
            print(f"Download complete: {filename}")
    except Exception as e:
        print(f"Error: {e}")

    
def main():
    parser = argparse.ArgumentParser(description="Download YouTube videos or audio.")
    parser.add_argument("--url", required=True, help="The YouTube URL of the video.")
    parser.add_argument("--quality", required=True, help="The quality to download (e.g., 480p).")
    parser.add_argument("--choice", required=True, choices=["video", "audio"], help="Download type: 'video' or 'audio'.")

    args = parser.parse_args()
    #download_video(args.url, args.choice)
    print(f"Lien YouTube : {args.url}")
    print(f"Qualité choisie : {args.quality}")
    print(f"Téléchargement de la {args.choice} {args.url} en qualité {args.quality}...")

if __name__ == "__main__":
    main()
   
    
