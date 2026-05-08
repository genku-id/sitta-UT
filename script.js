function login() {
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  const user = dataPengguna.find(
    (u) => u.email === emailInput && u.password === passwordInput
  );

  if (user) {
    localStorage.setItem("userLogin", JSON.stringify(user));

    window.location.href = "dashboard.html";
  } else {
    Swal.fire({
  icon: "error",
  title: "Gagal",
  text: "Email atau password salah"
});
  }
}

function cekLogin() {
  const user = localStorage.getItem("userLogin");

  if (!user) {
    window.location.href = "index.html";
  }
}

function setGreeting() {
  const hour = new Date().getHours();
  let text = "Halo";

  if (hour < 12) {
    text = "Selamat Pagi";
  } else if (hour < 18) {
    text = "Selamat Siang";
  } else {
    text = "Selamat Malam";
  }

  const greetingEl = document.getElementById("greeting");
  if (greetingEl) {
    greetingEl.innerText = text;
  }
}

function goTo(page) {
  window.location.href = page;
}

function goBack() {
  window.history.back();
}

setGreeting();

function toggleUserMenu() {
  document.getElementById("userDropdown").classList.toggle("show");
}

function openProfileModal() {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  if (!user) return;

  document.getElementById("profileId").innerText = user.id;
  document.getElementById("profileNama").innerText = user.nama;
  document.getElementById("profileEmail").innerText = user.email;
  document.getElementById("profileRole").innerText = user.role;
  document.getElementById("profileLokasi").innerText = user.lokasi;

  document.getElementById("userDropdown").classList.remove("show");
  document.getElementById("profileModal").style.display = "flex";
  document.body.classList.add("modal-open");
}

function closeProfileModal() {
  document.getElementById("profileModal").style.display = "none";
  document.body.classList.remove("modal-open");
}

