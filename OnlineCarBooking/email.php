
<html lang="en">
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- <script src="js/jquery-3.5.1.min.js"></script>
     --><script src="js/bootstrap.min.js"></script>
    <script src="js/session.js"></script>
  <title>email.php</title>
</head>
<body>
	<script type="text/javascript">
		$(document).ready(function(){
	$("#money").text(JSON.parse($.session.get("overAllMoney")));
			
			// $len = JSON.parse($.session.get("products")).length;
			
			// $("#product").text(JSON.stringify($.session.get("products")));
  	// 	console.log(JSON.parse($.session.get("overAllMoney")));
  	// 	console.log(JSON.parse($.session.get("products")));
  	car_array = [];
  	car_vehicle = [];
  	car_days = [];
  	car_unitPrice = [];
  	car_overAllMoney = JSON.parse($.session.get("overAllMoney"));

    selectedCars = JSON.parse($.session.get("selectedCars"));

    $.ajax({
        type: "GET",
        url: "xml/cars.xml",
        dataType: "xml",
        success: xmlParser,
        error: function () {
            alert("An error occurred while processing XML file.");
        }
    });

    for (let i = 0; i < selectedCars.length; i++) {
        for (let j = 0; j < car_array.length; j++) {
            
            if (selectedCars[i] == car_array[j].id) {
            	car_vehicle.append(car_array[j].model_year + "-" + car_array[j].brand + "-" + car_array[j].model);
            	var id = "#" + selectedCars[i];
            	car_days.append($(id).val());
            	car_unitPrice.append("$" + car_array[j].price_per_day);
            	continue;
            }}};

  });

	function handle() {
    console.log(selectedCars);
    console.log(car_array);
    

                var category;
                //var tr = $("<tr></tr>");
                //var td = $("<td></td>");
                tr.append(td);

                // category = $('<img>');
                // var url = "assets/images/" + car_array[j].model + ".jpg";
                // category.attr('src', url);
                // category.attr('alt', "images");
                // category.attr('style', "width:200x; height:300px;");
                // td.append(category);

                td = $("<td></td>");
                tr.append(td);
                category = $('<div></div>').text(car_array[j].model_year + "-" + car_array[j].brand + "-" + car_array[j].model);
                td.append(category);

                // Rental days
                td = $("<td></td>");
                tr.append(td);
                category = $('<input></input>').addClass("input-mini");
                category.attr('type', "text");
                category.attr('id', car_array[j].id);
                category.val("1");
                td.append(category);

                // Unit Price
                td = $("<td></td>").text("$" + car_array[j].price_per_day);
                tr.append(td);

                // Delete Button
                // td = $("<td></td>");
                // tr.append(td);
                // category = $('<button></button>').addClass("btn btn-danger").text("Delete");
                // category.click({ id: car_array[j].id }, deleteCar);
                // td.append(category);

                $("#tbody").append(tr);
                continue;
            }

        }

    }

}

	function xmlParser(xml) {

    $(xml).find("car").each(function () {
        // console.log($(this).find("ProductID").text());
        let productID = $(this)
            .find("id")
            .text();
        let category = $(this)
            .find("category")
            .text();
        let availability = $(this)
            .find("availability")
            .text();
        let brand = $(this)
            .find("brand")
            .text();
        let model = $(this)
            .find("model")
            .text();
        let modelYear = $(this)
            .find("model_year")
            .text();
        let mileage = $(this)
            .find("mileage")
            .text();
        let fuelType = $(this)
            .find("fuel_type")
            .text();
        let seats = $(this)
            .find("seats")
            .text();
        let pricePerDay = $(this)
            .find("price_per_day")
            .text();

        car = {
            id: productID,
            category: category,
            availability: availability,
            brand: brand,
            model: model,
            model_year: modelYear,
            mileage: mileage,
            fuel_type: fuelType,
            seats: seats,
            price_per_day: pricePerDay,
        };

        car_array.push(car);
    });

    //handle();
}
	</script>
	
	<?php
session_start();

//mail(to,subject,message,headers,parameters)
echo "Your order is sent to: <b>".$_POST['email']."</b> ! <br>";
echo "<a href=\"http://www-student.it.uts.edu.au/~huanliu/Assignment2/index.html\">
    <button>Return to Home Page</button>
</a>";

 



$subject = "Order Invoice For ".$_POST['firstname']." From Huangxun-Online";

//$message = $_SESSION["items"];

//$from = "huangxunliu@gmail.com";
//$message = "Hello ".$_POST['firstname'].","."This is your invoice.";
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .='Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: My Grocery Online Store <13091172@student.uts.edu.au>' . "\r\n";
$message = "<html>

<head>
<title>Hayden-Online Car Rental Store</title>
</head>
<body>
<b>You are required to pay $<span name=\"money\" style=\"color:red\" id=\"money\">
                  </span></b>
<p>
Here are your order details:
</p>
<table cellspacing=\"4\" cellpadding=\"4\" border=\"1\">
	<tr>
	<td>Name:</td>
	<td>" .$_POST['firstname'] . "</td>
	</tr>

	<tr>
	<td>Address:</td>
	<td>" .$_POST['address'] . "</td>
	</tr>

	<tr>
	<td>Suburb:</td>
	<td>" .$_POST['city'] . "</td>
	</tr>

	<tr>
	<td>State:</td>
	<td>" .$_POST['state'] . "</td>
	</tr>

	<tr>
	<td>Country:</td>
	<td>" .$_POST['country'] . "</td>
	</tr>

	<tr>
	<td>Payment:</td>
	<td>" .$_POST['payment'] . "</td>
	</tr>
	
</table>";

$car_overAllMoney = $_SESSION["overAllMoney"];

$message .= "<table cellspacing=\"4\" cellpadding=\"4\" border=\"1\">
				<tr>
				<th>Total Money</th>
				</tr>
				<tr>
				<td>$car_overAllMoney</td>
				</tr>
			</table>
";


$car_vehicle = "<script>document.writeln(car_vehicle);</script>";
$car_days = "<script>document.writeln(car_days);</script>";
$car_unitPrice = "<script>document.writeln(car_unitPrice);</script>";



$message .=" <table cellspacing=\"4\" cellpadding=\"4\" border=\"1\">
            <thead>
              <tr>
                
                <th>Vehicle</th>
                <th>Rental Days</th>
                <th>Unit Price</th>
                
              </tr>
            </thead>
            <tr>
            	<td>$car_vehicle</td>
            	<td>$car_days</td>
            	<td>$car_unitPrice</td>
            </tr>
          </table>
</body>
</html>
";


mail($_REQUEST['email'],$subject,$message,$headers);

?>
</body>
</html>