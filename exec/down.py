from yt_dlp import YoutubeDL
import os
import argparse
import json
import requests 




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
        "format": "bestvideo+bestaudio/best",  # Par défaut, meilleur format
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
        # Extraction des informations avec yt-dlp
        with YoutubeDL(options) as ydl:
            info = ydl.extract_info(url, download=False)
            sanitized_info = ydl.sanitize_info(info)

            # Extraire uniquement les formats souhaités
            valid_formats = ["mp4", "mkv", "webm"]  # Extensions acceptées
            filtered_formats = [
                fmt for fmt in sanitized_info.get("formats", [])
                if fmt.get("ext") in valid_formats
            ]

            # Si des formats valides sont trouvés, on sélectionne le meilleur
            if filtered_formats:
                best_format = filtered_formats[0]  # On prend le premier disponible
                metadata = {
                    "ID": sanitized_info.get("id"),
                    "Titre": sanitized_info.get("title"),
                    "Description": sanitized_info.get("description"),
                    "Durée (secondes)": sanitized_info.get("duration"),
                    "Miniature": sanitized_info.get("thumbnail"),
                    "Uploader": sanitized_info.get("uploader"),
                    "Upload Date": sanitized_info.get("upload_date"),
                    "View Count": sanitized_info.get("view_count"),
                    "Like Count": sanitized_info.get("like_count"),
                    "Meilleur Format": {
                        "Format ID": best_format.get("format_id"),
                        "Type": best_format.get("format_note"),
                        "Extension": best_format.get("ext"),
                        "Résolution": f"{best_format.get('width')}x{best_format.get('height')}" if best_format.get("width") and best_format.get("height") else "N/A",
                        "FPS": best_format.get("fps"),
                        "URL": best_format.get("url")
                    }
                }
                # Afficher les métadonnées
                print(json.dumps(metadata, indent=4, ensure_ascii=False))
                send_data_to_node(metadata)
            else:
                print("Aucun format valide (mp4, mkv, webm) n'a été trouvé pour cette vidéo.")

            # Nom de fichier prévu pour le téléchargement
            filename = ydl.prepare_filename(info)
            print(f"Nom de fichier généré : {filename}")
    except Exception as e:
        print(f"Error: {e}")



def send_data_to_node(data):
    url = "http://localhost:3000/video"  # URL de l'API Node.js
    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            print("Data sent successfully!")
        else:
            print(f"Failed to send data. Status code: {response.status_code}")
    except Exception as e:
        print(f"Error sending data: {e}")








def main():
    parser = argparse.ArgumentParser(description="Download YouTube videos or audio.")
    parser.add_argument("--url", required=True, help="The YouTube URL of the video.")
    parser.add_argument("--quality", required=True, help="The quality to download (e.g., 480p).")
    parser.add_argument("--choice", required=True, choices=["video", "audio"], help="Download type: 'video' or 'audio'.")

    args = parser.parse_args()
    download_video(args.url, args.choice)
    
    print(f"Lien YouTube : {args.url}")
    print(f"Qualité choisie : {args.quality}")
    print(f"Téléchargement de la {args.choice} {args.url} en qualité {args.quality}...")






if __name__ == "__main__":
    main()
