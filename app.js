const mongoose = require("mongoose");
const system = require("./system/system.js");
const website_url =
  "https://valvrareteam.net/truyen/nhung-moi-quan-he-bi-mat-dan-xuat-hien-khi-mot-otaku-huong-noi-nhu-toi-bi-bao-vay-boi-cac-mi-nhan-hang-s-c15cfc9d/chuong/chuong-1-doi-cho-doi-doi-ccdb037e";

/*
 Đầu vào sẽ là tên website + chương đang ở, sau đó sẽ tự tạo thư mực con theo cấu trúc
 screenshots
    -Tên Ln
	-- vol i
	    --- chuong i

Voi mấy chương như là 1.1 hay 2.2 sẽ lấy số sau + số đầu = chương i hiện tại

*/

//connecting to database
//mongodb://localhost:27017/LnSnap
const mongoUrl = "mongodb://127.0.0.1:27017/screenshots";
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Ket noi toi db thanh cong");
  })
  .catch((err) => {
    console.log("Ket noi that bai");
  });
//----------------------

system.getLn(website_url, "hello");
