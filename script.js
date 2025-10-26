    let students = [];

    async function loadStudents() {
      try {
        const response = await fetch('students_dataset.csv');
        const text = await response.text();
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          if (values.length === 5) {
            students.push({
              id: parseInt(values[0]),
              name: values[1],
              lastName: values[2],
              specialization: values[3],
              year: values[4]
            });
          }
        }
      } catch (error) {
        console.error('Error loading students:', error);
      }
    }

    loadStudents();

    let selectedStudentId = null;
    const studentSearch = document.getElementById("studentSearch");
    const studentList = document.getElementById("studentList");
    const infoBox = document.getElementById("studentInfo");
    const nameSpan = document.getElementById("name");
    const yearSpan = document.getElementById("year");
    const specSpan = document.getElementById("specialization");

    function showStudentInfo(student) {
      if (student) {
        infoBox.style.display = "block";
        nameSpan.textContent = `${student.name} ${student.lastName}`;
        yearSpan.textContent = student.year;
        specSpan.textContent = student.specialization;
      } else {
        infoBox.style.display = "none";
      }
    }

    studentSearch.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      studentList.innerHTML = '';
      if (query === '') {
        studentList.style.display = 'none';
        selectedStudentId = null;
        showStudentInfo(null);
        return;
      }
      const filtered = students.filter(s => `${s.name} ${s.lastName}`.toLowerCase().includes(query));
      if (filtered.length > 0) {
        filtered.forEach(s => {
          const div = document.createElement("div");
          div.textContent = `${s.name} ${s.lastName}`;
          div.addEventListener("click", () => {
            selectedStudentId = s.id;
            studentSearch.value = `${s.name} ${s.lastName}`;
            studentList.style.display = 'none';
            showStudentInfo(students.find(s => s.id === selectedStudentId));
          });
          studentList.appendChild(div);
        });
        studentList.style.display = 'block';
      } else {
        studentList.style.display = 'none';
      }
    });

    const reasonSelect = document.getElementById("reason");
    const otherReasonInput = document.getElementById("otherReason");

    reasonSelect.addEventListener("change", (e) => {
      if (e.target.value === "أخرى") {
        otherReasonInput.style.display = "block";
      } else {
        otherReasonInput.style.display = "none";
        otherReasonInput.value = "";
      }
    });

    function calculateDuration(from, to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const diffTime = Math.abs(toDate - fromDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return `${diffDays} يوم`;
    }

    function formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('ar-DZ');
    }

    document.getElementById("printBtn").addEventListener("click", () => {
      const studentId = selectedStudentId;
      let reason = document.getElementById("reason").value.trim();
      if (reason === "أخرى") {
        reason = otherReasonInput.value.trim();
      }
      const from = document.getElementById("fromDate").value;
      const to = document.getElementById("toDate").value;

      if (!studentId || !reason || !from || !to) {
        alert("يرجى ملء جميع الحقول قبل الطباعة");
        return;
      }

      const selected = students.find(s => s.id == studentId);
      
      document.getElementById("printName").textContent = selected.name;
      document.getElementById("printLastName").textContent = selected.lastName;
      document.getElementById("printYear").textContent = selected.year;
      document.getElementById("printSpec").textContent = selected.specialization;
      document.getElementById("printReason").textContent = reason;
      document.getElementById("printFrom").textContent = formatDate(from);
      document.getElementById("printTo").textContent = formatDate(to);
      document.getElementById("printDuration").textContent = calculateDuration(from, to);
      
      const today = new Date();
      document.getElementById("printDate").textContent = today.toLocaleDateString('ar-DZ');

      setTimeout(() => {
        window.print();
      }, 100);
    });