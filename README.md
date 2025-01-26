## YOUTUBE VIDE DOWNLODER

# 🎥 YouTube Video Downloader with `yt-dlp` and Express.js

This project is a web application that allows users to download YouTube videos in multiple formats using `yt-dlp` integrated with an Express.js backend. The frontend provides an intuitive interface for users to paste video URLs, select formats, and download files directly.

---

## 🚀 Features

- Fetch YouTube video details and available formats using `yt-dlp`.
- Interactive interface to display available video formats.
- Download selected formats with a simple click.
- Handles file storage securely on the server.
- RESTful API integration for video processing.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, `yt-dlp-exec`
- **Frontend:** HTML, CSS, JavaScript
- **Others:** EJS for templating, Fetch API for client-server communication
- **Dependencies:** Python (required for `yt-dlp`)

---

## 📦 Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js installed on your system.
- Python (v2 or higher) installed on your system.
- `yt-dlp` installed globally or as a package dependency.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```
   The server will run at [http://localhost:3000](http://localhost:3000).

---

## 🧩 API Endpoints

### 1. **GET `/`**
   Renders the homepage for entering YouTube URLs.

### 2. **POST `/detail`**
   Fetches video details and available formats from YouTube.
   - **Request Body:**
     ```json
     {
       "url": "https://www.youtube.com/watch?v=example"
     }
     ```
   - **Response:**
     ```json
     {
       "title": "Video Title",
       "desc": "Video Description",
       "poster": "Thumbnail URL",
       "formats": [
         {
           "formatId": "18",
           "size": "5.3 MB",
           "type": "mp4",
           "resolution": "360p"
         },
         ...
       ]
     }
     ```

### 3. **POST `/download`**
   Triggers file download for the selected format.
   - **Request Body:**
     ```json
     {
       "filePath": "example-file.mp4"
     }
     ```
   - **Response:**
     Downloads the specified file.

---

## 📂 Project Structure

```plaintext
your-repo-name/
├── downloads/            # Folder for storing downloaded files
├── public/               # Static assets like CSS and JS
├── views/                # EJS templates for rendering pages
├── index.js              # Main server file
├── package.json          # Node.js dependencies and scripts
├── README.md             # Project documentation
```

---

## 💡 Bonus Features

- **Secure File Handling:**
  Protects against directory traversal vulnerabilities using `path.basename`.

- **Dynamic Format Selection:**
  Filters and formats YouTube video formats for better user understanding.

- **Customization Ready:**
  Easily extend the project with additional features like playlist downloads or custom file naming.

---

## 📖 Learnings and Resources

### Why Use `yt-dlp`?
`yt-dlp` is a powerful open-source tool for downloading videos from multiple platforms. It's an active fork of `youtube-dl` with extended features and improved performance.

### Key Features of the Project
- **GOPATH** ensures clean organization of project files.
- Modular API endpoints allow seamless integration and debugging.

---

## 🤝 Contribution

Feel free to fork the repository and create pull requests. All contributions are welcome!

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

---

## ❤️ Support

If you find this project helpful, consider supporting me on [PayPal](https://paypal.me/yourusername). Your contributions keep the development going!

---

Enjoy using the YouTube downloader, and don't forget to star the repo if you like it! 😊



