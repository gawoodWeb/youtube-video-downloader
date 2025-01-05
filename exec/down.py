from flask import Flask, request, render_template, send_file
from yt_dlp import YoutubeDL
import os

app = Flask(__name__)
DOWNLOAD_FOLDER = "downloads"

# Ensure the download folder exists
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        url = request.form.get("url")
        choice = request.form.get("choice")

        if not url:
            return "Please provide a valid YouTube URL.", 400

        options = {
            "format": "bestvideo+bestaudio/best",
            "outtmpl": os.path.join(DOWNLOAD_FOLDER, "%(title)s.%(ext)s"),
        }

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
            with YoutubeDL(options) as ydl:
                info = ydl.extract_info(url, download=True)
                filename = ydl.prepare_filename(info)
                return send_file(filename, as_attachment=True)
        except Exception as e:
            return f"Error: {e}", 500

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

