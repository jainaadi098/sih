import os
import json
import urllib.request
import urllib.error
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str
    api_key: Optional[str] = None

def get_gemini_key():
    key = os.environ.get("GEMINI_API_KEY")
    if key and key.strip():
        return key.strip()
    env_path = os.path.join(os.path.dirname(__file__), "..", "..", ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line_str = line.strip()
                if line_str.startswith("GEMINI_API_KEY="):
                    val = line_str.split("=", 1)[1].strip().strip('"\'')
                    if val:
                        return val
    return None

@router.post("")
def chat_with_gemini(req: ChatRequest):
    api_key = req.api_key or get_gemini_key()
    if not api_key:
        # ponytail: friendly fallback response if key is unconfigured
        return {
            "reply": "GEMINI_API_KEY is not configured yet. Please add `GEMINI_API_KEY=your_key` to `Backend/.env`."
        }

    # ponytail: stdlib urllib for zero-dependency Gemini API integration
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": f"You are Krishi Sahayak, an expert agricultural AI assistant helping farmers with crops, schemes, soil, equipment, and yield optimization. Answer concisely and helpfuly in the language of the prompt (Hindi/English).\n\nUser: {req.message}"
                    }
                ]
            }
        ]
    }
    
    headers = {"Content-Type": "application/json"}
    data = json.dumps(payload).encode("utf-8")
    
    try:
        request = urllib.request.Request(url, data=data, headers=headers, method="POST")
        with urllib.request.urlopen(request) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            try:
                reply = res_data["candidates"][0]["content"]["parts"][0]["text"]
                return {"reply": reply}
            except (KeyError, IndexError):
                return {"reply": "Unable to parse response from Gemini API."}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        return {"reply": f"Gemini API Error ({e.code}): {err_body}"}
    except Exception as e:
        return {"reply": f"Error communicating with AI service: {str(e)}"}
