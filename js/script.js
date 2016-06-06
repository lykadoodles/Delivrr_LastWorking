$(document).ready(function () {

    onDeviceReady();

    function onDeviceReady() {



        //MOBILE PATHNAME
        var dir = "/android_asset/www";


        var checkuname = window.localStorage.getItem('username');

        //Display and append


        if (location.pathname == dir + '/login.html') {
            var checkuname = window.localStorage.getItem('username');
            if (checkuname == '' || checkuname == null) {} else {
                window.location = "menu.html";
            }

            $("#username").focus();
        }



        if (location.pathname == dir + '/menu.html') {
            if (checkuname == "" || checkuname == null || checkuname == undefined || checkuname == " ") {
                window.location = "login.html"; //Redirection
            }


        }

        if (location.pathname == dir + '/index.html') {
            $("#search-txt").click(function () {
                trackingno = $("#tracking").val();
                window.sessionStorage.setItem("trackingno", trackingno);

                window.location = "result.html";
            })
        }


        if (location.pathname == dir + '/search.html') {
            $("#search-txt").click(function () {
                trackingno = $("#tracking").val();
                window.sessionStorage.setItem("trackingno", trackingno);

                window.location = "result.html";
            })
        }





        if (location.pathname == dir + '/result.html') {
            var trackingno = window.sessionStorage.getItem("trackingno")

            //ajax begin!
            $.ajax({
                url: "http://mangotreelabs.website/mobile_api.php",
                type: "GET",
                dataType: "json",
                data: {
                    type: "search",
                    orderid: trackingno
                },
                ContentType: "application/json",
                success: function (result) {
                    //alert(JSON.stringify(result));
                    $("#btnlogin").attr("style", "display: relative;");
                    $("#btnloading").attr("style", "display: none;");
                    var jsonArray = JSON.parse(JSON.stringify(result));
                    $.each(jsonArray, function (index, value) {
                        var orderid = value.OrderID;
                        var name = value.CustomerName;
                        var address = value.Address;
                        var contact = value.ContactNum;
                        var status = Status(value.Status);

                        $("#orderID").empty().text(orderid);
                        $("#customer").empty().text(name);
                        $("#address").empty().text(address);
                        $("#contact").empty().text(contact);
                        $("#span-status").empty().text(status);



                    });


                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }
            })
        } //searcch

        if (location.pathname == dir + '/dispatch.html') {

            var QR = window.sessionStorage.getItem('QR');
            //alert(QR + 'qr dis');
            var splitQR = QR.split(",");
            var OrderID = splitQR[0];
            var CustomerName = splitQR[1];
            var Address = splitQR[2];
            var ContactNum = splitQR[3];

            if (OrderID == '' || CustomerName == '' || Address == '' || ContactNum == '') {

                alert("OOps! Did you scan an invalid QR??");
                window.location = "menu.html";


            } else {
                $("#orderID").empty().text(OrderID);
                $("#customer").empty().text(CustomerName);
                $("#address").empty().text(Address);
                $("#contact").empty().text(ContactNum);


                $("#confirm-dispatch").click(function () {
                    $("#confirm-dispatch").attr("style", "display: none;");
                    $("#btnloading").attr("style", "display: relative;");

                    //ajax for dispatch
                    $.ajax({
                        url: "http://mangotreelabs.website/mobile_api.php",
                        type: "GET",
                        dataType: "json",
                        data: {
                            type: "dispatch",
                            orderid: $("#orderID").text()
                        },
                        ContentType: "application/json",
                        success: function (result) {
                            //alert(JSON.stringify(result));
                            $("#confirm-dispatch").attr("style", "display: relative;");
                            $("#btnloading").attr("style", "display: none;");

                            swal({
                                title: "Status Updated",
                                text: "",
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setTimeout(function () {
                                window.location = "menu.html";
                            }, 2000);

                        },
                        error: function (err) {
                            alert(JSON.stringify(err));
                            $("#confirm-dispatch").attr("style", "display: relative;");
                            $("#btnloading").attr("style", "display: none;");

                            swal({
                                title: "Status Updated",
                                text: "",
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setTimeout(function () {
                                window.location = "menu.html";
                            }, 2000);


                        }
                    })
                })
            }

        } // end dispatch page



        if (location.pathname == dir + '/success.html') {

            var QR = window.sessionStorage.getItem('QR');
            //alert(QR + ' success qr');
            var splitQR = QR.split(",");
            var OrderID = splitQR[0];
            var CustomerName = splitQR[1];
            var Address = splitQR[2];
            var ContactNum = splitQR[3];

            if (OrderID == '' || CustomerName == '' || Address == '' || ContactNum == '') {
                alert("OOps! Did you scan an invalid QR??");
                window.location = "menu.html";
            } else {
                $("#orderID").empty().text(OrderID);
                $("#customer").empty().text(CustomerName);
                $("#address").empty().text(Address);
                $("#contact").empty().text(ContactNum);

                $("#confirm-success").click(function () {
                    $("#confirm-success").attr("style", "display: none;");
                    $("#btnloading").attr("style", "display: relative;");

                    //ajax for success
                    $.ajax({
                        url: "http://mangotreelabs.website/mobile_api.php",
                        type: "GET",
                        dataType: "json",
                        data: {
                            type: "success",
                            orderid: $("#orderID").text()
                        },
                        ContentType: "application/json",
                        success: function (result) {
                            //alert(JSON.stringify(result) + 'success1');
                            $("#confirm-success").attr("style", "display: relative;");
                            $("#btnloading").attr("style", "display: none;");

                            swal({
                                title: "Status Updated",
                                text: "",
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setTimeout(function () {
                                window.location = "menu.html";
                            }, 2000);

                        },
                        error: function (err) {
                            //alert(err);
                            //alert(JSON.stringify(err) + 'success2');
                            $("#confirm-success").attr("style", "display: relative;");
                            $("#btnloading").attr("style", "display: none;");

                            swal({
                                title: "Status Updated",
                                text: "",
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setTimeout(function () {
                                window.location = "menu.html";
                            }, 3000);


                        }
                    })
                })
            }

        } //end success html

        if (location.pathname == dir + '/failed.html') {

            var QR = window.sessionStorage.getItem('QR');
            //alert(QR + ' failed');
            var splitQR = QR.split(",");
            var OrderID = splitQR[0];
            var CustomerName = splitQR[1];
            var Address = splitQR[2];
            var ContactNum = splitQR[3];

            $("#orderID").empty().text(OrderID);
            $("#customer").empty().text(CustomerName);
            $("#address").empty().text(Address);
            $("#contact").empty().text(ContactNum);

            if (OrderID == '' || CustomerName == '' || Address == '' || ContactNum == '') {
                alert("OOps! Did you scan an invalid QR??");
                window.location = "menu.html";
            } else {
                $("#confirm-failed").click(function () {

                    $("#confirm-failed").attr("style", "display: none;");
                    $("#btnloading").attr("style", "display: relative;");

                    //ajax for failed
                    $.ajax({
                        url: "http://mangotreelabs.website/mobile_api.php",
                        type: "GET",
                        dataType: "json",
                        data: {
                            type: "failed",
                            orderid: $("#orderID").text()
                        },
                        ContentType: "application/json",
                        success: function (result) {
                            //alert(JSON.stringify(result + 'failed1'));
                            $("#confirm-failed").attr("style", "display: relative;");
                            $("#btnloading").attr("style", "display: none;");

                            swal({
                                title: "Status Updated",
                                text: "",
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setTimeout(function () {
                                window.location = "menu.html";
                            }, 2000);


                        },
                        error: function (err) {
                            //alert(JSON.stringify(err) + 'failed2');
                            $("#confirm-failed").attr("style", "display: relative;");
                            $("#btnloading").attr("style", "display: none;");

                            swal({
                                title: "Status Updated",
                                text: "",
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setTimeout(function () {
                                window.location = "menu.html";
                            }, 2000);




                        }
                    })

                    //end ajax

                })
            }




        } // end failed

        //button login

        $("#btnlogin").click(function () {
            username = $("#username").val();
            password = $("#password").val();
            //alert(username + '_' + password);

            $("#btnlogin").attr("style", "display: none;");
            $("#btnloading").attr("style", "display: relative;");
            //ajax select sa registration db ung username at password
            $.ajax({
                url: "http://mangotreelabs.website/mobile_api.php",
                type: "GET",
                dataType: "json",
                data: {
                    type: "login",
                    username: $("#username").val(),
                    password: $("#password").val()
                },
                ContentType: "application/json",
                success: function (result) {
                    //alert(JSON.stringify(result));
                    $("#btnlogin").attr("style", "display: relative;");
                    $("#btnloading").attr("style", "display: none;");
                    var jsonArray = JSON.parse(JSON.stringify(result));
                    $.each(jsonArray, function (index, value) {
                        var username = value.username;
                        var name = value.firstname;
                        var company = value.company;

                        window.localStorage.setItem("username", username);
                        window.localStorage.setItem("name", name);
                        window.localStorage.setItem("company", company);

                    });
                    swal({
                        title: "Good job!",
                        text: "You have successfully logged in!",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setTimeout(function () {
                        window.location = "menu.html";
                    }, 3000);

                },
                error: function (err) {
                    alert(err);
                    $("#btnlogin").attr("style", "display: relative;");
                    $("#btnloading").attr("style", "display: none;");
                    swal("Oops!", "Something went wrong. Please try again!", "error");


                }
            })
        });

        //button logout

        $('#btnlogout').click(function () {
            window.localStorage.setItem("username", '');
            window.localStorage.setItem("name", '');
            window.localStorage.setItem("company", '');
            window.location = "login.html";
        })

        $('#btnsearch1').click(function () {
            tracking = $("#tracking").val();
            //alert(tracking);

            $.ajax({
                url: "http://mangotreelabs.website/mobile_api.php",
                type: "GET",
                dataType: "json",
                data: {
                    type: "login",
                    username: $("#username").val(),
                    password: $("#password").val()
                },
                ContentType: "application/json",
                success: function (result) {
                    //alert(JSON.stringify(result));
                    $("#btnlogin").attr("style", "display: relative;");
                    $("#btnloading").attr("style", "display: none;");
                    var jsonArray = JSON.parse(JSON.stringify(result));
                    $.each(jsonArray, function (index, value) {
                        var username = value.username;
                        var name = value.firstname;
                        var company = value.company;

                        window.localStorage.setItem("username", username);
                        window.localStorage.setItem("name", name);
                        window.localStorage.setItem("company", company);

                    });
                    swal({
                        title: "Good job!",
                        text: "You have successfully logged in!",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setTimeout(function () {
                        window.location = "menu.html";
                    }, 3000);

                },
                error: function (err) {
                    alert(err);
                    $("#btnlogin").attr("style", "display: relative;");
                    $("#btnloading").attr("style", "display: none;");
                    swal("Oops!", "Something went wrong. Please try again!", "error");


                }
            })
        })

        //end

        function Status(index) {
            var Desc = {};
            Desc[0] = 'Unprocessed';
            Desc[1] = 'Dispatched';
            Desc[2] = 'Delivered';
            Desc[3] = 'Failed Delivery';

            return Desc[index];
        }
    }
});