from ultralytics import YOLO
import netron

model = YOLO('web/database/yolov8n.pt')

model.export(format='onnx')


netron.start('web/database/yolov8n.onnx') 