document.addEventListener("click", function (e) {

  const userMenu = document.querySelector(".user-menu");
  const dropdown = document.getElementById("userDropdown");

  if (userMenu && dropdown) {
    if (!userMenu.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  }
});

function openChangePasswordModal() {
  document.getElementById("profileModal").style.display = "none";
  document.getElementById("changePasswordModal").style.display = "flex";
}

function closeChangePasswordModal() {
  document.getElementById("changePasswordModal").style.display = "none";
  document.body.classList.remove("modal-open");
}

function verifyChangePassword() {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const email = document.getElementById("verifyPasswordEmail").value;

  if (email === "") {
    Swal.fire({
  icon: "warning",
  title: "Perhatian",
  text: "Email belum diisi."
});
    return;
  }

  if (email !== user.email) {
    Swal.fire({
  icon: "error",
  title: "Tidak Sesuai",
  text: "Email tidak sesuai dengan akun yang sedang login."
});
    return;
  }

  Swal.fire({
  icon: "success",
  title: "Berhasil",
  text: "Verifikasi berhasil. Fitur ganti password bisa dilanjutkan."
});
  closeChangePasswordModal();
}

function cariTracking() {
  const no = document.getElementById("noResi").value.trim();
  const hasil = document.getElementById("hasilTracking");

  if (no === "") {
    hasil.innerHTML = `<p style="color:red;">Nomor resi harus diisi</p>`;
    return;
  }

  const data = dataTracking[no];

  if (!data) {
    hasil.innerHTML = `<p style="color:red;">Nomor tidak ditemukan</p>`;
    return;
  }

  let progress = 0;

  if (data.status === "Dikirim") {
    progress = 50;
  } else if (data.status === "Dalam Perjalanan") {
    progress = 75;
  } else if (data.status === "Selesai") {
    progress = 100;
  }

  let html = `
    <div class="result-card">
      <p><strong>Nomor DO:</strong> ${data.nomorDO}</p>
      <p><strong>Nama:</strong> ${data.nama}</p>
      <p><strong>Status:</strong> <span class="status">${data.status}</span></p>
      <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
      <p><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>
      <p><strong>Paket:</strong> ${data.paket}</p>
      <p><strong>Total:</strong> ${data.total}</p>

      <div class="progress-bar">
        <div class="progress" style="width: ${progress}%"></div>
      </div>
    </div>

    <div class="result-card">
      <strong>Riwayat:</strong>
      <ul>
  `;

  data.perjalanan.forEach(function (p) {
    html += `<li>${p.waktu} - ${p.keterangan}</li>`;
  });

  html += `
      </ul>
    </div>
  `;

  hasil.innerHTML = html;
}

function tampilkanBuku() {
  const container = document.getElementById("listBuku");
  if (!container) return;

  let html = "";

  dataBahanAjar.forEach((buku, index) => {
    const namaBuku = `${buku.jenisBarang} ${buku.namaBarang}`;

    html += `
      <div class="buku-card">

      <button class="hapus-btn" onclick="bukaModalHapus(${index})" title="Hapus Data">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ikon-svg">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
</button>

        <img src="${buku.cover}" alt="${namaBuku}">

        <div class="buku-info">
          <p><strong>${namaBuku}</strong></p>

          <p>Kode: ${buku.kodeBarang}</p>
          <p>Edisi: ${buku.edisi}</p>
          <p>Stok: ${buku.stok}</p>
          <p>Lokasi: ${buku.kodeLokasi}</p>

        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function simpanData() {
  const kodeLokasi = document.getElementById("kodeLokasi").value;
  const kodeBarang = document.getElementById("kodeBarang").value;
  const namaBarang = document.getElementById("namaBarang").value;
  const jenisBarang = document.getElementById("jenisBarang").value;
  const edisi = document.getElementById("edisi").value;
  const stok = document.getElementById("stok").value;
  const coverInput = document.getElementById("cover");

  if (
    kodeLokasi === "" ||
    kodeBarang === "" ||
    namaBarang === "" ||
    jenisBarang === "" ||
    edisi === "" ||
    stok === ""
  ) {
    
Swal.fire({
  icon: "warning",
  title: "Data Belum Lengkap",
  text: "Semua data wajib diisi."
});
    return;
  }

  const bukuBaru = {
    kodeLokasi: kodeLokasi,
    kodeBarang: kodeBarang,
    namaBarang: namaBarang,
    jenisBarang: jenisBarang,
    edisi: edisi,
    stok: Number(stok),
    cover: coverInput.files.length > 0
      ? URL.createObjectURL(coverInput.files[0])
      : "img/default.jpg"
  };

  dataBahanAjar.push(bukuBaru);

  tampilkanBuku();
  tutupModal();

  Swal.fire({
  icon: "success",
  title: "Berhasil",
  text: "Data buku berhasil ditambahkan."
});
}

function tambahData() {
  document.getElementById("modalForm").style.display = "flex";
  document.body.classList.add("modal-open");
}

function tutupModal() {
  document.getElementById("modalForm").style.display = "none";
  document.body.classList.remove("modal-open");
}

let indexBukuDihapus = null;

function bukaModalHapus(index) {
  indexBukuDihapus = index;
  document.getElementById("modalHapus").style.display = "flex";
  document.body.classList.add("modal-open");
}

function tutupModalHapus() {
  indexBukuDihapus = null;
  document.getElementById("modalHapus").style.display = "none";
  document.body.classList.remove("modal-open");
}

function hapusBuku() {
  if (indexBukuDihapus === null) return;

  dataBahanAjar.splice(indexBukuDihapus, 1);

  tampilkanBuku();
  tutupModalHapus();
}

function tampilUser() {
  const user = JSON.parse(localStorage.getItem("userLogin"));

  if (user) {
    const el = document.getElementById("namaUser");
    if (el) {
      el.innerText = user.nama;
    }
  }
}

tampilUser();

function logout() {
  localStorage.removeItem("userLogin");
  window.location.href = "index.html";
}

function tampilHistori() {
  const container = document.getElementById("listHistori");
  if (!container) return;

  const user = JSON.parse(localStorage.getItem("userLogin"));

  let html = "";

  Object.values(dataTracking).forEach(item => {
    if (item.nama === user.nama) {
      html += `
        <div class="result-card">
          <p><strong>Nomor DO:</strong> ${item.nomorDO}</p>
          <p><strong>Nama:</strong> ${item.nama}</p>
          <p><strong>Status:</strong> ${item.status}</p>
          <p><strong>Total:</strong> ${item.total}</p>
        </div>
      `;
    }
  });

  if (html === "") {
    html = `<p>Tidak ada histori transaksi</p>`;
  }

  container.innerHTML = html;
}

function tampilLaporan() {
  const container = document.getElementById("laporanContainer");
  if (!container) return;

  let totalDO = 0;
  let dalamPerjalanan = 0;
  let dikirim = 0;

  Object.values(dataTracking).forEach(item => {
    totalDO++;

    if (item.status === "Dalam Perjalanan") {
      dalamPerjalanan++;
    } else if (item.status === "Dikirim") {
      dikirim++;
    }
  });

  // total stok bahan ajar
  let totalStok = 0;
  dataBahanAjar.forEach(buku => {
    totalStok += Number(buku.stok);
  });

  const html = `
    <div class="result-card">
      <h3>Monitoring Progress DO</h3>
      <p>Total DO: ${totalDO}</p>
      <p>Dalam Perjalanan: ${dalamPerjalanan}</p>
      <p>Dikirim: ${dikirim}</p>
    </div>

    <div class="result-card">
      <h3>Rekap Bahan Ajar</h3>
      <p>Total Jenis Bahan Ajar: ${dataBahanAjar.length}</p>
      <p>Total Stok: ${totalStok}</p>
    </div>
  `;

  container.innerHTML = html;
}

function toggleMode() {
  document.documentElement.classList.toggle("dark");

  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("mode", isDark ? "dark" : "light");
}

function loadMode() {
  const mode = localStorage.getItem("mode");

  if (mode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function openForgotModal() {
  document.getElementById("forgotModal").style.display = "flex";
}

function closeForgotModal() {
  document.getElementById("forgotModal").style.display = "none";
}

function openRegisterModal() {
  document.getElementById("registerModal").style.display = "flex";
}

function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none";
}

function verifyEmail() {
  const email = document.getElementById("forgotEmail").value;

  if (email === "") {
    Swal.fire({
  icon: "warning",
  title: "Perhatian",
  text: "Email belum diisi."
});
    return;
  }

  Swal.fire({
  icon: "info",
  title: "Cek Email",
  text: "Link verifikasi telah dikirim ke email: " + email
});
  closeForgotModal();
}

function registerAccount() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (name === "" || email === "" || password === "") {
    Swal.fire({
  icon: "warning",
  title: "Data Belum Lengkap",
  text: "Semua data pendaftaran harus diisi."
});
    return;
  }

  Swal.fire({
  icon: "success",
  title: "Berhasil",
  text: "Pendaftaran berhasil untuk akun: " + name
});
  closeRegisterModal();
}

function notif(icon, title, text) {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonColor: "#3b82f6"
  });
}