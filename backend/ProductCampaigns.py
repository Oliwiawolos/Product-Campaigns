from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data.json'

app = Flask(__name__)
CORS(app)

def load_data():
    if not os.path.exists(DATA_FILE):
        return {"emerald_balance": 1000, "campaigns": []}
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route("/")
def index():
    return "Hello from backend!"

@app.route("/campaigns", methods=['GET'])
def get_campaigns():
    data = load_data()
    return jsonify(data["campaigns"])

@app.route("/balance", methods=["GET"])
def get_balance():
    data = load_data()
    return jsonify(data["emerald_balance"])

@app.route("/campaigns", methods=['POST'])
def add_campaign():
    data = load_data()
    new_campaign = request.json
    new_id = max((c["id"] for c in data["campaigns"]), default=0) +1
    new_campaign["id"] = new_id
    data["campaigns"].append(new_campaign)
    data["emerald_balance"] -= float(new_campaign["fund"])
    save_data(data)
    return jsonify(new_campaign), 201

@app.route("/campaigns/<int:campaign_id>", methods=['PUT'])
def update_campaign(campaign_id):
    data = load_data()
    updated_campaign = request.json
    for i, c in enumerate(data["campaigns"]):
        if c["id"] == campaign_id:
            old_fund = float(c["fund"])
            new_fund = float(updated_campaign["fund"])
            data["emerald_balance"] += old_fund - new_fund
            data["campaigns"][i] = {**c, **updated_campaign, "id": campaign_id}
            save_data(data)
            return jsonify(data["campaigns"][i])
    return jsonify({"error": "Campaign not found"}), 404
@app.route("/campaigns/<int:campaign_id>", methods=['DELETE'])
def delete_campaign(campaign_id):
    data = load_data()
    for c in data["campaigns"]:
        if c["id"] == campaign_id:
            data["emerald_balance"] += float(c["fund"])
            break
    data["campaigns"] = [c for c in data["campaigns"] if c["id"] != campaign_id]
    save_data(data)
    return jsonify({"message": "Deleted"}), 204

if __name__ == "__main__":
    app.run(debug=True)