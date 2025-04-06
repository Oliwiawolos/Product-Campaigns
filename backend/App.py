from flask import Flask, jsonify, request
from flask_cors import CORS
from Data import campaigns

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello from backend!"

@app.route("/campaigns", methods=['GET'])
def get_campaigns():
    return jsonify(campaigns)

@app.route("/campaigns", methods=['POST'])
def add_campaign():
    data = request.json
    new_id = max(c["id"] for c in campaigns) + 1 if campaigns else 1
    data["id"] = new_id
    campaigns.append(data)
    return jsonify(data), 201

@app.route("/campaigns/<int:campaign_id>", methods=['PUT'])
def update_campaign(campaign_id):
    data = request.json
    for i,c in enumerate(campaigns):
        if c["id"] == campaign_id:
            campaigns[i] = {**c, **data, "id" : campaign_id}
            return jsonify(campaigns[i])
    return jsonify({"error": "Campaign not found"}), 404

@app.route("/campaigns/<int:campaign_id>", methods=['DELETE'])
def delete_campaign(campaign_id):
    global campaigns
    campaigns = [c for c in campaigns if c["id"] != campaign_id]
    return jsonify({"message": "Deleted"}), 204

if __name__ == "__main__":
    app.run(debug=True)