# 💊 PillBot

## 📌 Overview

PillBot is an AI-powered medicine-selling platform designed to enhance user convenience by integrating Optical Character Recognition (OCR) for seamless medicine package scanning and WhatsApp-based automated medication reminders. The system is specifically designed for individuals aged 55-60 managing chronic conditions, ensuring timely medication intake and improving healthcare accessibility.

## 🌟 Concept

The core idea behind PillBot is to simplify the medicine purchasing and reminder process for elderly individuals. By leveraging OCR, AI-driven automation, and WhatsApp reminders, the platform minimizes human errors and enhances adherence to prescriptions, making medication management more efficient and accessible.

## 🌍 Problem Statement

PillBot aims to improve medication adherence by integrating OCR-based medicine recognition with WhatsApp reminders. The AI-driven approach minimizes errors and enhances accessibility for elderly users managing chronic conditions.

## 🏗️ System Architecture

### 🔧 Model Components

1. **🌐 Medicine Recognition Engine**
2. **📝 Prescription Analysis Module**
3. **🌿 DrugBank API for Medicine Details**
4. **📩 WhatsApp API for Reminders**

### 📊 Model Architecture Flowchart

Below is a high-level representation of PillBot’s architecture:

![PillBot Architecture](path_to_architecture_image.png) *(Replace with actual image path)*

1. **Image Input:** Medicine package or prescription image is uploaded.
2. **OCR Processing:** Text is extracted using multiple OCR models.
3. **AI Model:** Recognizes and categorizes extracted text.
4. **Database Matching:** Extracted medicine names are verified against a medical database.
5. **User Notification:** Medicine information and reminders are sent via WhatsApp.

### 🌐 AI Models Used

```python
# Load OCR models
trocr_processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
trocr_model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten").to(device)
paddle_ocr = PaddleOCR(use_angle_cls=True, lang="en")
```

## 👨‍💻 Data Preparation & Analysis

### 🔍 Data Preparation Steps

1. **🎮 Data Augmentation:** Enhancing dataset diversity.
2. **🛠️ Preprocessing:** Noise reduction and contrast enhancement.
3. **📊 Model Training:** Fine-tuning AI models.
4. **📊 Data Analysis:** Evaluating model performance through precision, recall, and accuracy metrics.

## ⚙️ How It Works

1. **🖼️ Medicine Recognition:**
   - The user uploads an image of a medicine package or prescription.
   - AI extracts the medicine name and matches it with the database.
2. **📝 Prescription Processing:**
   - OCR models extract text from prescriptions.
   - Additional preprocessing is applied for better text recognition.
3. **⏰ Automated Reminders:**
   - Extracted medicine details are stored in the system.
   - Twilio’s WhatsApp API and Celery handle scheduled reminders.

## 🛠️ Installation & Dependencies

### ✅ Prerequisites

- Python 3.8+
- Virtual Environment (optional but recommended)

### 🏦 Install Dependencies

```bash
pip install -r requirements.txt
```

## 🔗 API Configuration

### 💊 DrugBank API

- **Endpoint:** `https://api.drugbank.com/v1/drugs/search?q=Paracetamol`
- **Returns:** Medicine name, solution, and related information.

### ✍️ AI Models

- `trocr-base-handwritten`
- `trocr-base-printed`

### ▶️ Running the Application

```bash
python app.py
```

## 📚 Dataset & Features

- **🖼️ Image Data:** Medicine package and prescription images.
- **🍿 Custom Data:** Labeled images for training AI models.
- **📊 Augmented Data:** Variants of images for model robustness.

## 📸 Screenshots

*(Include relevant images of UI and working process)*

## 🛠️ Built With

- **🐍 Flask/Django** - Backend Framework
- **🗃️ PostgreSQL** - Database Management
- **🔍 Tesseract OCR** - Text Extraction
- **🖼️ OpenCV** - Image Processing
- **📩 Twilio WhatsApp API** - Messaging
- **⏳ Celery** - Task Scheduling

---
