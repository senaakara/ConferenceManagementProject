document.getElementById('paper-submission-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const abstract = document.getElementById('abstract').value;
    const keywords = document.getElementById('keywords').value;
    const file = document.getElementById('file').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('abstract', abstract);
    formData.append('keywords', keywords);
    formData.append('file', file);

    fetch('http://localhost:8081/api/papers', {
    method: 'POST',
    body: formData
})
.then(response => {
    if (response.ok) {
        alert('Paper submitted successfully!');
        window.location.reload();
    } else {
        alert('Error submitting paper. Please try again.');
    }
})
.catch(err => console.error('Fetch error:', err));
});

document.getElementById('registration-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/api/registrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert('Registration successful!');
        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
        alert('Error registering. Please try again.');
    }
});

async function loadPapers() {
    try {
        const response = await fetch('http://localhost:8081/api/papers');
       
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const papers = await response.json();
        console.log("Received papers:", papers); // Debug: Inspect the data

        if (!Array.isArray(papers)) {
            console.error('Expected an array of papers, but got:', papers);
            return;
        }

        const paperListBody = document.getElementById('paper-list-body');
        
        papers.forEach((paper) => {
            const reviewerName = assignReviewer();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paper.title}</td>
                <td>${paper.abstract}</td>
                <td>${paper.keywords}</td>
                <td><a href="${paper.fileUrl}" target="_blank">Download</a></td>
                <td>${reviewerName}</td>
                <td>
                    <select>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                </td>
                <td><button>Submit Review</button></td>
            `;
            paperListBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
function assignReviewer(){

    
    const reviewers = [
        "Ahmet Yılmaz",
        "Ayşe Demir",
        "Mehmet Kaya",
        "Fatma Şahin",
        "Mustafa Aydın",
        "Zeynep Öztürk",
        "Elif Su",
        "Ali Can",
        "Deniz Yıldız",
        "Ceren Gül",
        "Burak Çetin",
        "Esra Akın",
        "Kerem Aslan",
        "Yasemin Kara",
        "Oğuzhan Türk",
        "Emine Sarı",
        "Serkan Yıldırım",
        "Gamze Şen",
        "Hakan Demirtaş",
        "Sevda Aktaş"
      ];
    const randomIndex = Math.floor(Math.random() * reviewers.length);
    return reviewers[randomIndex];
}
loadPapers(); 