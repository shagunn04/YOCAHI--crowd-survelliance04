from ultralytics import YOLO
import cv2

class YOLOv8Net:
    def __init__(self, model_path="models/yolov8n.pt"):
        self.model = YOLO(model_path)

    def detect(self, frame):
        """
        Detects people in the frame using YOLOv8.

        :param frame: Image frame from video
        :return: List of detected persons [(x1, y1, x2, y2, confidence), ...]
        """
        results = self.model(frame)
        detections = []

        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Convert to integer
                conf = float(box.conf[0])  # Confidence score
                cls = int(box.cls[0])  # Class ID (0 = person)
                if cls == 0 and conf > 0.3:
                    detections.append((x1, y1, x2, y2, conf))

        return detections
