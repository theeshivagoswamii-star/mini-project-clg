// Sample data for demonstration
const demoData = {
    students: [
        {
            id: 1,
            rollNo: '2401200100156',
            name: 'Shiva Giri',
            branch: 'Computer Science',
            semester: 3,
            attendance: 85,
            feesStatus: 'paid',
            lastAttendance: '2024-11-20'
        }
    ],
    
    attendance: [
        {
            id: 1,
            date: '2024-11-20',
            subject: 'Data Structures',
            status: 'present',
            teacher: 'Dr. Asutosh Rao'
        },
        {
            id: 2,
            date: '2024-11-19',
            subject: 'Mathematics',
            status: 'present',
            teacher: 'Dr. Samiksha Singh'
        }
    ],
    
    notices: [
        {
            id: 1,
            title: 'Semester Exam Schedule',
            content: 'The semester examination schedule has been published...',
            date: '2024-11-18',
            priority: 'high'
        },
        {
            id: 2,
            title: 'Holiday Announcement',
            content: 'College will remain closed on 25th November...',
            date: '2024-11-15',
            priority: 'medium'
        }
    ]
};

// Function to load demo data
function loadDemoData(dataType) {
    return demoData[dataType] || [];
}
