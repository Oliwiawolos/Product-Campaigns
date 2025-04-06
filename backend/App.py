from flask import Flask, jsonify, request
from flask_cors import CORS
import Data

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello from backend!"

@app.route("/campaigns", methods=['GET'])
def get_campaigns():
    return jsonify(Data.campaigns)

@app.route("/campaigns", methods=['POST'])
def add_campaign():
    data = request.json
    new_id = max(c["id"] for c in Data.campaigns) + 1 if Data.campaigns else 1
    data["id"] = new_id
    Data.campaigns.append(data)
    fund = float(data.get("fund", 0))
    Data.emerald_balance -= fund
    return jsonify(data), 201

@app.route("/campaigns/<int:campaign_id>", methods=['PUT'])
def update_campaign(campaign_id):
    data = request.json
    for i,c in enumerate(Data.campaigns):
        if c["id"] == campaign_id:
            old_fund = float(c.get("fund", 0))
            new_fund = float(data.get("fund", old_fund))
            Data.emerald_balance += old_fund - new_fund
            Data.campaigns[i] = {**c, **data, "id" : campaign_id}
            return jsonify(Data.campaigns[i])
    return jsonify({"error": "Campaign not found"}), 404

@app.route("/campaigns/<int:campaign_id>", methods=['DELETE'])
def delete_campaign(campaign_id):
    for c in Data.campaigns:
        if c["id"] == campaign_id:
            Data.emerald_balance += float(c.get("fund", 0))
            break
    Data.campaigns = [c for c in Data.campaigns if c["id"] != campaign_id]
    return jsonify({"message": "Deleted"}), 204

@app.route("/balance", methods=["GET"])
def get_balance():
    return jsonify(Data.emerald_balance)

if __name__ == "__main__":
    app.run(debug=True)