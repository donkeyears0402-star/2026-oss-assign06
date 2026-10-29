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

window.onload = function () {
  render(movies);
};
