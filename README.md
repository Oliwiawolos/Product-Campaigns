# Product Campaigns 

Aplikacja do zarządzania kampaniami reklamowymi dla produktów. Umożliwia tworzenie, edytowanie, usuwanie i przeglądanie kampanii. Projekt zawiera frontend (React + SCSS) i backend (Flask + `data.json`).

## Funkcjonalności

- Dodawanie nowej kampanii  
- Edytowanie istniejącej kampanii  
- Usuwanie kampanii  
- Lista kampanii  
- Obsługa salda „Emerald Balance” z dynamiczną aktualizacją  
- Walidacja formularza i logika budżetowa  
- Zachowanie stanu kampanii po restarcie 

## Technologie

- **Frontend:** React, SCSS, `react-select`, `CreatableSelect`, `Vitest`
- **Backend:** Python, Flask, Flask-CORS
- **Trwałość danych:** `data.json`
- **Hosting:** Netlify (frontend), Render (backend)

## Live demo

- **Najpierw otwórz backend (Render)**: [https://product-campaigns.onrender.com](https://product-campaigns.onrender.com)
- **Potem uruchom frontend (Netlify):** [https://product-campaigns.netlify.app/](https://product-campaigns.netlify.app/)

## Jak uruchomić lokalnie?

### Backend:
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

