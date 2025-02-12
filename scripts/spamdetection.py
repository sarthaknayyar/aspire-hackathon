from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the trained model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return "Random Forest Model API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Expecting JSON input
        text = data.get('text', '')

        if not text:
            return jsonify({'error': 'No text provided'}), 400

        # Make prediction
        prediction = model.predict([text])[0]  # Extract the single prediction
        return jsonify({'prediction': int(prediction)})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
