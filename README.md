# Kaiwa - Realtime Chat-App

![Kaiwa Logo](frontend/src/Components/kaiwa-Logo.png)  
*Eine Echtzeit-Chat-Anwendung als Praxisprojekt*

---

## 📌 Über das Projekt

[![RealTimeChat Gruppenchat Demo](https://img.youtube.com/vi/00n8HUajaJo/0.jpg)](https://www.youtube.com/watch?v=00n8HUajaJo)

**Kaiwa** ist eine Echtzeit-Chat-App, die es Nutzern ermöglicht, Nachrichten in Echtzeit zu senden und zu empfangen. Die Anwendung wurde als Gemeinschaftsprojekt im Rahmen unseres Praxis-Projekts entwickelt (*14.10.-28.10.2024*) während unserer Weiterbildung zum **Dev/Ops- und Cloud-Engineer**. Das Projekt wurde anschließend in Einzelarbeit von Kaho Aoyama zwischen dem 07.03.2025-05.04.2025 als Abschlussprojekt um ein automatisches Deployment mittels Terraform und Ansible, Github Actions zum Automatischen Linten des Codes und eine Gruppenchatfunktion erweitert.

🔹 **Teammitglieder:**  
- aktuell: **Kaho Aoyama** (*Datenbank, Backend-Funktionalitäten, Terraform, Ansible, Frontend, Github Actions*)
- ehemals: **Ilona Görgens** (*Styling und Benutzerfreundlichkeit, Express.js-Boilerplate*)
- ehemals: **Marcus Bieber** (*Websocket-Verbindung, Backend, Deployment*)

✍️ *"Kaiwa" ist japanisch und bedeutet „Konversation“ oder „Gespräch“. Die Anwendung repräsentiert einen Ausschnitt dessen, was wir bisher gelernt haben – von der UI-Gestaltung bis zur Echtzeitkommunikation.*

---

## 🛠️ Verwendete Technologien

- **Frontend:** React
- **Backend:** Express.js, Socket.io
- **Datenbank:** SQLite
- **Cloud:** AWS
- **CI/CD:** Github Actions
- **Infrastructure as Code:** Terraform, Ansible

---

## 🚀 Installation & Lokale Nutzung

Führe die folgenden Schritte aus, um die Anwendung lokal zu testen:

### 1️⃣ Repository klonen
```sh
 git clone https://github.com/kahoa/RealTimeChat.git
```

### 2️⃣ Navigiere in das Projektverzeichnis
```sh
 cd RealTimeChat
```

### 3️⃣ Abhängigkeiten installieren
Führe diesen Befehl in den jeweiligen Ordnern aus:
```sh
 npm install  # In den Ordnern: frontend/, backend/, backend/database/
```

### 4️⃣ Backend starten
```sh
 cd backend && node server.js
```

### 5️⃣ Frontend starten
```sh
 cd frontend
 rm .env
 npm run dev
```

### 6️⃣ Anwendung öffnen
Öffne im Browser:
[http://localhost:8080](http://localhost:8080)

### 🎉 Jetzt anmelden, chatten und Spaß haben! 🎉

## 🚀 Installation & Nutzung in AWS

Für AWS geschieht die Installation automatisiert mittels Terraform und Ansible. Eine Anleitung ist [hier](infrastructure/README.md) zu finden.

### Anwendung öffnen
Öffne im Browser:
[http://AWS_URL](http://AWS_URL)

### 🎉 Jetzt anmelden, chatten und Spaß haben! 🎉

---

##  Demo

Das nachfolgende Video zeigt eine Demonstration der Anwendung.

![Kaiwa Screenshot](https://img.youtube.com/vi/00n8HUajaJo/0.jpg)

---

## 🛠️ Mögliche Weiterentwicklungen

- **Erweiterung der Benutzerprofile** 🏷️
- **Push-Benachrichtigungen für neue Nachrichten** 🔔
- **Mobile App-Version mit React Native** 📱

---

## 📜 Lizenz
Dieses Projekt steht unter der MIT-Lizenz. Mehr dazu in der Datei [`LICENSE`](LICENSE).

---

## 🤝 Kontakt & Mitwirken
Falls du Feedback hast oder mitwirken möchtest, erstelle gerne ein **Issue** oder **Pull Request** in unserem GitHub-Repository!

📧 **Kontakt:** [k.aoyama3.biz@gmail.com](mailto:k.aoyama3.biz@gmail.com)  


