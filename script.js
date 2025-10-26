const students = [
      { id: 1, name: "محمد أمين", lastName: "قواسمية", year: "سنة ثالثة", specialization: "إعلام آلي" },
      { id: 2, name: "سارة", lastName: "بن عيسى", year: "سنة أولى", specialization: "رياضيات" },
      { id: 3, name: "عبد الله", lastName: "مراد", year: "سنة ثانية", specialization: "إعلام آلي" },
    ];

    const studentSelect = document.getElementById("student");
    const infoBox = document.getElementById("studentInfo");
    const nameSpan = document.getElementById("name");
    const yearSpan = document.getElementById("year");
    const specSpan = document.getElementById("specialization");

    students.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = `${s.name} ${s.lastName}`;
      studentSelect.appendChild(opt);
    });

    studentSelect.addEventListener("change", (e) => {
      const selected = students.find(s => s.id == e.target.value);
      if (selected) {
        infoBox.style.display = "block";
        nameSpan.textContent = `${selected.name} ${selected.lastName}`;
        yearSpan.textContent = selected.year;
        specSpan.textContent = selected.specialization;
      } else {
        infoBox.style.display = "none";
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
      const studentId = studentSelect.value;
      const reason = document.getElementById("reason").value.trim();
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