async function fetchStudents() {
    const response = await fetch('/api/students');
    const students = await response.json();

    const table = document.getElementById('studentTable');
    table.innerHTML = '<tr><th>ID</th><th>Name</th><th>Age</th><th>Grade</th><th>Address</th><th>Action</th></tr>';

    students.forEach(student => {
        const row = table.insertRow(-1);
        row.innerHTML = `<td>${student.id}</td><td>${student.name}</td><td>${student.age}</td><td>${student.grade}</td><td>${student.address}</td>
            <td><button onclick="editStudent(${student.id})">Edit</button><button onclick="deleteStudent(${student.id})">Delete</button></td>`;
    });
}

// Function to save or update a student
async function saveStudent() {
    const form = document.getElementById('studentForm');
    const formData = new FormData(form);

    const id = formData.get('id');
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/students/${id}` : '/api/students';

    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            age: formData.get('age'),
            grade: formData.get('grade'),
            address: formData.get('address')
        })
    });

    form.reset();
    fetchStudents();
}

// Function to edit a student
async function editStudent(id) {
    const response = await fetch(`/api/students/${id}`);
    const student = await response.json();

    const form = document.getElementById('studentForm');
    form.elements['id'].value = student.id;
    form.elements['name'].value = student.name;
    form.elements['age'].value = student.age;
    form.elements['grade'].value = student.grade;
    form.elements['address'].value = student.address;
}

// Function to delete a student
async function deleteStudent(id) {
    await fetch(`/api/students/${id}`, { method: 'DELETE' });
    fetchStudents();
}

// Initial fetch on page load
fetchStudents();