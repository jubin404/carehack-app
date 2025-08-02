from tracker.models import Student, ClassGroup

# Create or get a class group
cg, _ = ClassGroup.objects.get_or_create(name="Grade 1")

names = [
    "Ava Patel", "Liam Smith", "Olivia Johnson", "Noah Williams", "Emma Brown",
    "Mason Jones", "Sophia Garcia", "Lucas Miller", "Isabella Davis", "Ethan Rodriguez",
    "Mia Martinez", "Benjamin Hernandez", "Charlotte Lopez", "James Gonzalez", "Amelia Wilson",
    "Elijah Anderson", "Harper Thomas", "Alexander Taylor", "Abigail Moore", "Daniel Jackson"
]

addresses = [
    "12 Oak Street", "34 Maple Avenue", "56 Pine Lane", "78 Cedar Road", "90 Birch Blvd",
    "23 Spruce Drive", "45 Willow Way", "67 Aspen Court", "89 Elm Circle", "101 Poplar Place",
    "13 Chestnut St", "35 Walnut Ave", "57 Hickory Ln", "79 Sycamore Rd", "91 Redwood Blvd",
    "24 Magnolia Dr", "46 Palm Way", "68 Fir Ct", "80 Alder Cir", "102 Cypress Pl"
]

parent_emails = [
    "patel.parent@example.com", "smith.parent@example.com", "johnson.parent@example.com", "williams.parent@example.com", "brown.parent@example.com",
    "jones.parent@example.com", "garcia.parent@example.com", "miller.parent@example.com", "davis.parent@example.com", "rodriguez.parent@example.com",
    "martinez.parent@example.com", "hernandez.parent@example.com", "lopez.parent@example.com", "gonzalez.parent@example.com", "wilson.parent@example.com",
    "anderson.parent@example.com", "thomas.parent@example.com", "taylor.parent@example.com", "moore.parent@example.com", "jackson.parent@example.com"
]

contacts = [
    "9876543210", "8765432109", "7654321098", "6543210987", "5432109876",
    "4321098765", "3210987654", "2109876543", "1098765432", "0987654321",
    "1234567890", "2345678901", "3456789012", "4567890123", "5678901234",
    "6789012345", "7890123456", "8901234567", "9012345678", "0123456789"
]

for i in range(20):
    Student.objects.create(
        name=names[i],
        address=addresses[i],
        parent_email=parent_emails[i],
        contact=contacts[i],
        class_group=cg
    )