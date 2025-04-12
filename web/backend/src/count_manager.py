class CrowdCounter:
    def __init__(self):
        self.person_ids = set()  # Stores unique person IDs
        self.total_count = 0

    def update(self, tracked_objects):
        """
        Updates the count of people passing.

        :param tracked_objects: List of tracked objects [(x1, y1, x2, y2, object_id), ...]
        :return: Updated count
        """
        for obj in tracked_objects:
            obj_id = obj[4]  # Extract unique ID
            
            # If a new ID is detected, count it
            if obj_id not in self.person_ids:
                self.person_ids.add(obj_id)
                self.total_count += 1

        return self.total_count
