function Validation(){
    this.KiemTraRong=function(idInput,idThongBao,noiDungTB){
        var value = $("idInput").val();
        var isValid = true;
        if (value === "") {
          isValid = false;
        //   $("#idThongBao").style.display = "block";
        //   $("#idThongBao").html = noiDungTB;
          $("#idThongBao").css("display", "block");
          $("#idThongBao").html(noiDungTB);
        }
        else {
          $("#idThongBao").html = "";
        }
        return isValid;    
    }
}