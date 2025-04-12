import cv2
import numpy as np
from deep_sort_realtime.deepsort_tracker import DeepSort

class DeepSORTTracker:
    def __init__(self):
        self.tracker = DeepSort(max_age=30, n_init=3, nms_max_overlap=1.0)

    def update(self, detections, frame):
        """
        Tracks objects using DeepSORT.

        :param detections: List of bounding boxes [(x1, y1, x2, y2, confidence), ...]
        :param frame: The current frame (needed for DeepSORT)
        :return: List of tracked objects [(x1, y1, x2, y2, object_id), ...]
        """

        print("Detections received:", detections)  # Debugging print

        # ✅ Convert detections into the correct format for DeepSORT
        formatted_detections = []
        for det in detections:
            if len(det) == 5:  # Ensure each detection has (x1, y1, x2, y2, confidence)
                bbox = [det[0], det[1], det[2], det[3]]  # Bounding box as a list
                confidence = det[4]  # Confidence score
                formatted_detections.append((bbox, confidence, None))  # Class ID is None

        print("Formatted Detections:", formatted_detections)  # Debugging print

        # Update tracker
        tracked_objects = self.tracker.update_tracks(formatted_detections, frame=frame)

        # Parse tracking results
        results = []
        for track in tracked_objects:
            if not track.is_confirmed():
                continue
            bbox = track.to_ltrb()  # Convert bounding box to (left, top, right, bottom)
            obj_id = track.track_id
            results.append((int(bbox[0]), int(bbox[1]), int(bbox[2]), int(bbox[3]), obj_id))

        return results
