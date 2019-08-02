$(document).ready(function() {
  var danhSachNguoiDung = new DanhSachNguoiDung();
  var validation = new Validation();

  getLocalStorage();

  $("#btnThemNguoiDung").click(function() {
    var title = "Thêm người dùng";
    var footer = "<button id='btnThem' class='btn btn-success'>Thêm</button>";

    $(".modal-title").html(title);
    $(".modal-footer").html(footer);
  });
function LayThongTin(){
  var taiKhoan = $("#TaiKhoan").val();
  var hoTen = $("#HoTen").val();
  var matKhau = $("#MatKhau").val();
  var email = $("#Email").val();
  var soDT = $("#SoDienThoai").val();
  var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT);
  return nguoiDung;
}
  $("body").delegate("#btnThem", "click", function() {
    var nguoiDung =  LayThongTin();
  var isValid = true;
  isValid = validation.KiemTraRong("#taiKhoan", "tbTaiKhoan", "(*) Vui lòng nhập mã");
  //them vao mang
  if (isValid) {
    danhSachNguoiDung.themNguoiDung(nguoiDung);
    taoBang(danhSachNguoiDung.mangNguoiDung);
    setLocalStorage();
  }

  });

  function taoBang(mangHienThi) {
    var tbody = $("#tblDanhSachNguoiDung");
    var content = "";
    // for (var i = 0; i < danhSachNguoiDung.mangNguoiDung.length; i++) {
    //   content += `
    //         <tr>
    //             <td>${i + 1}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].taiKhoan}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].matKhau}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].hoTen}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].email}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].soDT}</td>
    //         </tr>
    //     `;
    // }

    mangHienThi.map(function(item, index) {
      content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>
                    <button id="btnCapNhat" class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-id='${item.taiKhoan}'>Sửa</button>
                    <button id="btnXoa" data-id='${item.taiKhoan}' class="btn btn-danger">Xóa</button>
                </td>
            </tr>
        `;
    });

    tbody.html(content);
  }

  function setLocalStorage() {
    localStorage.setItem(
      "mangNguoiDung",
      JSON.stringify(danhSachNguoiDung.mangNguoiDung)
    );
  }

  function getLocalStorage() {
    if (localStorage.getItem("mangNguoiDung")) {
      danhSachNguoiDung.mangNguoiDung = JSON.parse(
        localStorage.getItem("mangNguoiDung")
      );
      taoBang(danhSachNguoiDung.mangNguoiDung);
    }
  }

  function TimViTri(id) {
    // Lay tung nhan vien ra bang cach duyet mang
    for (var i = 0; i < danhSachNguoiDung.mangNguoiDung.length; i++) {
      var nguoiDung = danhSachNguoiDung.mangNguoiDung[i];
      if (nguoiDung.taiKhoan === id) {
        // console.log("id trong mang: "+id);

        return i;
      }
    }
    return -1;
  }

$("body").delegate("#btnXoa","click",function(event){
    // Lay id can xoa
    var btnXoa = event.target;
    var idXoa = btnXoa.getAttribute("data-id");

    //Tim vi tri can xoa
    var index = TimViTri(idXoa);
  console.log("vi tri trong mang: "+index)
    //Xoa
    danhSachNguoiDung.mangNguoiDung.splice(index, 1);
    taoBang(danhSachNguoiDung.mangNguoiDung);
    setLocalStorage();
});

function HienThiThongTinLenForm(event) {
  var btnSua = event.target;
  var idSua = btnSua.getAttribute("data-id");
  var index = TimViTri(idSua);
  // console.log("vi tri trong mang Sua: "+index);
  var nguoiDung = danhSachNguoiDung.mangNguoiDung[index];

  // Hien Thi
  $("#TaiKhoan").val(nguoiDung.taiKhoan).attr("readonly",true);
  $("#MatKhau").val(nguoiDung.matKhau);
  $("#HoTen").val(nguoiDung.hoTen);
  $("#Email").val(nguoiDung.email);
  $("#SoDienThoai").val(nguoiDung.soDT);
return nguoiDung;
}

$("body").delegate("#btnCapNhat","click",function(event){
  var title = "Sua người dùng";
    var footer = "<button id='btnSuaModal' class='btn btn-success'>Cap Nhat</button>";

    $(".modal-title").html(title);
    $(".modal-footer").html(footer);

    HienThiThongTinLenForm(event);
  $("body").delegate("#btnSuaModal","click",function(){
    //De len doi tuong can sua
   var nguoiDung=LayThongTin();
   console.log(nguoiDung)
    var index = TimViTri(nguoiDung.taiKhoan);
    console.log(index)
    danhSachNguoiDung.mangNguoiDung[index] = nguoiDung;
    console.log(danhSachNguoiDung.mangNguoiDung)
    taoBang(danhSachNguoiDung.mangNguoiDung);
    setLocalStorage();
  });
 
});

$("#btnTimNguoiDung").keyup(function(){
  var mangNguoiDungTimKiem = [];
  var keyword = $("#btnTimNguoiDung").val();
  keyword = keyword
    .toLowerCase() // Chuyen thanh chu thuong
    .replace(/\s/g, ''); // Xoa bo nhung khoang trang

  // JS thuan
  // for (var i = 0; i < mangNhanVien.length; i++) {
  //   if (mangNhanVien[i].tenNhanVien.toLowerCase().replace(/\s/g, '') === keyword) {
  //     mangNhanVienTimKiem.push(mangNhanVien[i]);
  //   }
  // }

  //Js es6
  mangNguoiDungTimKiem = danhSachNguoiDung.mangNguoiDung.filter(function (nguoiDung) {
    return nguoiDung.taiKhoan.toLowerCase().replace(/\s/g, '').indexOf(keyword) !== -1
  });
  taoBang(mangNguoiDungTimKiem);

});


});
