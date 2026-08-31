import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

# Path to your built frontend
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "dist")

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
CORS(app)  # allow frontend requests

# --- API ROUTES ---
@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify({"message": "Hello from Python backend!"})


# --- FRONTEND ROUTES ---
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(FRONTEND_DIR, path)):
        return send_from_directory(FRONTEND_DIR, path)
    else:
        return send_from_directory(FRONTEND_DIR, "index.html")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
