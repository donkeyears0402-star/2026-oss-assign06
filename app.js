// 화면에 그릴 영화 목록. 저장은 서버에서 한다.
let movies = [];
let editId = null; // 수정 중인 id. null이면 추가

// 배열을 테이블에 출력
function render(list) {
  const tbody = document.getElementById("movieList");
  tbody.innerHTML = "";

  if (list.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.innerText = "표시할 영화가 없습니다.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  list.forEach(function (movie) {
    const tr = document.createElement("tr");

    const titleTd = document.createElement("td");
    titleTd.innerText = movie.title;
    tr.appendChild(titleTd);

    const directorTd = document.createElement("td");
    directorTd.innerText = movie.director;
    tr.appendChild(directorTd);

    const genreTd = document.createElement("td");
    genreTd.innerText = movie.genre;
    tr.appendChild(genreTd);

    const yearTd = document.createElement("td");
    yearTd.innerText = movie.year;
    tr.appendChild(yearTd);

    const ratingTd = document.createElement("td");
    ratingTd.innerText = movie.rating + "점";
    tr.appendChild(ratingTd);

    const btnTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.innerText = "수정";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", function () {
      startEdit(movie.id);
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerText = "삭제";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
      deleteMovie(movie.id);
    });
    btnTd.appendChild(editBtn);
    btnTd.appendChild(deleteBtn);
    tr.appendChild(btnTd);

    tbody.appendChild(tr);
  });
}

// 폼에 입력한 값 읽기
function readForm() {
  return {
    title: document.getElementById("title").value.trim(),
    director: document.getElementById("director").value.trim(),
    genre: document.getElementById("genre").value,
    year: Number(document.getElementById("year").value),
    rating: Number(document.getElementById("rating").value)
  };
}

// 추가와 수정에서 같이 쓰는 검사. 통과하면 true
function validate(data) {
  // 1. 필수 입력
  if (data.title === "" || data.director === "") {
    alert("제목과 감독을 입력하세요.");
    return false;
  }

  // 2. 길이
  if (data.title.length > 30) {
    alert("제목은 30자 이내로 입력하세요.");
    return false;
  }

  // 3. 장르 선택
  if (data.genre === "") {
    alert("장르를 선택하세요.");
    return false;
  }

  // 4. 숫자 범위
  if (!Number.isInteger(data.year) || data.year < 1900 || data.year > 2026) {
    alert("개봉연도는 1900~2026 사이 숫자로 입력하세요.");
    return false;
  }
  if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    alert("평점은 1~5 사이 숫자로 입력하세요.");
    return false;
  }

  // 5. 같은 제목 (수정 중이면 자기 자신은 제외)
  const same = movies.filter(function (m) {
    return m.title === data.title && String(m.id) !== String(editId);
  });
  if (same.length > 0) {
    alert("이미 등록된 영화입니다.");
    return false;
  }

  return true;
}

// 수정 버튼을 누르면 폼에 원래 값을 채운다
function startEdit(id) {
  const movie = movies.find(function (m) {
    return String(m.id) === String(id);
  });

  document.getElementById("title").value = movie.title;
  document.getElementById("director").value = movie.director;
  document.getElementById("genre").value = movie.genre;
  document.getElementById("year").value = movie.year;
  document.getElementById("rating").value = movie.rating;

  editId = movie.id;
  document.getElementById("saveBtn").innerText = "수정 완료";
}

function resetForm() {
  editId = null;
  document.getElementById("movieForm").reset();
  document.getElementById("saveBtn").innerText = "저장";
}

window.onload = function () {
  render(movies);

  document.getElementById("movieForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const data = readForm();
    if (!validate(data)) {
      return;
    }
  });
};
