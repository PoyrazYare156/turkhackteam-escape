from fastapi import FastAPI, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import httpx

app = FastAPI()

# CORS Ayarları
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Şablon klasörü (HTML)
templates = Jinja2Templates(directory="şablonlar")

# Ana sayfa – HTML yükler
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Header puanlama sistemi
SECURITY_HEADERS = {
    "content-security-policy": 20,
    "strict-transport-security": 15,
    "x-frame-options": 10,
    "x-content-type-options": 10,
    "referrer-policy": 10,
    "permissions-policy": 10
}

# API endpoint – header taraması
@app.get("/api/scan")
async def scan_headers(url: str = Query(..., description="Tarama yapılacak URL")):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        headers = dict(response.headers)
        results = {}
        for header, score in SECURITY_HEADERS.items():
            if header in headers:
                results[header] = {"value": headers[header], "score": score}
            else:
                results[header] = {"value": None, "score": 0}
        return results
    except Exception as e:
        return {"error": str(e)}
