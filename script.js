function fetchData() {
    // Variabel untuk URL yang diisi
    const urlInput = document.getElementById("url").value;
    // Mengambil tabel untuk diedit
    const tableContainer = document.getElementById("table-container");
    const dataTable = document.getElementById("data-table");
    // Sesuatu yang bisa mengambil request dan memprosesnya
    const xhr = new XMLHttpRequest(); // Memperbaiki inisialisasi objek XMLHttpRequest

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Status 404 = not found
            // Status 403 = forbidden
            // Status 200 = accessible
            const data = JSON.parse(xhr.responseText);
            // Data yang didapat masih dalam bentuk teks, harus kita parse ke JSON
            dataTable.innerHTML = "";
            // Mengosongkan terlebih dahulu tabel yang ada sehingga tabel di bawah
            // <table id="data-table"></table> jadi kosong terlebih dahulu.
            // <tr> = table row
            // <th> = table header
            // <td> = table cell
            const headerRow = document.createElement("tr");
            // Karena JSON mirip dengan dictionary, kita mau mengambil key dari JSON
            // dan meletakkannya sebagai kolom di headerRow
            for (const key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    const headerCell = document.createElement("th");
                    headerCell.textContent = key;
                    headerRow.appendChild(headerCell);
                }
            }
            dataTable.appendChild(headerRow);
            // forEach dipakai untuk mengiterasi satu persatu item sesuai index
            data.forEach(function (item) {
                const dataRow = document.createElement("tr");
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        const dataCell = document.createElement("td"); // Mengganti <th> menjadi <td>
                        dataCell.textContent = item[key];
                        dataRow.appendChild(dataCell);
                    }
                }
                dataTable.appendChild(dataRow);
            });
            tableContainer.style.display = "block";
        }
    };
    xhr.open("GET", urlInput, true);
    xhr.send();
}