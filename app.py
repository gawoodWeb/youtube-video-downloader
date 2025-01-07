import argparse

def main():
    # Créez le parser pour gérer les arguments
    parser = argparse.ArgumentParser(description="Télécharger une vidéo YouTube avec une qualité choisie.")
    
    # Ajoutez les arguments
    parser.add_argument("--url", help="Lien YouTube valide", type=str)
    parser.add_argument("--quality", help="Qualité de la vidéo (par exemple: 360p, 720p)", type=str)

    # Parsez les arguments
    args = parser.parse_args()

    # Récupérez ou demandez le lien YouTube
    if args.url:
        youtube_url = args.url
    else:
        youtube_url = input("Entrez un lien YouTube valide : ")

    # Récupérez ou demandez la qualité
    if args.quality:
        video_quality = args.quality
    else:
        video_quality = input("Entrez la qualité de la vidéo (par exemple: 360p, 720p) : ")

    # Affichez les choix de l'utilisateur
    print(f"Lien YouTube : {youtube_url}")
    print(f"Qualité choisie : {video_quality}")

    # Ici, vous pouvez ajouter le code pour télécharger la vidéo avec pytube ou un autre outil.
    download_video(youtube_url, video_quality)

def download_video(url, quality):
    # Exemple d'action (remplacez par votre logique de téléchargement)
    print(f"Téléchargement de la vidéo {url} en qualité {quality}...")
    # Logique de téléchargement ici

if __name__ == "__main__":
    main()


